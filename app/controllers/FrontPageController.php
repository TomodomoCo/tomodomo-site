<?php

namespace Tomodomo\Controllers;

use Tomodomo\Models\Page;

class FrontPageController extends BaseController
{
    /**
     * Handle GET requests to this route
     *
     * @param \GuzzleHttp\Psr7\Request $request
     * @param null $response
     * @param array $args
     *
     * @return string
     */
    public function get($request, $response, $args)
    {
        // Context
        $context = [
            'post' => new Page(),
        ];

        return $this->twig->compile('canvas.twig', $context);
    }
}
