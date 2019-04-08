FROM keymetrics/pm2:latest-alpine

RUN npm i -g pm2

WORKDIR /var/www/app
COPY ./ ./
RUN npm i

ENV NODE_ENV production 
ENV PORT 3000

EXPOSE 3000

RUN npm run build

CMD ["pm2-runtime", "index.js", "i", "2"]
