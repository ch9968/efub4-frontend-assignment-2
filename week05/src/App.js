import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../src/api/api";
import PokeCard from "./components/PokeCard";
import pokeBackground from "../src/assets/pokemonBackground.jpg";

export const DATA_LIMIT = 6;
const getAllPokemon = async ({ pageParam = 0 }) => {
  try {
    const response = await api.get(
      `pokemon?limit=${DATA_LIMIT}&offset=${pageParam * DATA_LIMIT}`
    );

    const pokemons = response.data.results;
    const pokemonDetails = await getPokemonDetail(pokemons);

    return {
      results: pokemonDetails,
      total: response.data.count,
      nextPage: pageParam + 1,
    };
  } catch (error) {
    console.error(error);
  }
};

const getPokemonDetail = async (pokemonList) => {
  return await Promise.all(
    pokemonList.map(async (pokemon) => {
      const detailResponse = await axios.get(pokemon.url);
      console.log(detailResponse.data);
      return {
        name: detailResponse.data.name,
        image: detailResponse.data.sprites.front_default,
        type: detailResponse.data.types[0].type.name,
        hp: detailResponse.data.stats[0].base_stat,
        weakness: detailResponse.data.stats[1].base_stat,
        resistance: detailResponse.data.stats[2].base_stat,
        retreatCost: detailResponse.data.stats[3].base_stat,
      };
    })
  );
};

function App() {
  const [target, setTarget] = useState(null);
  const [allLoaded, setAllLoaded] = useState(false);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: getAllPokemon,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage * DATA_LIMIT < lastPage.total
        ? lastPage.nextPage
        : undefined;
    },
  });

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.5,
        delay: 500,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  });

  useEffect(() => {
    if (!isFetching && !hasNextPage) {
      setAllLoaded(true);
    }
  }, [isFetching, hasNextPage]);

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && hasNextPage) {
      observer.unobserve(entry.target);
      await fetchNextPage();
      observer.observe(entry.target);
    }
  };

  if (isFetching && !isFetchingNextPage) {
    return <div>fetching</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div
      className="bg-yellow-50 flex flex-col items-center"
      style={{
        backgroundImage: `url(${pokeBackground})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div className="press-start-2p-regular text-[3rem] mt-8 mb-8">
        pokeMon cards
      </div>
      {data.pages.map((page, pageIndex) => (
        <div key={pageIndex} className="grid grid-cols-3 gap-10">
          {page.results.map((pokemon, index) => (
            <PokeCard
              key={index}
              name={pokemon.name}
              image={pokemon.image}
              type={pokemon.type}
              hp={pokemon.hp}
              weakness={pokemon.weakness}
              resistance={pokemon.resistance}
              retreatCost={pokemon.retreatCost}
            />
          ))}
        </div>
      ))}
      {allLoaded ? (
        <div className="text-white press-start-2p-regular">
          No pokemon anymore...
        </div>
      ) : (
        <div
          ref={setTarget}
          className="bg-transparent text-white press-start-2p-regular"
        >
          Loading...
        </div>
      )}
    </div>
  );
}

export default App;
