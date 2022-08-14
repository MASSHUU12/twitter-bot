# Twitter Bot

A tool for automatic posting on Twitter at set intervals.

I set a goal that this program can be used with as little configuration as possible, and without the need to install a ton of other programs. As such, this program only requires Node, nor does it use a database (not counting Web Storage).

# Setup

### Prerequisites:

- [Node ^18.6.0](https://nodejs.org/)
- [Twitter Developer Portal](https://developer.twitter.com/)

> Before you start, copy the `.env.example` file located in both the `api` and `client` directories and name them `.env`.

### Create an application on the [Twitter Developer Portal](https://developer.twitter.com/).

In the `User authentication settings` section, enable `OAuth 2.0`.

Set `Type of App` as `Automated App or Bot`.

Set `Callback URI / Redirect URL` as `http://127.0.0.1:8000/callback` (port you can change to whatever you want).

Set the `Website URL` to anything.

Save `Client ID` and `Client Secret` in `.env` file located `./api/.env` (If you changed the port in the earlier section, you must also change it in .env.).

### The first bot launch.

To run the API for the first time, use in the terminal:

```sh
> cd .\api\
> npm i
> npm run dev
```

To run the client for the first time, use in the terminal:

```sh
> cd .\client\
> npm i
> npm start
```

> Przy każdym kolejnym uruchomieniu nie musisz używać `npm i`.

Now when you go to http://127.0.0.1:8000/ in your browser (if you changed the port, use it instead of 8000), you should see what to do next.

#### [Optional] Changing the time a bot posts on Twitter.

You can change the time in the .env file located in `./client/.env`.
