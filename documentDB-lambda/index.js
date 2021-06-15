const mongoose = require('mongoose');


module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  mongoose.Promise = global.Promise;

  mongoose.set('debug', true)

  return await mongoose
    .connect(process.env.MONGO_URI, { 
      useUnifiedTopology: true, 
      useNewUrlParser: true, 
      useFindAndModify: false,
      ssl: true,
      sslValidate: true,
      sslCA: require('fs').readFileSync(`${__dirname}/ca/rds-combined-ca-bundle.pem`)
    })
    .then((res) => {
      console.log('Successfully connected to mongodb');
    })
    .catch((err) => {
      console.error(err);
    });
};