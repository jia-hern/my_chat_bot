import express from "express";
import cors from "cors";

import chatRoute from "./routes/chat.js";
import configRoute from "./routes/config.js";
import mistakesRoute from "./routes/mistakes.js";
import metaRoute from "./routes/meta.js";

const app = express();
app.use(cors({ origin: "http://localhost:3000" })); // allow frontend
app.use(express.json());

app.use("/chat", chatRoute);
app.use("/config", configRoute);
app.use("/mistakes", mistakesRoute);
app.use("/meta", metaRoute);

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
