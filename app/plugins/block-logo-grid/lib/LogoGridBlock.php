<?php

namespace Tomodomo\Gutenberg\Block;

use Tomodomo\WpAssetRegistrar\Registrar;

class LogoGridBlock
{
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

        // Handle asset enqueues
        $args = [
            'basePath' => trailingslashit(dirname(__DIR__)) . 'build/',
            'urlPath'  => '/content/plugins/tomodomo-block-logo-grid/build/',
        ];

        $registrar = new Registrar($args);

        // Enqueue editor JS
        $registrar->addScript('tomodomo-block-logo-grid-js', 'script.js', [
            'dependencies' => [
                'wp-i18n',
                'wp-blocks',
                'wp-element',
            ],
        ]);

        // Enqueue editor CSS
        $registrar->addStyle('tomodomo-block-logo-grid-css', 'editor.css');

        // Register the block
        register_block_type('tomodomo/logo-grid', [
            'editor_style'  => 'tomodomo-block-logo-grid-css',
            'editor_script' => 'tomodomo-block-logo-grid-js',
        ]);

        return;
    }
}
