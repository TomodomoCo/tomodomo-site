<?php

namespace Tomodomo\Gutenberg\Block;

use Tomodomo\Helpers\Svg;
use Tomodomo\WpAssetRegistrar\Registrar;
use Twig_Environment;
use Twig_Loader_Filesystem;

class LogoGridLogoBlock
{
    /**
     * Twig render environment
     *
     * @var Twig_Environment|null
     */
    public $twig = null;

    /**
     * Initialise the plugin
     *
     * @return void
     */
    public function init()
    {
        add_action('init', [$this, 'register']);

        return;
    }

    /**
     * Register the logos block
     *
     * @return void
     */
    public function register()
    {
        // Make sure Gutenberg is loaded
        if (!function_exists('register_block_type')) {
            return;
        }

        // Register the block
        register_block_type('tomodomo/logo-grid-logo', [
			'attributes' => [
                'backgroundColor' => [
					'type' => 'string',
                ],
                'customBackgroundColor' => [
					'type' => 'string',
                ],
				'svgName' => [
					'type'    => 'string',
					'default' => '',
				],
				'svgParams' => [
					'type'    => 'string',
					'default' => '',
				],
            ],
            'render_callback' => [$this, 'render'],
        ]);

        return;
    }

    /**
     * @return \Twig_Environment
     */
    public function getTwig()
    {
        if ($this->twig ?? false) {
            return $this->twig;
        }

        $dir = ABSPATH . '../../app/assets/svg';

        // Set up Twig
        $this->loader = new Twig_Loader_Filesystem($dir);
        $this->twig   = new Twig_Environment($this->loader);

        return $this->twig;
    }

    /**
     * @return string
     */
    public function render(array $attributes)
    {
        // Fetch our Twig environment
        $twig = $this->getTwig();

        // SVG file name
        $svg = esc_attr($attributes['svgName']);

        if (!$this->loader->exists($svg)) {
            return '<!-- -->';
        }

        // Get the args
        parse_str($attributes['svgParams'], $params);
        $svgArgs = Svg::getArgsFromParams($params);

        // Render the SVG
        $svg = $twig->render($svg, $svgArgs);


        // Define custom style attribute
        $attr = empty($attributes['customBackgroundColor']) ? '' : 'style="background-color: ' . $attributes['customBackgroundColor'] . ';"';

        // Define classnames
        $classes[] = "logo-grid__logo";
        $classes[] = empty($attributes['backgroundColor']) ? '' : "has-{$attributes['backgroundColor']}-background-color";

        // Add the class
        $attr .= ' class="' . implode($classes, ' ') . '"';

        return sprintf('<div %s>%s</div>', $attr, $svg);
    }
}

