import { Book } from './schemas/book.shema';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import mongoose from 'mongoose';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book> {
    const book = this.bookService.findById(id);
    return book;
  }

  @Post()
  async createBook(
    @Body()
    book: CreateBookDto,
  ): Promise<Book> {
    return this.bookService.create(book);
  }

  @Put(':id([0-9a-fA-F]{24})')
  async updateBook(
    @Param() id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    const formatedId = mongoose.isValidObjectId(id);
    if (!formatedId) {
      throw new NotFoundException('Book not found');
    }
    return this.bookService.updateById(id, book);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    const book = this.bookService.deleteById(id);
    return book;
  }
}
