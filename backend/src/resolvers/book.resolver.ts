import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import BookService from "../services/book.service";
import Book, { InputCreateBook } from "../entities/book.entity";

@Resolver()
export default class BookResolver {
  @Query(() => [Book])
  async books() {
    return await new BookService().listBooks();
  }

  @Authorized()
  @Mutation(() => Book)
  async createBook(@Arg("infos") infos: InputCreateBook) {
    //? sans Authorized :
    // if (!ctx.user) {
    //   throw new Error(
    //     "Vous devez être authentifié pour accéder à la liste des livres!"
    //   );
    // }
    const newBook = await new BookService().createBook(infos);
    return newBook;
  }

  @Query(() => Book)
  async findBook(@Arg("id") id: string) {
    return await new BookService().findBook(id);
  }

  @Query(() => Int)
  test() {
    return 123;
  }
}
