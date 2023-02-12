import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
const querystring = require('node:querystring');

import * as homeController from "./controllers/home";

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  var params;
  console.error("Event", event);

  if (event.isBase64Encoded && event.body != "") {
    const postVars = Buffer.from(event.body, 'base64').toString('utf8');
    params = querystring.parse(postVars);
  } else {
    params = event.queryStringParameters;
  }

  return {
    statusCode: 200,
    headers: {"content-type": "application/xml"},
    body: await homeController.lambda(params)
  };

};
