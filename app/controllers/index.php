<?php

$context = Timber::get_context();

$context['posts'] = new Timber\PostQuery();

$content = Timber::fetch(['index.twig'], $context);

echo $content;
