# For server side deployment on railway
FROM node:14
EXPOSE 3000

WORKDIR /usr/src/app
COPY api/package.json ./
RUN npm install
COPY api .

EXPOSE 3000

RUN npm run build

CMD npm run start