FROM node:lts-alpine as builder-dependencies
WORKDIR /build
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile

FROM node:lts-alpine as builder
WORKDIR /build
COPY --from=builder-dependencies /build/ /build
COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL $VITE_BACKEND_URL

RUN yarn run build && \
    yarn cache clean

FROM node:lts-alpine as tester
WORKDIR /build
COPY --from=builder-dependencies /build/ /build
COPY . .

CMD yarn run test:unit --run --reporter=basic --reporter=junit --outputFile=/build/output/tests.xml

FROM nginx:alpine as runner
COPY .build/nginx.conf /etc/nginx/conf.d/configfile.template
COPY --from=builder /build/dist /usr/share/nginx/html
EXPOSE $PORT
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"