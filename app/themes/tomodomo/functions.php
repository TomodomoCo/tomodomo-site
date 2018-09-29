<?php

namespace Tomodomo\Theme;

use Tomodomo\Models\Menu;
use Tomodomo\WpAssetRegistrar\Registrar;

/**
 * Add theme support
 *
 * @return void
 */
function themeSupports()
{
    // Featured images
    add_theme_support('post-thumbnails');

    // Gutenberg wide alignment
    add_theme_support('align-wide');

    // Auto-generate the title tag
    add_theme_support('title-tag');

    return;
}

add_action('after_setup_theme', __NAMESPACE__ . '\\themeSupports');

/**
 * Register theme nav menus
 *
 * @return void
 */
function registerMenus()
{
    register_nav_menus([
        'primary' => 'Primary Menu',
        'footer'  => 'Footer Menu',
    ]);

    return;
}

add_action('init', __NAMESPACE__ . '\\registerMenus');

/**
 * Add items to Timber context to access on views
 *
 * @param array $context
 *
 * @return array
 */
function context($context)
{
    // Load in menus
    $context['menu']['primary'] = new Menu('primary');
    $context['menu']['footer']  = new Menu('footer');

    return $context;
}

add_filter('timber/context', __NAMESPACE__ . '\\context');

/*
add_filter('Tomodomo\Kaiso\CustomTemplates', function (array $templates) {
    $templates[] = [
        'name' => 'Narrow Page Template',
        'postTypes' => [
            'post',
            'page',
        ],
    ];

    return $templates;
});

add_filter('theme_page_templates', function (array $templates) {
    return [
        'template-test.php' => 'Test Template Test',
    ];
});
*/

/**
 * Handle asset registration
 */
$registrar = new Registrar();

add_action('wp_enqueue_scripts', function () use ($registrar) {
    $registrar->addStyle('tomodomo-css', 'assets/css/style.css');
    $registrar->addScript('tomodomo-js', 'assets/js/script.js');

    return;
});

add_action('wp_enqueue_scripts', function () use ($registrar) {
    $registrar->enqueueStyles();
    $registrar->enqueueScripts();

    return;
});

add_action('wp_enqueue_block_editor_assets', function () use ($registrar) {
    $registrar->enqueueStyles();

    return;
});
