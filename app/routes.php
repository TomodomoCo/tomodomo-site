<?php

//
$app->group('', function() use ($app) {

    $app->get('/svg/{name:.+}', '\Tomodomo\Controllers\SvgController:get');

})->add('\Tomodomo\Middlewares\WpMiddleware:load');

// Support trailing slash
//$app->add(new TrailingSlash(false));

// Fallback to WordPress
$app->any('{path:.+}', function() {
    require __DIR__ . '/../public/wp/index.php';
    exit;
});
