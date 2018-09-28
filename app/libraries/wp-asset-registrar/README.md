Hello

```php
<?php

use Tomodomo\WpAssetRegistrar\Registrar;

$registrar = new Registrar();

add_action('wp_enqueue_scripts', function () use ($registrar) {
    $registrar->addScript('my-js-libs', '/assets/js/script.js', [
        'dependencies' => [
            'jquery',
        ],
    ]);

    $registrar->addScript('my-js', '/assets/js/script.js', [
        'dependencies' => [
            'my-js-libs',
        ],
    ]);

    $registrar->addStyle('my-css', '/assets/css/style.css');
});

add_action('wp_enqueue_scripts', [$registrar, 'enqueueScripts']);
add_action('wp_enqueue_scripts', [$registrar, 'enqueueStyles']);
```
