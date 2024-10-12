import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

interface RowProps {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
}

interface Movie {
  id: number;
  name?: string;
  title?: string;
  original_name?: string;
  poster_path?: string;
  backdrop_path?: string;
}

const base_url = "https://image.tmdb.org/t/p/original/";

const RowContainer = styled.div`
  margin-left: 20px;
  color: white;
`;

const RowTitle = styled.h2`
  #light & {
    color: black;
  }
`;

const RowPosters = styled.div`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RowImage = styled.img<{ $islarge: boolean }>`
  object-fit: contain;
  width: 100%;
  max-height: ${(props) => (props.$islarge ? "250px" : "100px")};
  transition: transform 450ms;
  margin-right: 10px;
  &:hover {
    transform: ${(props) => (props.$islarge ? "scale(1.09)" : "scale(1.08)")};
  }
`;

const Row: React.FC<RowProps> = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  console.log(movies);

  return (
    <RowContainer>
      <RowTitle>{title}</RowTitle>
      <RowPosters>
        {movies.map((movie) => (
          <RowImage
            key={movie.id}
            $islarge={isLargeRow}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name || movie.title || movie.original_name}
          />
        ))}
      </RowPosters>
    </RowContainer>
  );
};

export default Row;
