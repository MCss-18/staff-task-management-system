import "dotenv/config";
import app from './app.js';
import { config } from "./config/app.config.js";

app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
});