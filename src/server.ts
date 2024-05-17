import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
// const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on PORT === ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
// fozlerabbishuvo
// 6G1ozScccglhbdF9
