build:
	composer install --ignore-platform-reqs --no-interaction
	npm ci
	npm run build
	npm run lerna-build-install
	npm run lerna-build
