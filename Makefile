# Makefile helpers for the ratp-time-app project

APP_DIR := ratp-time-app

.PHONY: install run

install:
	npm install --prefix $(APP_DIR)

run: install
	NODE_OPTIONS="--max-http-header-size=65536" npm run dev --prefix $(APP_DIR)
