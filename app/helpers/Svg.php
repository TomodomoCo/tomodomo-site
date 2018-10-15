<?php

namespace Tomodomo\Helpers;

class Svg
{
    /**
     * Get Twig-ready arguments for SVGs
     *
     * @param array $params
     *
     * @return array
     */
    public static function getArgsFromParams(array $params)
    {
        $svgArgs = [];

        if (isset($params['width']) && !empty($params['width'])) {
            $svgArgs['width'] = intval($params['width']);
        }

        if (isset($params['width']) &&
            isset($params['height']) &&
            !empty($params['height'])) {
            $svgArgs['height'] = intval($params['height']);
        }

        if (isset($params['fill']) && !empty($params['fill'])) {
            $hexRegex = '/([a-f0-9]{3}){1,2}\b/i';

            // Check if we were passed a hex-style value
            $fillIsHex = boolval(preg_match($hexRegex, $params['fill']));

            // Can't use a hash mark in a query parameter, so we add it in
            if ($fillIsHex) {
                $params['fill'] = "#{$params['fill']}";
            }

            $svgArgs['fill'] = esc_attr($params['fill']);
        }

        return $svgArgs;
    }
}
