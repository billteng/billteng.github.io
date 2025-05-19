// See https://aka.ms/new-console-template for more information

Console.WriteLine("Hello, World!");

public class Check
{
    public string PracticeName { get; set; }
    public string CheckNumber { get; set; }
    public decimal Amount { get; set; }

}

public class Remittance
{
    public string PracticeName { get; set; }
    public string CheckNumber { get; set; }
    public decimal Amount { get; set; }
}

public interface IFTPService
{
    void UploadFile(string filePath);
    void DownloadFile(string filePath);
}

public class CheckRepository
{
    private List<Check> checks = new List<Check>();

    public CheckRepository(IFTPService fTPService)
    {
        // FTP service get all checks

        // Initialize with some dummy data
        checks.Add(new Check { PracticeName = "Practice A", CheckNumber = "12345", Amount = 100.00m });
        checks.Add(new Check { PracticeName = "Practice B", CheckNumber = "67890", Amount = 200.00m });
        checks.Add(new Check { PracticeName = "Practice C", CheckNumber = "54321", Amount = 300.00m });
    }

    public List<Check> GetChecks(string FTP)
    {
        return checks;
    }

    public Check GetCheck(string checkNumber)
    {
        return checks.FirstOrDefault(c => c.CheckNumber == checkNumber);
    }

}

public class ReturnMsg
{
    public bool Result { get; set; }
    public string JsonString { get; set; }
}

public ReturnMsg Validation(T obj)
{
    if (T is null) return new ReturnMsg() { };


}

public class PaymentProcessor
{
    private Check _check;
    private Remittance _remit;
    public GetCheckAndRemittance(string ftp)
    {
    }

    public ReturnMsg ValidateCheck(Check check)
    {
        return Validation(Check);


    }

    public ReturnMsg ValidateRemittance(Check check)
    {
        return Validation(Check);


    }
    public ReturnMsg Processor()
    {
        // Get check from FTP

        // validate check 
        var r1 = ValidateCheck;
        // if Flase return { result: false, body {} }
        // Get Remittance from FTP
        var r2 = ValidatinRemittance;

        if (r1.Result && r2.Result)
        {
            // process 
            // return new Re
        }
        else
        {
            //r1.JsonString 
            //reture 
        }

    }
}