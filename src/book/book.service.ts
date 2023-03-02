import { ObjectId } from 'mongodb';
import { Book } from './schemas/book.shema';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/auth.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('resource not found');
    }
    return book;
  }

  async create(book: Book, user: User): Promise<Book> {
    const bookData = { ...book, user: user._id };
    const newBook = await this.bookModel.create(bookData);
    return newBook;
  }

  async updateById(id: string, book: Book): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Enter correct id');
    }
    const _id = new ObjectId(id);
    const bookUpdated = await this.bookModel.findByIdAndUpdate(_id, book, {
      new: true,
      runValidators: true,
    });

    if (!bookUpdated) {
      throw new NotFoundException('Book not found');
    }
    //successfully updated
    return bookUpdated;
  }

  async deleteById(id: string): Promise<Book> {
    const book = await this.bookModel.findByIdAndDelete(id);
    return book;
  }
}
