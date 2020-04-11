# README

submit-this is a simple slack bot that can take a slack message, and construct a link (to a website of your choice) with the message included as a query parameter, and send you a slack message including the link. Designed to be useful for prefilling forms.

## Setup

### Pre-requisites

To run this bot you will need a server which is publicly addressable, since slack needs to tell the bot when messages arrive. This is easy to work aroung for development scenarios using for instance services like [ngrok](https://ngrok.com/).

Secondly, you'll need to make what slack calls 'an app' despite the name it doesn't involve coding. You'll just give your bot a name and some permissions to do things in the slack workspace you want to target. The overview of this process is

- Create an 'app'
- add 'Bots' under features and functionality
- Install the app into your slack workspace
- again under features and functionality, add 'event subscriptions' for the event 'app_mentions'
- lastly under features and functionality, got to permissions and add 'chat:write' ('app_mentions:read' should have been added for you already)
- now re-install the app in your workspace, because adding the event subscriptions changed the permissions.

The best guide I can find for this is [Developing Slack apps locally](https://slack.dev/node-slack-sdk/tutorials/local-development), most of which also applies to a production environment.

### Install

Clone [this repo](https://github.com/baob/submit-this)

In your repo's directory, run `yarn` or `npm install` according to your preference.

Take a copy of `.env.example` called `.env`

### Configure Slack

For development use, in the file `.env` customise the two slack environment variables with values for your app and workspace at [api.slack.com](htts://api.slack.com).
You will need the slack signing secret from 'basic information' and the 'Bot User OAuth Access Token' from the 'OAuth and permissions' page.
In development (NODE_ENV=development or not defined) the app will read the variables from this file.

For production (NODE_ENV=production) you will need to set these environment variables yourself. E.g. heroku lets you define these variable via your dashboard.

### Configure the bot

Configure more environment variables (differently in development and production as above)

- PORT - the port your server will run on
- SUBMIT_MESSAGE_TEMPLATE - to customise the complete message created by the bot.  
- SUBMIT_LINK_TEMPLATE - to customise the link created by the bot.  

You may find [this formatting guide](https://api.slack.com/reference/surfaces/formatting#linking-urls) useful ... most importantly, it shows how to craft a message with a url linked from alternative text, since this bot will likely be creating long links.

### Start

- Shell script: `bin/bot`
- Node: `node index` or `nodemon index`

## Design Decisions

Do not use [RTM api](https://slack.dev/node-slack-sdk/rtm-api) it appears to be deprecated and use [events api](https://slack.dev/node-slack-sdk/events-api) to capture messages instead.

Use [12 Factor](https://12factor.net/) principles

## Dependencies

### ngrok

(useful for development)

Free service. Can install via homebrew (https://gist.github.com/wosephjeber/aa174fb851dfe87e644e)

[Getting started with ngrok](https://dashboard.ngrok.com/get-started)

## Reference

[node-slack-sdk](https://github.com/slackapi/node-slack-sdk)