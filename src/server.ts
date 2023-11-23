import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(PORT, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
