# Makefile helpers for the ratp-time-app project

APP_DIR := ratp-time-app

.PHONY: install up run test build deploy

install:
	npm install --prefix $(APP_DIR)

run: install
	NODE_OPTIONS="--max-http-header-size=65536" npm run dev --prefix $(APP_DIR)

up: run

test: install
	npm run build --prefix $(APP_DIR)

build: install
	npm run build --prefix $(APP_DIR)

deploy: install
	npm run build --prefix $(APP_DIR)
	npm run deploy --prefix $(APP_DIR)
