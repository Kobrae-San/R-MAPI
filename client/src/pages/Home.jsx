import { useState, useEffect, useRef } from "react";
import { Button, Input } from "@material-tailwind/react";
import { CardDefault } from "../components/CardDefault";
import searchlook from "../assets/searchlook.svg";
import { SimplePagination } from "../components/SimplePagination";
import { setTotalPages, prevPage, nextPage } from "../redux/paginationSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const activePage = useSelector((state) => state.pagination.activePage);
  const totalPages = useSelector((state) => state.pagination.totalPages);

  const inputRef = useRef(null);

  const [filter, setFilter] = useState("");

  const [characterList, setCharacterList] = useState([]);

  // const [pages, setPages] = useState(1);

  // const [nbTotalPages, setNbTotalPages] = useState(1);

  function changeFilterToAlive() {
    setFilter("Alive");
  }

  function changeFilterToDead() {
    setFilter("Dead");
  }

  function resetFilter() {
    setFilter("");
  }

  function testFn(event) {
    console.log("Za WARUDO");
  }

  async function loadCharacterList(name, page, status) {
    let response;
    if (name && status && page) {
      response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${name}&status=${status}&page=${page}`
      );
    } else if (name && page) {
      response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`
      );
    } else if (page && status) {
      response = await fetch(
        `https://rickandmortyapi.com/api/character/?status=${status}&page=${page}`
      );
    } else if (page) {
      response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );
    }

    const characters = await response.json();
    if (characters.info) {
      dispatch(setTotalPages(characters.info.pages));
    }
    setCharacterList(characters.results);
  }

  function inputOnKeyDown(event) {
    if (event.key == "Enter" && event.target.value) {
      const searchValue = event.target.value.trim();
      loadCharacterList(searchValue, activePage, filter);
    }
  }

  function onSearchClick() {
    if (inputRef.current.value) {
      const searchValue = inputRef.current.value;
      loadCharacterList(searchValue, activePage, filter);
    }
  }

  useEffect(() => {
    loadCharacterList(inputRef.current.value, activePage, filter);
  }, [filter, dispatch, activePage, totalPages]);

  return (
    <div className="flex flex-col mb-12 gap-12 min-w-[360px]">
      <div className="flex flex-col-reverse m-12 gap-12 lg:flex-row lg:justify-between mb-24">
        <div className="flex gap-4 self-center">
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

        <div className="min-w-60 self-center sm:min-w-96">
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
                onClick={() => onSearchClick()}
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
                status={character.status}
                btnText={
                  <Link to={`/character/${character.id}`}>See More</Link>
                }
              />
            );
          })
        ) : (
          <h1>No character found</h1>
        )}
      </div>

      <div className="flex justify-center">
        {characterList ? <SimplePagination /> : " "}
      </div>
    </div>
  );
}

export default Home;
