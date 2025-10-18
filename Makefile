# Makefile helpers for the ratp-time-app project

APP_DIR := ratp-time-app

.PHONY: install run

install:
	npm install --prefix $(APP_DIR)

run: install
	npm run dev --prefix $(APP_DIR)
