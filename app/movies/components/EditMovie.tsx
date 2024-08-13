import { Movie } from '@/app/types';
import BackgroundWrapper from '@/components/backgroundWrapper';
import { Button } from '@/components/button';
import { Input } from '@/components/InputText';
import { useState, ChangeEvent, FormEvent, DragEvent } from 'react';

interface EditMovieProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onCancel: () => void;
}

const EditMovie: React.FC<EditMovieProps> = ({ movie, onEdit, onCancel }) => {
  const [title, setTitle] = useState<string>(movie.title);
  const [year, setYear] = useState<string>(movie.year.toString());
  const [image, setImage] = useState<string | null>(movie.image);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImageDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onEdit({ ...movie, title, year: parseInt(year), image: image || '' });
  };

  return (
    <div className='p-4 md:mx-16 md:mt-12'>
      <p className="text-font-primary text-3xl md:text-4xl font-semibold mb-8 md:mb-16">Edit movie</p>
      <form onSubmit={handleSubmit} className='flex flex-col md:flex-row md:items-start gap-[7rem] max-[800px]:gap-[2rem]'>
        <div className='hidden flex-col gap-6 max-[568px]:flex'>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Publishing year"
            value={year}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setYear(e.target.value)}
            className="mb-4 p-3 w-full md:w-[60%] bg-[#224957] text-white rounded-md"
          />
        </div>
        <div
          className="w-[30%] max-[800px]:w-[50%] max-[568px]:w-full h-48 md:h-[25rem] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer mb-4 rounded-md"
          onClick={() => document.getElementById('imageUpload')?.click()}
          onDrop={handleImageDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {image ? (
            <img src={image} alt="Uploaded" className="max-w-full max-h-full object-contain" />
          ) : (
            <div className="text-center text-gray-300">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p>Upload an image here</p>
            </div>
          )}
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <div className='flex flex-col gap-6 w-full md:w-auto'>
          <div className='flex flex-col gap-6 max-[568px]:hidden'>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
            <input
              type="number"
              placeholder="Publishing year"
              value={year}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setYear(e.target.value)}
              className="mb-4 p-3 w-full md:w-[60%] bg-[#224957] text-white rounded-md px-6 py-3 white-placeholder"
            />
          </div>
          <div className='flex gap-3 w-full md:max-w-[25vw]'>
            <button
              type="button"
              onClick={onCancel}
              className="bg-transparent text-font-primary w-full md:w-64 px-4 md:px-10 py-3 md:py-4 border-2 border-white rounded-lg"
            >
              Cancel
            </button>
            <Button text="Submit" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
