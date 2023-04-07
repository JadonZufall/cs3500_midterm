<?php
include header.inc.php;

$_GLOBALS = [];
$_GLOBALS['routes'] = [

];
$_GLOBALS['err_routes'] = [
    404 =>  "static/err/404.php",
];

function abort($err_code=404) {
    http_response_code($err_code);
    if (array_key_exists($err_code, $_GLOBALS['err_routes'])) {
        require $_GLOBALS['err_routes'][$err_code];
    }
    else {
        echo "No page provided, ERROR {$err_code}";
    }
    die();
}



$uri = parse_url($_SERVER['REQUEST_URI'])['path'];