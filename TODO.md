# TODO

## More explanation in README examples/screenshots

## contributors guide in README

## more tests

## CI on heroku

## Changelog

## on a slack thread, takes the main message of the thread if no content

## flow

can flow do anything useful (matching parameter lists ?) without needing babel.

See [this](https://medium.com/javascript-scene/you-might-not-need-typescript-or-static-types-aa7cb670a77b)

## Consider converting to bolt or botkit

[Bolt](https://slack.dev/bolt/tutorial/getting-started)

[botkit](https://botkit.ai/docs/v4/core.html)

## make the app respond to 'url_verify'

So we don't need to run

    ./node_modules/.bin/slack-verify --secret $SLACK_SIGNING_SECRET --path=/slack/events --port=$PORT

on a production server again

See [verifying-requests-from-slack](https://api.slack.com/authentication/verifying-requests-from-slack) and [url_verification](https://api.slack.com/events/url_verification)
