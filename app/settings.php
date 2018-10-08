<?php

return [
	'settings' => [
		'displayErrorDetails' => true, // set to false in production
		'addContentLengthHeader' => false,
		'determineRouteBeforeAppMiddleware' => true,

		// Twig settings
		'view' => [
            'baseTemplatePath' => __DIR__ . '/views',
            'moreTemplatePaths' => [
                __DIR__ . '/assets/svg',
            ],
			'twig' => [
				'cache' => false,
				'debug' => true,
				'autoescape' => false,
			],
		],
	],
];
