# README

submit-this is a simple slack bot that can take a slack message, and construct a link (to a website of your choice) with the message included as a query parameter, and send you a message including the link. Designed to be useful for prefilling forms.

## Design Decisions

Do not use [RTM api](https://slack.dev/node-slack-sdk/rtm-api) it appears to be deprecated and use [events api](https://slack.dev/node-slack-sdk/events-api) to capture messages instead.

[12 Factor](https://12factor.net/) principles

## Dependencies

### ngrok

(useful for development)

Free service. Can install via homebrew (https://gist.github.com/wosephjeber/aa174fb851dfe87e644e)

[Getting started](https://dashboard.ngrok.com/get-started)

## Reference

https://github.com/slackapi/node-slack-sdk