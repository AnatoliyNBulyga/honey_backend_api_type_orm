import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  content: string;
}
export class UpdateIdPostDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform((params) => Number(params.value))
  id: number;
}
