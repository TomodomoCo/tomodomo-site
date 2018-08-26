<?php

namespace Tomodomo\Controllers;

use Tomodomo\Models\Post;

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
            'post' => new Post(),
        ];

        return $this->twig->compile('page.twig', $context);
    }
}
