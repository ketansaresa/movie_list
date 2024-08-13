import { Button } from "@/components/button";
import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { Pagination } from "./Pagination";
import { redirect, useRouter } from "next/navigation";

const MovieList = ({ movies, onEdit, setIsAdding }:any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const router = useRouter();

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (movies.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[90vh]">
        <p className="text-font-primary text-3xl font-semibold mb-8">Your movie list is empty</p>
        <Button text={"Add a new movie"} onClick={() => setIsAdding(true)} />
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/signin');
    localStorage.clear();
  };

  return (
    <div>
      <div className="movies-container">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="text-font-primary text-3xl max-[568px]:text-xl font-semibold">My movies</p>
            <img className="w-6 h-6 cursor-pointer" src="addbtn.svg" onClick={() => setIsAdding(true)}/>
          </div>
          <div className="flex items-center gap-2" onClick={() => handleLogout()}>
            <button className="text-font-primary cursor-pointer text-sm" >Logout</button>
            <img className="w-5 h-5 cursor-pointer" src="logout.svg"/>
          </div>
        </div>
        <div className="movie-grid">
          {currentMovies.map((movie:any, index:number) => (
            <MovieCard key={index} movie={movie} onEdit={onEdit} />
          ))}
        </div>
        <Pagination
          moviesPerPage={moviesPerPage}
          totalMovies={movies.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default MovieList;
