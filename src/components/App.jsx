import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  // Stores all toys from the backend
  const [toys, setToys] = useState([]);
  // Controls visibility of the form
  const [showForm, setShowForm] = useState(false);
  // Fetch all toys when the component loads
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);
  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // Add a new toy to the database and state
  function addToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newToy,
        likes: 0,
      }),
    })
      .then((response) => response.json())
      .then((createdToy) => {
        setToys([...toys, createdToy]);
      });
  }

  // Delete a toy from the database and state
function handleDeleteToy(id) {
  fetch(`http://localhost:3001/toys/${id}`, {
    method: "DELETE",
  }).then(() => {
    const updatedToys = toys.filter((toy) => toy.id !== id);
    setToys(updatedToys);
  });
}

// Increase a toy's likes
function handleLikeToy(id, currentLikes) {
  fetch(`http://localhost:3001/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: currentLikes + 1,
    }),
  })
    .then((response) => response.json())
    .then((updatedToy) => {
      const updatedToys = toys.map((toy) =>
        toy.id === updatedToy.id ? updatedToy : toy
      );
      setToys(updatedToys);
    });
}

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      {/* Pass toys to ToyContainer */}
      <ToyContainer toys={toys}
      handleDeleteToy={handleDeleteToy}
      handleLikeToy={handleLikeToy}
      />
    </>
  );
}

export default App;
