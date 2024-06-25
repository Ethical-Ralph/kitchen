import app from "./app";

const init = () => {
  try {
    app.listen(3000, () => {
      console.log("Express App Listening on Port 3000");
    });
  } catch (error: any) {
    console.error(`An error occurred: ${error.message}`);
    process.exit(1);
  }
};

init();
