FROM node:15-alpine3.11 as builder

RUN apk add build-base git libc6-compat openssh-client python autoconf automake libtool nasm libpng-dev
RUN apk upgrade libcurl

COPY . /ui

WORKDIR /ui

RUN make deps
RUN make build

FROM nginx:1.15.2-alpine

RUN apk add bash

WORKDIR /usr/share/nginx/html

COPY ./env.sh .
COPY .env .
RUN chmod +x env.sh

COPY --from=builder /ui/build /usr/share/nginx/html
COPY --from=builder /ui/deploy/nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
