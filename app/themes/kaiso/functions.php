<?php

add_filter('Tomodomo\Kaiso\CustomTemplates', function ($templates) {
	$templates[] = [
		'name' => 'Narrow Page Template',
		'postTypes' => [
			'post',
			'page',
		],
	];

	return $templates;
});

add_filter('theme_page_templates', function ($templates) {
	return [
		'template-test.php' => 'Test Template Test',
	];
});
