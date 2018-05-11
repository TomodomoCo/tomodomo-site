<?php

// Instantiate Timber
$timber = new \Timber\Timber();

// Define our view location
Timber::$locations = [
	ABSPATH . '/../../app/views',
];
