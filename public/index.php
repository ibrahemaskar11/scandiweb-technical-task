<?php

use App\Models\Order;
use App\Models\Product;

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../vendor/autoload.php';

define('BASE_PATH', dirname(path: __DIR__) . '/');

$dotenv = Dotenv\Dotenv::createImmutable(BASE_PATH);
$dotenv->load();

$dispatcher = FastRoute\simpleDispatcher(function (FastRoute\RouteCollector $r) {
    $r->addRoute('GET', '/hello', function () {
        //create an order like in the order resolver
        $order = Order::create([
            "total" => 1234,
            "currency_id" => "USD",
        ], [
            "id" => "apple-imac-2021",
            "quantity" => 2,
            "paid_amonut" => 1234,
            "paid_currency" => "USD",
            "selected_attributes" => [
                [
                    "id" => "Capacity",
                    "value" => "256GB"
                ],
                [
                    "id" => "Touch ID in keyboard",
                    "value" => "No"
                ],
                [
                    "id" => "With USB 3 ports",
                    "value" => "No"
                ]
            ]
        ]);
        return json_encode($order);
    });
    $r->addRoute('POST', '/graphql', [App\GraphQL\Controller::class, 'handle']);
});

$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

$routeInfo = $dispatcher->dispatch(
    $httpMethod,
    $uri
);

switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        if (preg_match('/\.(?:css|js|png|jpg|jpeg|gif|ico)$/', $uri)) {
            setMimeType($uri);
            readfile(BASE_PATH . 'public' . $uri);
            exit;
        }
        require(BASE_PATH . 'public/index.html');
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        $allowedMethods = $routeInfo[1];
        http_response_code(405);
        echo json_encode(value: ['error' => 'Method not allowed']);
        break;

    case FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        echo $handler($vars);
        break;
}

function setMimeType($filename)
{
    $mime_types = [
        'css' => 'text/css',
        'js' => 'application/javascript',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'ico' => 'image/x-icon',
    ];

    $ext = pathinfo($filename, PATHINFO_EXTENSION);

    if (array_key_exists($ext, $mime_types)) {
        header('Content-Type: ' . $mime_types[$ext]);
    } else {
        header('Content-Type: application/octet-stream');
    }
}
