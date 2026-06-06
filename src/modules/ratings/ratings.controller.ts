import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Render,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller()
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  // Page d'accueil / Dashboard
  @Get()
  @Render('dashboard')
  getDashboard() {
    const ratings = this.ratingsService.findAll();
    const stats = this.ratingsService.getStats();

    return {
      ratings,
      stats,
    };
  }

  // Page de création
  @Get('create')
  @Render('create')
  getCreatePage() {
    return {};
  }

  // API: Créer une notation
  @Post('api/ratings')
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.create(createRatingDto);
  }

  // API: Récupérer toutes les notations
  @Get('api/ratings')
  findAll() {
    return this.ratingsService.findAll();
  }

  // API: Récupérer une notation
  @Get('api/ratings/:id')
  findOne(@Param('id') id: string) {
    return this.ratingsService.findOne(+id);
  }

  // API: Mettre à jour une notation
  @Patch('api/ratings/:id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.update(+id, updateRatingDto);
  }

  // API: Supprimer une notation
  @Delete('api/ratings/:id')
  delete(@Param('id') id: string) {
    const success = this.ratingsService.delete(+id);
    return { success };
  }

  // API: Obtenir les statistiques
  @Get('api/stats')
  getStats() {
    return this.ratingsService.getStats();
  }
}
