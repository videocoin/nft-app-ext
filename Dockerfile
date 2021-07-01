FROM node:15-alpine3.11 as builder

RUN apk add build-base git libc6-compat openssh-client python autoconf automake libtool nasm libpng-dev
RUN apk upgrade libcurl

ARG REACT_APP_BASE_URL
ARG REACT_APP_NETWORKS
ARG REACT_APP_TOKEN_ADDRESS
ARG REACT_APP_ESCROW_ADDRESS
ARG REACT_APP_WYVERN_EXCHANGE
ARG REACT_APP_WYVERN_PROXY_REGISTRY
ARG REACT_APP_WYVERN_ATOMICIZER
ARG REACT_APP_WYVERN_TOKEN_TRANSFER_PROXY        
ARG REACT_APP_WYVERN_DAO
ARG REACT_APP_WYVERN_TOKEN
ARG REACT_APP_CUSTOM_PROVIDER_URL
ARG REACT_APP_API_BASE_CUSTOM
ARG REACT_APP_SITE_HOST_CUSTOM
ARG REACT_APP_CUSTOM_FEE_RECIPIENT

COPY . /ui

WORKDIR /ui

RUN make deps
RUN make build

FROM nginx:1.11.8-alpine

COPY --from=builder /ui/build /usr/share/nginx/html
COPY --from=builder /ui/deploy/nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
