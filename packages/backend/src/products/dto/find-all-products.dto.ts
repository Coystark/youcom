import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class FindAllProductsQueryDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number;
}
