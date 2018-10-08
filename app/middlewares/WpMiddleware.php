<?php

namespace Tomodomo\Middlewares;

class WpMiddleware
{
    /**
     */
    public function load($request, $response, $next)
    {
        require __DIR__ . '/../../public/wp/wp-blog-header.php';

        $response = $next($request, $response);

        return $response;
    }
}
