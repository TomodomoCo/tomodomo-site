<?php

namespace Tomodomo\Theme;

use Tomodomo\Helpers\Git;
use Tomodomo\Models\Menu;
use Tomodomo\WpAssetRegistrar\Registrar;
use function Stringy\create as s;

/**
 * Add theme support
 *
 * @return void
 */
add_action('after_setup_theme', function () {
    // Featured images
    add_theme_support('post-thumbnails');
    add_theme_support('disable-custom-font-sizes');

    // Gutenberg wide alignment
    add_theme_support('align-wide');

    // Auto-generate the title tag
    add_theme_support('title-tag');

    return;
});

/**
 * Register theme nav menus
 *
 * @return void
 */
add_action('init', function () {
    register_nav_menus([
        'primary' => 'Primary Menu',
        'footer'  => 'Footer Menu',
    ]);

    return;
});

/**
 * Add items to Timber context to access on views
 *
 * @param array $context
 *
 * @return array
 */
add_filter('timber/context', function ($context) {
    // Load in menus
    $context['menu']['primary'] = new Menu('primary');
    $context['menu']['footer']  = new Menu('footer');

    // Get the active commit hash
    $context['commit'] = Git::getCurrentCommitHash();

    return $context;
});

/**
 * Register virtual page templates for Kaiso
 */
\Tomodomo\Kaiso::registerTemplates([
    [
        'slug' => 'canvas',
        'name' => 'Block Canvas',
        'postTypes' => [
            'page',
        ],
    ],
]);

/**
 * Handle asset registration
 */
$registrar = new Registrar([
    'urlPath' => '/',
]);

add_action('wp_enqueue_scripts', function () use ($registrar) {
    $registrar->addStyle('tomodomo-css', 'assets/css/style.css');
    $registrar->addScript('tomodomo-js', 'assets/js/script.js', [
        'dependencies' => [
            'jquery',
        ],
    ]);

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

/**
 * Make an asset URL relative
 *
 * @param string $input
 *
 * @return string
 */
function relativeAssetUrl($input)
{
    if (is_admin()) {
        return $input;
    }

    if ($input === null) {
        return $input;
    }

    // Remove the home_url if set
    $result = (string) s($input)->removeLeft(untrailingslashit(home_url()));

    return $result;
}

add_filter('script_loader_src', __NAMESPACE__ . '\\relativeAssetUrl');
add_filter('style_loader_src', __NAMESPACE__ . '\\relativeAssetUrl');
