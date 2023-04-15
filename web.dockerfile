FROM node:18.15.0 AS builder
WORKDIR /app
EXPOSE 3000
COPY ./web /app
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

FROM nginx:1.23.4-alpine as production
ENV NODE_ENV production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]