import app from "./app";
import { dataSource } from "./database";

const init = () => {
  try {
    dataSource
      .initialize()
      .then(() => {
        console.log("Database Connected");

        app.listen(3000, () => {
          console.log("Express App Listening on Port 3000");
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
