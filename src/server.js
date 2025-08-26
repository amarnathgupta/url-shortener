import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({
    status: "Ok",
    message: "Hello from Express server!",
  });
});

export default app;
