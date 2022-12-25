import express from "express";
import cors from "cors";

import * as routes from "./routes";

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: "GET, POST, PATCH, DELETE, OPTIONS, HEAD",
  allowHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: [
    "Authorization",
    "x-CSRF-Token",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
    "Content-Type",
    "Accept",
    "Accept-Encoding",
  ],
};

app.use(cors(corsOptions));

app.use("/api", routes.default);

const port = 5555;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

export default app;
