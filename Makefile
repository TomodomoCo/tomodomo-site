build:
	npm i
	npm run build
	npx lerna bootstrap
	npx lerna exec --parallel --bail=false -- npm run build
