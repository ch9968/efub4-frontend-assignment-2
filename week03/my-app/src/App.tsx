import React, { useState, createContext, ReactNode } from "react";
import "./App.css";
import requests from "./requests";
import Row from "./Row";
import Banner from "./Banner";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

interface RowItem {
  title: string;
  fetchUrl: keyof typeof requests;
  isLargeRow?: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

const rowList: RowItem[] = [
  {
    title: "NETFLIX ORIGINALS",
    fetchUrl: "fetchNetflixOriginals",
    isLargeRow: true,
  },
  { title: "Trending now", fetchUrl: "fetchTrending" },
  { title: "Top Rated", fetchUrl: "fetchTopRated" },
  { title: "Action Movies", fetchUrl: "fetchActionMovies" },
  { title: "Comedy Movies", fetchUrl: "fetchComedyMovies" },
  { title: "Romance Movies", fetchUrl: "fetchRomanceMovies" },
  { title: "Documentary Movies", fetchUrl: "fetchDocumentMovies" },
  { title: "Horror Movies", fetchUrl: "fetchHorrorMovies" },
];

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>("dark");

  const toggleTheme = () => {
    setTheme((cur) => (cur === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app" id={theme}>
        <Banner />
        {rowList.map((item) => (
          <Row
            key={item.title}
            title={item.title}
            fetchUrl={requests[item.fetchUrl]}
            isLargeRow={!!item.isLargeRow}
          />
        ))}
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
