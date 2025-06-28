<?php
require 'vendor/autoload.php';

use Webauthn\AuthenticatorAttestationResponse;
use Webauthn\PublicKeyCredentialLoader;

// Get JSON from frontend
$data = json_decode(file_get_contents('php://input'), true);

$loader = new PublicKeyCredentialLoader();
$publicKeyCredential = $loader->loadArray($data);

// Verify the attestation response (simplified, see docs for full validation)
$response = $publicKeyCredential->getResponse();
if ($response instanceof AuthenticatorAttestationResponse) {
    // Store credential info in your DB for this user
    // $publicKeyCredential->getRawId(), $response->getAttestationObject(), etc.
    echo json_encode(['status' => 'ok']);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid response']);
}