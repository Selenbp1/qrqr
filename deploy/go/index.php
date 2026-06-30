<?php
$targetFile = __DIR__ . '/target.txt';

if (!is_readable($targetFile)) {
    http_response_code(500);
    exit('target.txt not found');
}

$target = trim(file_get_contents($targetFile));

if ($target === '' || !filter_var($target, FILTER_VALIDATE_URL)) {
    http_response_code(500);
    exit('Invalid target URL in target.txt');
}

header('Location: ' . $target, true, 302);
exit;
