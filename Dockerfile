FROM node:lts-alpine as builder-dependencies
WORKDIR /build
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile

FROM node:lts-alpine as builder
WORKDIR /build
COPY --from=builder-dependencies /build/ /build
COPY . .

RUN yarn run build && \
    yarn cache clean

FROM nginx:alpine
COPY .build/nginx.conf /etc/nginx/conf.d/configfile.template
COPY --from=builder /build/dist /usr/share/nginx/html
EXPOSE $PORT
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"