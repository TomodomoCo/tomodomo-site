<?php

use Interop\Container\ContainerInterface;
use Slim\Container;
use Slim\Views\Twig;

$container = $app->getContainer();

// Twig
$container['twig'] = function ( $c ) {
	$settings = $c->get('settings');

	$twig = new Twig(
		$settings['view']['baseTemplatePath'],
		$settings['view']['twig']
	);

    // Add additional paths
    $twig->getLoader()->setPaths($settings['view']['moreTemplatePaths']);

	return $twig;
};
