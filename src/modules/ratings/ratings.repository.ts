import { Injectable } from '@nestjs/common';
import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsRepository {
  private db: Database.Database;

  constructor() {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const dbPath = path.join(dataDir, 'app.db');
    this.db = new Database(dbPath);
    this.initializeDatabase();
  }

  private initializeDatabase() {
    // Check if name column exists, if not, migrate
    const tableInfo = this.db.prepare("PRAGMA table_info(ratings)").all();
    const hasNameColumn = (tableInfo as any[]).some(col => col.name === 'name');

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS ratings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
        name TEXT,
        tripDate TEXT NOT NULL,
        createdAt TEXT NOT NULL
      )
    `);

    // Add name column if it doesn't exist (migration)
    if (!hasNameColumn) {
      try {
        this.db.exec('ALTER TABLE ratings ADD COLUMN name TEXT');
      } catch (e) {
        // Column might already exist, ignore
      }
    }
  }

  create(createRatingDto: CreateRatingDto): Rating {
    const tripDate = createRatingDto.tripDate || new Date().toISOString();
    const createdAt = new Date().toISOString();
    const name = createRatingDto.name || null;

    const stmt = this.db.prepare(`
      INSERT INTO ratings (rating, name, tripDate, createdAt)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(createRatingDto.rating, name, tripDate, createdAt);

    return {
      id: result.lastInsertRowid as number,
      rating: createRatingDto.rating,
      name,
      tripDate,
      createdAt,
    };
  }

  findAll(): Rating[] {
    const stmt = this.db.prepare(`
      SELECT id, rating, name, tripDate, createdAt FROM ratings
      ORDER BY tripDate DESC
    `);

    return stmt.all() as Rating[];
  }

  findOne(id: number): Rating | null {
    const stmt = this.db.prepare(`
      SELECT id, rating, name, tripDate, createdAt FROM ratings
      WHERE id = ?
    `);

    return (stmt.get(id) as Rating) || null;
  }

  update(id: number, updateRatingDto: UpdateRatingDto): Rating | null {
    const existing = this.findOne(id);
    if (!existing) return null;

    const newRating = updateRatingDto.rating ?? existing.rating;

    const stmt = this.db.prepare(`
      UPDATE ratings
      SET rating = ?
      WHERE id = ?
    `);

    stmt.run(newRating, id);

    return {
      ...existing,
      rating: newRating,
    };
  }

  delete(id: number): boolean {
    const stmt = this.db.prepare(`DELETE FROM ratings WHERE id = ?`);
    const result = stmt.run(id);
    return result.changes > 0;
  }

  getStats() {
    const stmt = this.db.prepare(`
      SELECT
        COUNT(*) as total,
        AVG(rating) as average,
        MIN(rating) as minRating,
        MAX(rating) as maxRating
      FROM ratings
    `);

    const row = stmt.get() as {
      total: number;
      average: number;
      minRating: number;
      maxRating: number;
    };

    return {
      total: row.total || 0,
      average: row.average ? parseFloat(row.average.toFixed(2)) : 0,
      minRating: row.minRating || 0,
      maxRating: row.maxRating || 0,
    };
  }
}
