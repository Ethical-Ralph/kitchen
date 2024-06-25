import app from "./app";
import { serverEnv } from "./config";
import { dataSource } from "./database";

const init = () => {
  try {
    dataSource
      .initialize()
      .then(() => {
        console.log("Database Connected");

        app.listen(serverEnv.PORT, () => {
          console.log("Express App Listening on Port", serverEnv.PORT);
        });
      })
      .catch((err) => {
        console.error("Error during database connection", err);
      });
  } catch (error: any) {
    console.error(`An error occurred: ${error.message}`);
    process.exit(1);
  }
};

init();
