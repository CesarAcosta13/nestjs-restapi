import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.shema';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book> {
    const book = this.bookService.findById(id);
    return book;
  }

  @Post()
  @UseGuards(AuthGuard())
  async createBook(
    @Body()
    book: CreateBookDto,
    @Req() req,
  ): Promise<Book> {
    return this.bookService.create(book, req.user);
  }

  @Put(':id')
  async updateBook(
    @Param() id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(id, book);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    const book = this.bookService.deleteById(id);
    return book;
  }
}
