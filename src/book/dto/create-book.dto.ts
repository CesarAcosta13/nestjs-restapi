import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { Category } from './../schemas/book.shema';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsEnum(Category)
  readonly category: Category;
}
