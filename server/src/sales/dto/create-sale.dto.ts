import { IsString, IsNumber, IsEmail, IsOptional, Min } from 'class-validator';

export class CreateSaleDto {
  @IsString()
  productName: string;

  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsString()
  category: string;

  @IsEmail()
  @IsOptional()
  customerEmail?: string;
}
