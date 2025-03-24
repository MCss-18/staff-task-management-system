import { createPool } from "mysql2/promise";
import { config } from "../config/app.config.js";

const dbsettings = {
  
  host: config.DB.DB_HOST,
  database: config.DB.DB_DATABASE,
  user: config.DB.DB_USER,
  password: config.DB.DB_PASSWORD,
  port: Number(config.DB.DB_PORT),

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  decimalNumbers: true
};

const pool = createPool(dbsettings);

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('DB Connection Successful');
    connection.release();
  } catch (err) {
    console.error('DB Connection Failed:', err);
  }
})();

export { pool };