<?php

namespace Tomodomo\Theme;

/**
 * Add theme support
 *
 * @return void
 */
function themeSupports() {
	// Featured images
	add_theme_support( 'post-thumbnails' );

	// Gutenberg wide alignment
	add_theme_support( 'align-wide' );

	// Disable Gutenberg colors
	add_theme_support( 'disable-custom-colors' );

	// Auto-generate the title tag
	add_theme_support( 'title-tag' );

    return;
}

add_action('after_setup_theme', __NAMESPACE__ . '\\themeSupports');

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
