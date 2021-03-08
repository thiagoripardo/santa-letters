import 'dotenv/config';
import './configs/modules-alias-config';
import mongooseConnection from './configs/mongoose-config';
import Server from './server';

const init = async () => {  
  try {
    await mongooseConnection();
    const server = new Server();
    server.start();
  } catch (err) {
    console.error(err);
  }
}

init();