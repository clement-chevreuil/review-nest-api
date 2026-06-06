import { IsInt, Min, Max, IsOptional, IsDateString, IsString, MaxLength } from 'class-validator';

export class CreateRatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsOptional()
  @IsDateString()
  tripDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;
}
