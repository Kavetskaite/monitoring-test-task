import { DataSource } from "typeorm";

export class DBConnection {
  static connection?: DataSource;

  static getConnection() {
    console.log(process.env.DB_HOST);
    if (!this.connection) {
      this.connection = new DataSource({
        type: "mysql",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 3307),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: ["src/entity/index.ts"],
        logging: true,
        synchronize: process.env.DB_SYNCHRONIZE === "true",
      });
    }

    return this.connection;
  }
}
