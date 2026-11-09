# OmiLAXR website (Astro)
# Usage: make <target>
# Notes:
# - Static files live in static/, the build output goes to public/
# - Pushes to main are deployed to GitHub Pages (.github/workflows/deploy.yml)

NPM ?= npm

.DEFAULT_GOAL := help

.PHONY: help install dev build preview tailwind clean

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies from package-lock.json
	$(NPM) ci

node_modules: package-lock.json
	$(NPM) ci
	@touch node_modules

dev: node_modules ## Start the dev server with hot reload
	$(NPM) run dev

build: node_modules ## Build the site into public/
	$(NPM) run build

preview: build ## Build and serve the production site locally
	$(NPM) run preview

tailwind: node_modules ## Rebuild the Tailwind CSS bundle
	$(NPM) run tailwind:build

clean: ## Remove build output and Astro cache
	rm -rf public .astro
