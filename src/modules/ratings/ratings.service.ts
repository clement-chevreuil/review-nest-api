import { Injectable } from '@nestjs/common';
import { RatingsRepository } from './ratings.repository';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(private readonly repository: RatingsRepository) {}

  create(createRatingDto: CreateRatingDto): Promise<Rating> {
    return this.repository.create(createRatingDto);
  }

  findAll(): Promise<Rating[]> {
    return this.repository.findAll();
  }

  findOne(id: number): Promise<Rating | null> {
    return this.repository.findOne(id);
  }

  update(id: number, updateRatingDto: UpdateRatingDto): Promise<Rating | null> {
    return this.repository.update(id, updateRatingDto);
  }

  delete(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }

  getStats() {
    return this.repository.getStats();
  }
}
