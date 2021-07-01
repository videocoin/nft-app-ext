NAME=nft-app
VERSION?=$$(git rev-parse HEAD)

.PHONY: deploy build

default: release

version:
	@echo ${VERSION}

build:
	yarn run build

deps:
	yarn --ignore-optional
	yarn
