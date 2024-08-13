import { Movie } from "@/app/types";

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onEdit }) => (
<div className="bg-[#092C39] p-2 rounded-lg cursor-pointer hover:bg-[#0829358C]" onClick={() => onEdit(movie)}>
      <img src={movie.image} alt={movie.title} className="rounded-lg h-[18rem] w-[15rem] min-[1400px]:w-[17rem] max-[568px]:w-[9rem] max-[568px]:h-[12rem]"/>
      <div className="text-left mx-1 my-2">
        <p className="mt-3 truncate max-w-[15rem]">{movie.title}</p>
        <p className="font-light text-xs mt-2">{movie.year}</p>
      </div>
    </div>
);
