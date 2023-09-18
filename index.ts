import mongoose from "mongoose";
import RequestsController from "./src/controllers/RequestsController";

console.time('Execution Time');

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    return RequestsController.redirectRequests(req);
  },
});

mongoose.connect('mongodb://127.0.0.1:27017/mongoose-app')
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error(err));

console.log(`Listening on http://localhost:${server.port} ...`);

console.timeEnd('Execution Time');
