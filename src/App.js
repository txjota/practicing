import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Component/Modal";
import Table from "react-bootstrap/Table";
import { BiArrowBack } from 'react-icons/bi';
import SearchBar from "./SearchBar"; // Renomeado de Header para SearchBar

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const [originDetails, setOriginDetails] = useState(null);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => {
        setCharacters(response.data.results);
        setFilteredCharacters(response.data.results);
      })
      .catch((error) => {
        console.error("Erro na chamada à API", error);
      });
  }, []);

  const openCharacterModal = (character) => {
    setSelectedCharacter(character);

    axios
      .get(character.location.url)
      .then((response) => {
        setLocationDetails(response.data);
      })
      .catch((error) => {
        console.error("Erro na chamada à API de localização", error);
      });

    axios
      .get(character.origin.url)
      .then((response) => {
        setOriginDetails(response.data);
      })
      .catch((error) => {
        console.error("Erro na chamada à API de origem", error);
      });
  };

  const closeCharacterModal = () => {
    setSelectedCharacter(null);
    setLocationDetails(null);
    setOriginDetails(null);
  };

  const filterCharacters = (searchTerm) => {
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(filtered);
  };

  return (
    <div className="card-1">
      <div className="App">
        <SearchBar onSearch={filterCharacters} /> {/* Renomeado de Header para SearchBar */}
      </div>
      <div className="card-list">
        {filteredCharacters.map((character) => (
          <div
            className="card-1"
            key={character.id}
            onClick={() => openCharacterModal(character)}
          >
            <img
              src={character.image}
              alt={`Imagem de ${character.name}`}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{character.name}</h5>
            </div>
          </div>
        ))}
      </div>
      {selectedCharacter && (
        <div className="modal-card">
          <Modal isOpen={true} setModalOpen={closeCharacterModal}>
            <button className="close-button" onClick={closeCharacterModal}>
              <BiArrowBack className="icon-back" /> {BiArrowBack}
            </button>
            <img
              src={selectedCharacter.image}
              alt={`Imagem de ${selectedCharacter.name}`}
              className="modal-image"
            />
            <Table responsive>
              <thead></thead>
              <tbody>
                <tr></tr>
                <tr>
                  <th>NAME</th>
                  <td>{selectedCharacter.name}</td>
                </tr>
                <tr>
                  <th>SPECIES</th>
                  <td>{selectedCharacter.species}</td>
                </tr>
                <tr>
                  <th>LOCATION</th>
                  <td>{locationDetails ? locationDetails.name : ""}</td>
                </tr>
                <tr>
                  <th>ORIGIN</th>
                  <td>{originDetails ? originDetails.name : ""}</td>
                </tr>
              </tbody>
            </Table>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default App;
