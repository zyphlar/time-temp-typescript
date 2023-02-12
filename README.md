# Twilio Time & Temperature in Typescript
Make your own Time and Temperature phone number!

A rewrite of https://gitlab.com/zyphlar/twilio-time-and-temperature in Typescript.

## Prerequisites

- A Twilio account
- NodeJS 18.x
- Ideally, AWS Lambda for hosting, but not required

## Configuration/Running/Building

- Copy `util/parser.orig.ts` to `util/parser.ts` and edit it to match your desired Twilio phone numbers and locales.
- For easy dev, run `npm run dev-build-start`.
- Access time-temp.php to ensure it's working (should generate Twilio-compatible XML aka TwiML.)

## Deployment

- To deploy to AWS Lambda, run `npm run build` and upload dist/index.zip to a new Lambda function.
- Set your Twilio phone number(s) to send an HTTP POST WebHook to the Lambda function.
- Call the number to test!
