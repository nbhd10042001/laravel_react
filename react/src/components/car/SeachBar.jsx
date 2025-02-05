import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios";
import { Button, ListGroup, Spinner, TextInput } from "flowbite-react";

export default function SearchBar({
  userId = "",
  onButtonSearchClick = () => {},
  haveBtnSearch = true,
}) {
  const { navigateR } = useStateContext();
  const [hiddenBoxSearch, setHiddenBoxSearch] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(true);
  const [carDebounce, setCarDebounce] = useState([]);
  const [stringSearch, setStringSearch] = useState("");
  const timer = useRef(null);

  // debounce search car
  const apiDebounce = (string) => {
    setLoadingSearch(true);
    const payload = {
      string: string,
      user_id: userId,
    };
    axiosClient
      .get(`/search-cars`, { params: payload, withCredentials: true })
      .then(({ data }) => {
        setLoadingSearch(false);
        setCarDebounce(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDebounceSearchCar = (string) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => apiDebounce(string), 300);
  };

  const buttonSearchClick = () => {
    onButtonSearchClick(stringSearch);
  };

  useEffect(() => {
    const inputElem = document.getElementById(`input-search-car`);
    const listElem = document.getElementById(`list-group-search-car`);
    document.addEventListener("click", (e) => {
      if (e.target !== inputElem && e.target !== listElem) {
        setHiddenBoxSearch(true);
      }
    });
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <div className="relative w-[75%]">
          <TextInput
            id="input-search-car"
            type="search"
            placeholder="Search"
            onClick={(ev) => {
              if (stringSearch) {
                setHiddenBoxSearch(false);
              }
            }}
            onChange={(ev) => {
              var string = ev.target.value;
              setStringSearch(string);
              setLoadingSearch(true);
              if (string != "") {
                handleDebounceSearchCar(string);
                setHiddenBoxSearch(false);
              } else {
                setHiddenBoxSearch(true);
              }
            }}
          ></TextInput>
          <div
            className={
              `absolute top-[50px] z-10 ` + (hiddenBoxSearch ? "hidden" : "")
            }
          >
            <ListGroup
              id="list-group-search-car"
              className=" overflow-y-auto sm:w-[24rem] max-h-[12rem]"
            >
              {!loadingSearch &&
                carDebounce.length > 0 &&
                carDebounce.map((car, index) => {
                  return (
                    <ListGroup.Item
                      key={`debounce_car_${index}`}
                      onClick={() => {
                        navigateR(`/car/${car.id}/show`);
                      }}
                    >
                      {car.slug}
                    </ListGroup.Item>
                  );
                })}
              {!loadingSearch && carDebounce.length === 0 && (
                <div className="size-auto px-4 py-2">Not found cars</div>
              )}
              {loadingSearch && (
                <div className="size-auto px-4 py-2">
                  <Spinner color="warning"></Spinner>
                  <span className="mx-2">waiting...</span>
                </div>
              )}
            </ListGroup>
          </div>
        </div>
        {haveBtnSearch && (
          <Button color="gray" outline onClick={(ev) => buttonSearchClick()}>
            Search
          </Button>
        )}
      </div>
    </div>
  );
}
