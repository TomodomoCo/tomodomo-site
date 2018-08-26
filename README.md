# tomodomo.co

In the spirit of open source, and in the interest of providing a guiding light for developers who are as excited about the new [Gutenberg editor for WordPress](https://wordpress.org/gutenberg/) as we are, we've open sourced our website!

## Why?

We decided to open source for a few reasons:

1. There's nothing about our site that necessitates keeping our code private. As big open source believers already, it felt like there was no reason _not_ to open source the site.
2. It offers a good demonstration of how we structure our projects, and a practical working example of our [Kaiso](https://github.com/TomodomoCo/kaiso) framework.
3. It also offers the same demonstrative power of a relatively complex Gutenberg website. We believe more examples of Gutenberg in practice are valuable as they help inspire developers to take on their own Gutenberg projects.

## Usage

Vagrant setup:

1. `git clone [repo]`
2. `cp -r app/secrets-example app/secrets`
3. Fill out files in `app/secrets/`
4. `vagrant up`

Building the project:

1. `composer install`
2. `nvm install && nvm use`
3. `npm install`
4. `npm run dev` or `npm run build`

Linting:

+ `npm run lint-php` for both `phpcs` and `psalm`
+ `npm run phpcs` or `./vendor/composer/bin/phpcs`
+ `npm run psalm` or `./vendor/composer/bin/psalm`

Building plugin dependencies (e.g. for Gutenberg blocks):

1. `npm run lerna-install`
2. `npm run lerna-dev` or `npm run lerna-build`

## About Tomodomo

Tomodomo is a creative agency for magazine publishers. We use custom design and technology to speed up your editorial workflow, engage your readers, and build sustainable subscription revenue for your business.

Learn more at [tomodomo.co](https://tomodomo.co) or email us: [hello@tomodomo.co](mailto:hello@tomodomo.co)

## License

Excluding the exceptions listed below, this project is licensed under the terms of the MIT License, included in `LICENSE.md`.

### License Exceptions

+ All images in `app/images/` are © 2018 Tomodomo or their respective owners
+ All files in `app/views/partials/svgs/` are © 2018 Tomodomo or their respective owners
+ Font files in `app/assets/fonts/lekton-tomodomo/` are licensed under the terms of the SIL Open Font License, available at `app/assets/fonts/lekton-tomodomo/LICENSE.md`

## Code of Conduct

All open source Tomodomo projects follow a strict code of conduct, included in `CODEOFCONDUCT.md`. We ask that all contributors adhere to the standards and guidelines in that document.

Thank you!
