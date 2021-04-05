# For server side deployment on railway
FROM node:14
EXPOSE 3000

WORKDIR /usr/src/app
COPY . .

# Install dependencies
RUN yarn install

# Build
RUN yarn workspace @fontfind/api build

EXPOSE 3000
# Run
CMD yarn workspace @fontfind/api start 