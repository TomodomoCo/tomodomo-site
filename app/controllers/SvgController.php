<?php

namespace Tomodomo\Controllers;

class SvgController extends BaseController
{
    /**
     *
     * @param
     * @param
     * @param
     *
     * @return
     */
    public function get($request, $response, $args)
    {
        $path = $args['name'];

        // If the template doesn't exist, spit out a 404
        if (!$this->twig->getLoader()->exists($path)) {
            throw new \Slim\Exception\NotFoundException($request, $response);
        }

        // Build SVG args
        $params  = $request->getQueryParams();
        $svgArgs = [];

        if (isset($params['width']) && !empty($params['width'])) {
            $svgArgs['width'] = intval($params['width']);
        }

        if (isset($params['width']) && isset($params['height']) && !empty($params['height'])) {
            $svgArgs['height'] = intval($params['height']);
        }

        if (isset($params['fill']) && !empty($params['fill'])) {
            // Can't use a hash mark in a query parameter, so we add it in
            if (strlen($params['fill']) < 7) {
                $params['fill'] = "#{$params['fill']}";
            }

            $svgArgs['fill'] = esc_attr($params['fill']);
        }

        $response = $response->withHeader('Content-Type', 'image/svg+xml');

        return $this->twig->render($response, $path, $svgArgs);
    }
}
