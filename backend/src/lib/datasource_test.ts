import { DataSource } from "typeorm";
import Book from "../entities/book.entity";

export default new DataSource({
  type: "sqlite",
  database: "./demo-test.sqlite",
  synchronize: true,
  entities: [Book],
  logging: ["query", "error"],
});
