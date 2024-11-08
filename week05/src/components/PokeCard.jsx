import React from "react";
import water from "../../src/assets/water.png";
import electric from "../../src/assets/electric.png";
import fighting from "../../src/assets/fighting.png";
import fire from "../../src/assets/fire.png";
import grass from "../../src/assets/grass.png";
import normal from "../../src/assets/normal.png";
import psychic from "../../src/assets/psychic.png";

const PokeCard = ({
  type,
  name,
  image,
  hp,
  weakness,
  resistance,
  retreatCost,
}) => {
  let backgroundImage;
  switch (type) {
    case "water":
      backgroundImage = water;
      break;
    case "electric":
      backgroundImage = electric;
      break;
    case "fighting":
      backgroundImage = fighting;
      break;
    case "fire":
      backgroundImage = fire;
      break;
    case "grass":
      backgroundImage = grass;
      break;
    case "normal":
      backgroundImage = normal;
      break;
    case "psychic":
      backgroundImage = psychic;
      break;
    default:
      backgroundImage = normal;
  }
  return (
    <div
      className="relative w-[16rem] h-[25rem]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <span className="absolute top-5 left-5 text-[0.75rem] text-black press-start-2p-regular">
        {name}
      </span>
      <img
        className="absolute top-11 left-7 w-[14rem] h-[10rem] object-contain"
        src={image}
      />
      <span className="absolute top-4 right-10 press-start-2p-regular text-[0.75rem]">
        {hp}
      </span>
      <span className="absolute left-6 bottom-[6.2rem] press-start-2p-regular text-[0.75rem]">
        {resistance}
      </span>
      <span className="absolute left-[7rem] bottom-[6.2rem] press-start-2p-regular text-[0.75rem]">
        {weakness}
      </span>
      <span className="absolute left-[13rem] bottom-[6.2rem] press-start-2p-regular text-[0.75rem]">
        {retreatCost}
      </span>
    </div>
  );
};

export default PokeCard;
