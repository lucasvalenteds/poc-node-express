import { createExpressServer, createExpressRouter } from "./src/api";

const port = process.env.PORT;

createExpressServer(createExpressRouter())
  .listen(port)
  .once("listening", () => console.log("Server running on port %d", port));
