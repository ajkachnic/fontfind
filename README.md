# fontfind

> An open source tool for finding fonts, utilizing a recommendation algorithm

## Running locally

If you'd like to run the application on your own hardware, there are a couple of prerequisites:

1. Have redis installed locally
2. Have `yarn` installed (`npm i -g yarn`)

From there, install the dependencies with `yarn install`.

### Running the API

To run the API, you need to create a file in the path `api/.env`. From there, get a [Google Fonts API Key](https://developers.google.com/fonts/). If you'd like to specify a custom redis URL, you can also do that (but it's optional)

```sh
FONTS_KEY="your key"
REDIS_URL="my url"
```

Finally, you can run `yarn workspace @fontfind/api dev` if you're actually working on it, or just `yarn workspace @fontfind/api build` and then `yarn workspace @fontfind/api start` if not.

### Running the website

First, create a file at `website/.env`, then add the following contents

```sh
# Replace with whatever URL you please
SNOWPACK_PUBLIC_API_URL="ws://localhost:3000/socket"
```

You can swap that out for any URL, as long as the protocol is `ws://` or `wss://`.

Then, run `yarn workspace @fontfind/website start` to run the website in development mode.
