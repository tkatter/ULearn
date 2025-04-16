const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const emoji = require("./utils/emoji");

dotenv.config({ path: "backend/config.env" });

const database = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(database).then(() => {
  console.log(`DB connection successful! ${emoji.greenCheck}`);
});

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}... ${emoji.greenCheck}`);
  console.log(
    `Node is running in a ${process.env.NODE_ENV} environment ${emoji.dev}`
  );
});
