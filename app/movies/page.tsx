'use client';
import React, { useEffect, useState } from 'react';
import BackgroundWrapper from "@/components/backgroundWrapper";
import { Button } from "@/components/button";
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';
import EditMovie from './components/EditMovie';
import { useRouter } from 'next/navigation';
import { Movie } from '../types';

export default function Movies() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      router.push('/signin');
    } else {
      fetchMovies();
    }
  }, [router]);
  
  const fetchMovies = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch('/api/movies', {
        headers: {
          'X-User-Id': userId || '',
        },
      });
      if (response.ok) {
        const movies: Movie[] = await response.json();
        setMovieList(movies);
      } else {
        console.error('Failed to fetch movies');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
  
  const handleAddMovie = async (movie: Omit<Movie, 'id' | 'createdBy'>) => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId || '',
        },
        body: JSON.stringify(movie),
      });
  
      if (response.ok) {
        const newMovie: Movie = await response.json();
        setMovieList([...movieList, newMovie]);
        setIsAdding(false);
      } else {
        console.error('Failed to add movie');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };
  
  const handleEditMovie = async (updatedMovie: Movie) => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`/api/movies/${updatedMovie.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId || '',
        },
        body: JSON.stringify(updatedMovie),
      });
  
      if (response.ok) {
        const editedMovie: Movie = await response.json();
        setMovieList(
          movieList.map((movie) =>
            movie.id === editedMovie.id ? editedMovie : movie
          )
        );
        setIsEditing(false);
        setCurrentMovie(null);
      } else {
        console.error('Failed to edit movie');
      }
    } catch (error) {
      console.error('Error editing movie:', error);
    }
  };
  
  const handleEditClick = (movie: Movie) => {
    setIsEditing(true);
    setCurrentMovie(movie);
  };

  return (
    <BackgroundWrapper>
      <div className="flex flex-col w-full min-h-screen p-4">
        {isAdding ? (
          <AddMovie onSubmit={handleAddMovie} onCancel={() => setIsAdding(false)} />
        ) : isEditing ? (
          <EditMovie movie={currentMovie!} onEdit={handleEditMovie} onCancel={() => setIsEditing(false)} />
        ) : (
          <div className="text-center">
            <MovieList movies={movieList} setIsAdding={setIsAdding} onEdit={handleEditClick} />
          </div>
        )}
      </div>
    </BackgroundWrapper>
  );
}
