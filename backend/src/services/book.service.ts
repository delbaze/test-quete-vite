import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import Book, { InputCreateBook } from "../entities/book.entity";

export default class BookService {
  db: Repository<Book>;
  constructor() {
    this.db = datasource.getRepository(Book);
  }

  async listBooks() {
    return this.db.find();
  }

  async createBook({ title }: InputCreateBook) {
    const newBook = this.db.create({ title });
    return await this.db.save(newBook);
  }

  async findBook(id: string) {
    const book = await this.db.findOneBy({ id });
    if (!book) {
      throw new Error("Ce livre n'existe pas");
    }
    return book;
  }
}
