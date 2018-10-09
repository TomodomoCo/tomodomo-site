<?php

namespace Tomodomo\Controllers;

use Tomodomo\Helpers\Svg;

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
        $svgArgs = Svg::getArgsFromParams($params);

        $response = $response->withHeader('Content-Type', 'image/svg+xml');

        return $this->twig->render($response, $path, $svgArgs);
    }
}
