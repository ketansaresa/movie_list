import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Movie } from '@/app/types';

const moviesFile = path.join(process.cwd(), 'data', 'movies.json');
  
  export async function GET(request: NextRequest) {
    try {
      const userId = request.headers.get('X-User-Id');
      if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
  
      const data = await fs.readFile(moviesFile, 'utf8');
      const movies: Movie[] = JSON.parse(data);
      const userMovies = movies.filter(movie => movie.createdBy === userId);
      return NextResponse.json(userMovies);
    } catch (error) {
      return NextResponse.json({ message: 'Error reading movies file' }, { status: 500 });
    }
  }
  
  export async function POST(request: NextRequest) {
    try {
      const userId = request.headers.get('X-User-Id');
      if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
  
      const { title, year, image } = await request.json() as Omit<Movie, 'id' | 'createdBy'>;
      const data = await fs.readFile(moviesFile, 'utf8');
      const movies: Movie[] = JSON.parse(data);
      
      const newMovie: Movie = { id: crypto.randomUUID(), title, year, image, createdBy: userId };
      movies.push(newMovie);
      
      await fs.writeFile(moviesFile, JSON.stringify(movies, null, 2));
      return NextResponse.json(newMovie, { status: 201 });
    } catch (error) {
      return NextResponse.json({ message: 'Error adding movie' }, { status: 500 });
    }
  }
  
  