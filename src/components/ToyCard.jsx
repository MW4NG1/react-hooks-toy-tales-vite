import React from "react";

function ToyCard({ toy, handleDeleteToy }) {
  return (
    <div className="card" data-testid="toy-card">
      {/* Toy name */}
      <h2>{toy.name}</h2>
      {/* Toy image */}
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      {/* Toy likes */}
      <p>{toy.likes} Likes </p>
      {/* Buttons will be implemented later */}
      <button className="like-btn">Like {"<3"}</button>
      <button className="del-btn"
      onClick={() => handleDeleteToy(toy.id)}
      >Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
