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

        if (isset($params['width'])) {
            $svgArgs['width'] = intval($params['width']);
        }

        if (isset($params['width']) && isset($params['height'])) {
            $svgArgs['height'] = intval($params['height']);
        }

        if (isset($params['fill'])) {
            $svgArgs['fill'] = esc_attr($params['fill']);
        }

        return $this->twig->render($response, $path, $svgArgs);
    }
}
