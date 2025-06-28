<?php
require 'vendor/autoload.php';

use Webauthn\PublicKeyCredentialCreationOptions;
use Webauthn\PublicKeyCredentialRpEntity;
use Webauthn\PublicKeyCredentialUserEntity;

// Generate options (simplified)
$rp = new PublicKeyCredentialRpEntity('My App', 'your-domain.com');
$user = new PublicKeyCredentialUserEntity('username', 'user-id', 'username');
$options = new PublicKeyCredentialCreationOptions(
    $rp,
    $user,
    random_bytes(32), // challenge
    []
);

header('Content-Type: application/json');
echo json_encode($options);