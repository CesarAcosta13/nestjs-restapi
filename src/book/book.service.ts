import { ObjectId } from 'mongodb';
import { Book } from './schemas/book.shema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

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

  async create(book: Book): Promise<Book> {
    const newBook = await this.bookModel.create(book);
    return newBook;
  }

  async updateById(id: string, book: Book): Promise<Book> {
    try {
      const _id = new ObjectId(id);
      const bookUpdated = await this.bookModel.findByIdAndUpdate(_id, book, {
        new: true,
        runValidators: true,
      });
      return bookUpdated;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id: string): Promise<Book> {
    const book = await this.bookModel.findByIdAndDelete(id);
    return book;
  }
}
