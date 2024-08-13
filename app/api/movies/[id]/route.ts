import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Movie } from '@/app/types';

const moviesFile = path.join(process.cwd(), 'data', 'movies.json');

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const userId = request.headers.get('X-User-Id');
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    try {
      const data = await fs.readFile(moviesFile, 'utf8');
      const movies: Movie[] = JSON.parse(data);
      const movie = movies.find(m => m.id === id && m.createdBy === userId);
      
      if (movie) {
        return NextResponse.json(movie);
      } else {
        return NextResponse.json({ message: 'Movie not found' }, { status: 404 });
      }
    } catch (error) {
      return NextResponse.json({ message: 'Error reading movies file' }, { status: 500 });
    }
  }
  
  export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const userId = request.headers.get('X-User-Id');
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    try {
      const { title, year, image } = await request.json() as Omit<Movie, 'id' | 'createdBy'>;
      const data = await fs.readFile(moviesFile, 'utf8');
      let movies: Movie[] = JSON.parse(data);
      
      const index = movies.findIndex(m => m.id === id && m.createdBy === userId);
      if (index !== -1) {
        movies[index] = { ...movies[index], title, year, image };
        await fs.writeFile(moviesFile, JSON.stringify(movies, null, 2));
        return NextResponse.json(movies[index]);
      } else {
        return NextResponse.json({ message: 'Movie not found' }, { status: 404 });
      }
    } catch (error) {
      return NextResponse.json({ message: 'Error updating movie' }, { status: 500 });
    }
  }
  
  