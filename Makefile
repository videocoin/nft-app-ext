NAME=nft-demo
VERSION?=$$(git rev-parse HEAD)

REGISTRY_SERVER?=registry.videocoin.net
REGISTRY_PROJECT?=cloud

REACT_APP_BASE_URL?=https://marketplace.dev.videocoin.network/api/v1
REACT_APP_NETWORKS?=1337,5
REACT_APP_TOKEN_ADDRESS?=0xc35550282b2a7F2148dD4513c70f9dAA1AFA277C
REACT_APP_ESCROW_ADDRESS?=0x6bB9DF55B2c7DE181DB2F953B3f5e15baC7e1523

.PHONY: deploy build

default: release

version:
	@echo ${VERSION}

build:
	yarn run build

deps:
	yarn --ignore-optional
	yarn

docker-build:
	docker build -t ${REGISTRY_SERVER}/${REGISTRY_PROJECT}/${NAME}:${VERSION} \
	--build-arg REACT_APP_BASE_URL=${REACT_APP_BASE_URL} \
	--build-arg REACT_APP_NETWORKS=${REACT_APP_NETWORKS} \
	--build-arg REACT_APP_TOKEN_ADDRESS=${REACT_APP_TOKEN_ADDRESS} \
	--build-arg REACT_APP_ESCROW_ADDRESS=${REACT_APP_ESCROW_ADDRESS} \
	-f Dockerfile .


docker-push:
	docker push ${REGISTRY_SERVER}/${REGISTRY_PROJECT}/${NAME}:${VERSION}

release: docker-build docker-push

deploy:
	helm upgrade -i --wait --set image.tag="${VERSION}" -n videocoin-network nft-demo ./deploy/helm
