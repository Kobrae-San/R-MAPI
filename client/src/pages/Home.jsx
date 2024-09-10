import { useState, useEffect, useRef } from "react";
import { Button, Input } from "@material-tailwind/react";
import { CardDefault } from "../components/CardDefault";
import searchlook from "../assets/searchlook.svg";

function Home() {
  const inputRef = useRef(null);

  const [filter, setFilter] = useState("");

  const [characterList, setCharacterList] = useState([]);

  function changeFilterToAlive() {
    setFilter("Alive");
  }

  function changeFilterToDead() {
    setFilter("Dead");
  }

  function resetFilter() {
    setFilter("");
  }

  //   function testFn(event) {
  //     console.log(inputRef.current.value);
  //   }

  async function loadCharacterList() {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const characters = await response.json();
    setCharacterList(characters.results);
  }

  async function loadCharacterListByName(name) {
    const value = name.trim();
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?name=${value}`
    );
    const characters = await response.json();
    setCharacterList(characters.results);
  }

  async function loadCharacterListByPage(page) {
    const value = page;
    const response = await fetch(
      `https://rickandmortyapi.com/api/?page=${page}`
    );
    const characters = await response.json();
    setCharacterList(characters.results);
  }

  function inputOnKeyDown(event) {
    if (event.key == "Enter" && event.target.value) {
      const searchValue = event.target.value.trim();
      loadCharacterListByName(searchValue);
    }
  }

  function onSearchClick(event) {
    if (inputRef.current.value) {
      const searchValue = inputRef.current.value;
      loadCharacterListByName(searchValue);
    }
  }

  useEffect(() => {
    loadCharacterList();
  }, []);

  return (
    <div>
      <div className="flex m-12 justify-between mb-24">
        <div className="flex gap-4">
          <Button
            variant={filter != "Alive" ? "outlined" : "filled"}
            size="sm"
            onClick={filter != "Alive" ? changeFilterToAlive : resetFilter}
          >
            Alive
          </Button>
          <Button
            variant={filter != "Dead" ? "outlined" : "filled"}
            size="sm"
            onClick={filter != "Dead" ? changeFilterToDead : resetFilter}
          >
            Dead
          </Button>
        </div>

        <div>
          <Input
            label="Search"
            variant="standard"
            onKeyDown={(event) => inputOnKeyDown(event)}
            inputRef={inputRef}
            icon={
              <img
                src={searchlook}
                alt="Loupe"
                className="m-0 p-0 cursor-pointer"
                onClick={(event) => onSearchClick(event)}
              />
            }
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-8 row-3 justify-center">
        {characterList ? (
          characterList.map((character, index) => {
            return (
              <CardDefault
                key={character.name + index}
                imgSrc={character.image}
                characterName={character.name}
                gender={character.gender}
                species={character.species}
                origin={character.origin.name}
                location={character.location.name}
                btnText={"See More"}
              />
            );
          })
        ) : (
          <h1>No character found</h1>
        )}
      </div>
    </div>
  );
}

export default Home;
