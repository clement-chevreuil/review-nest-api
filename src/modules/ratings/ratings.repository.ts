import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsRepository {
  constructor(
    @InjectRepository(Rating)
    private readonly repository: Repository<Rating>,
  ) {}

  create(createRatingDto: CreateRatingDto): Promise<Rating> {
    const tripDate = createRatingDto.tripDate || new Date().toISOString();
    const createdAt = new Date().toISOString();
    const name = createRatingDto.name || null;

    const rating = this.repository.create({
      rating: createRatingDto.rating,
      name,
      tripDate,
      createdAt,
    });

    return this.repository.save(rating);
  }

  findAll(): Promise<Rating[]> {
    return this.repository.find({
      order: { tripDate: 'DESC' },
    });
  }

  findOne(id: number): Promise<Rating | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateRatingDto: UpdateRatingDto): Promise<Rating | null> {
    const existing = await this.findOne(id);
    if (!existing) return null;

    const newRating = updateRatingDto.rating ?? existing.rating;
    await this.repository.update(id, { rating: newRating });

    return this.repository.findOne({
      where: { id },
    });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected || 0) > 0;
  }

  async getStats() {
    const result = await this.repository
      .createQueryBuilder('rating')
      .select('COUNT(*)', 'total')
      .addSelect('AVG(rating.rating)', 'average')
      .addSelect('MIN(rating.rating)', 'minRating')
      .addSelect('MAX(rating.rating)', 'maxRating')
      .getRawOne();

    return {
      total: result?.total ? parseInt(result.total, 10) : 0,
      average: result?.average ? parseFloat(parseFloat(result.average).toFixed(2)) : 0,
      minRating: result?.minRating ? parseInt(result.minRating, 10) : 0,
      maxRating: result?.maxRating ? parseInt(result.maxRating, 10) : 0,
    };
  }
}
