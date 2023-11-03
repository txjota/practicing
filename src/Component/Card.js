import React, { useState } from 'react';
import CustomModal from './Modal';

const Card = ({ character }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='card-1' onClick={openModal}>
      <img src={character.image} alt={`Imagem de ${character.name}`} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
        <p className="card-text">Status: {character.status}</p>
        <p className="card-text">Espécie: {character.species}</p>
      </div>
      {showModal && <CustomModal show={showModal} handleClose={closeModal} character={character} />}
    </div>
  );
}

export default Card;
