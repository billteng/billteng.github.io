import * as monaco from 'monaco-editor';

const defaultCode: Record<string, string> = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Preview</title>
</head>
<body>
  <h1>Hello, Monaco!</h1>
</body>
</html>`,
  css: `body {
  background: #f0f0f0;
  color: #333;
}`,
  javascript: `console.log("Hello, Monaco!");`
};

class FCodeEditor extends HTMLElement {
  private editor!: monaco.editor.IStandaloneCodeEditor;
  private codeStore: Record<string, string> = { ...defaultCode };

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.innerHTML = `
      <style>
        .container { display: flex; height: 90vh; }
        .editor-panel, .preview-panel { flex: 1; padding: 10px; box-sizing: border-box; }
        .editor-panel { border-right: 1px solid #ccc; display: flex; flex-direction: column; }
        #monaco { flex: 1; width: 100%; min-height: 300px; }
        .controls { display: flex; gap: 10px; margin-bottom: 10px; }
        .toolbar { display: flex; gap: 10px; margin-bottom: 10px; align-items: center; }
        iframe { width: 100%; height: 100%; border: none; background: #fff; }
        select { padding: 2px 6px; }
      </style>
      <div class="container">
        <div class="editor-panel">
          <div class="toolbar">
            <label>
              Language:
              <select id="language">
                <option value="html">HTML5</option>
                <option value="css">CSS</option>
                <option value="javascript">JavaScript</option>
              </select>
            </label>
            <label>
              Theme:
              <select id="theme">
                <option value="vs-light">Light</option>
                <option value="vs-dark">Dark</option>
              </select>
            </label>
          </div>
          <div class="controls">
            <button id="runBtn">Run</button>
            <button id="saveBtn">Save</button>
            <button id="loadBtn">Load</button>
            <input id="filename" type="text" placeholder="File name (e.g. index1.html)" style="flex:1;">
          </div>
          <div id="monaco"></div>
        </div>
        <div class="preview-panel">
          <iframe id="preview"></iframe>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    const shadow = this.shadowRoot!;
    const preview = shadow.getElementById('preview') as HTMLIFrameElement;
    const runBtn = shadow.getElementById('runBtn') as HTMLButtonElement;
    const saveBtn = shadow.getElementById('saveBtn') as HTMLButtonElement;
    const loadBtn = shadow.getElementById('loadBtn') as HTMLButtonElement;
    const filenameInput = shadow.getElementById('filename') as HTMLInputElement;
    const monacoDiv = shadow.getElementById('monaco') as HTMLDivElement;
    const languageSelect = shadow.getElementById('language') as HTMLSelectElement;
    const themeSelect = shadow.getElementById('theme') as HTMLSelectElement;

    let currentLang = 'html';

    this.editor = monaco.editor.create(monacoDiv, {
      value: this.codeStore[currentLang],
      language: currentLang,
      theme: 'vs-light',
      automaticLayout: true,
      minimap: { enabled: false }
    });

    // Save code when switching language
    languageSelect.onchange = () => {
      this.codeStore[currentLang] = this.editor.getValue();
      currentLang = languageSelect.value;
      monaco.editor.setModelLanguage(this.editor.getModel()!, currentLang);
      this.editor.setValue(this.codeStore[currentLang] ?? defaultCode[currentLang]);
    };

    themeSelect.onchange = () => {
      monaco.editor.setTheme(themeSelect.value);
    };

    runBtn.onclick = () => {
      this.codeStore[currentLang] = this.editor.getValue();
      const html = this.codeStore['html'] || '';
      //const css = `<style>${this.codeStore['css'] || ''}</style>`;
      //const js = `<script>${this.codeStore['javascript'] || ''}<\/script>`;
      // Compose a full HTML document for preview
      preview.srcdoc = `
        ${html.includes('<html') ? html : `<html><head></head><body>${html}</body></html>`}
        <style>${this.codeStore['css'] || ''}</style>
        <script>${this.codeStore['javascript'] || ''}<\/script>
      `;
    };

    saveBtn.onclick = async () => {
      const lang = currentLang;
      const filename =
        filenameInput.value.trim() ||
        (lang === 'html'
          ? 'index1.html'
          : lang === 'css'
          ? 'style.css'
          : 'script.js');
      const code = this.editor.getValue();
      const mime =
        lang === 'html'
          ? 'text/html'
          : lang === 'css'
          ? 'text/css'
          : 'application/javascript';
      if ('showSaveFilePicker' in window) {
        // @ts-ignore
        const handle = await window.showSaveFilePicker({
          suggestedName: filename,
          types: [
            {
              description: 'Code Files',
              accept: { [mime]: ['.' + filename.split('.').pop()] }
            }
          ]
        });
        const writable = await handle.createWritable();
        await writable.write(code);
        await writable.close();
      } else {
        const blob = new Blob([code], { type: mime });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
        URL.revokeObjectURL(a.href);
      }
    };

    loadBtn.onclick = async () => {
      if ('showOpenFilePicker' in window) {
        // @ts-ignore
        const [handle] = await window.showOpenFilePicker({
          types: [
            {
              description: 'Code Files',
              accept: { '*/*': ['.html', '.css', '.js'] }
            }
          ]
        });
        const file = await handle.getFile();
        const ext: string = file.name.split('.').pop();
        const lang : string = ext === 'js' ? 'javascript' : ext;
        languageSelect.value = lang;
        monaco.editor.setModelLanguage(this.editor.getModel()!, lang);
        const text = await file.text();
        this.codeStore[lang] = text;
        this.editor.setValue(text);
      } else {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.html,.css,.js';
        input.onchange = e => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const ext = file.name.includes('.') ? file.name.split('.').pop() : '';            
            let lang: string= ext === 'js' ? 'javascript' : ext || 'html';
            if (!['html', 'css', 'javascript'].includes(lang)) {
              lang = 'html';
            }

            languageSelect.value = lang;
            monaco.editor.setModelLanguage(this.editor.getModel()!, lang);
            file.text().then(text => {
              this.codeStore[lang] = text;
              this.editor.setValue(text);
            });
          }
        };
        input.click();
      }
    };
  }
}

customElements.define('fcode-editor', FCodeEditor);