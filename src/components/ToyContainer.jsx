import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, handleDeleteToy, handleLikeToy }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          handleDeleteToy={handleDeleteToy}
          handleLikeToy={handleLikeToy}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
