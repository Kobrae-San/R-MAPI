import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Character() {
  const { id } = useParams();

  const [character, setCharacter] = useState(null);

  async function loadCharacterById(id) {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );

    const characterData = await response.json();
    setCharacter(characterData);
  }

  useEffect(() => {
    loadCharacterById(id);
  }, [id]);

  return (
    <div className="flex flex-col gap-12 m-12">
      <Link to={"/"}>
        <p>Back</p>
      </Link>
      {character ? (
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-12">
            <img
              src={character.image}
              alt={character.name}
              width={"50%"}
              className="flex "
            />

            <h1>{character.name}</h1>

            <p>
              {character.name} is an {character.species}{" "}
              {character.gender != "unknown" ? character.gender : ""}{" "}
              {character.origin.name != "unknown"
                ? "from " + character.origin.name
                : ""}{" "}
              {character.location.name != "unknown"
                ? "currently located at " + character.location.name
                : ""}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Character;
