require('dotenv/config');
require('./dist/configs/modules-alias-config');
const awsServerlessExpress = require('aws-serverless-express');
const App = require('./dist/server').default;
const mongooseConnection = require('./dist/configs/mongoose-config').default;



const appInstance = new App();
const server = awsServerlessExpress.createServer(appInstance.getServer());

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await mongooseConnection();
  } catch (err) {
    console.error(err);
  }
  
  return awsServerlessExpress.proxy(server, event, context);
}