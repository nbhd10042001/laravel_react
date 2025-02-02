import React, { useEffect, useState } from "react";
import CarLists from "../../components/car/CarLists";
import axiosClient from "../../axios";
import PaginationLinks from "../../components/PaginationLinks";
import { useStateContext } from "../../contexts/ContextProvider";
import CategoryFilter from "../../components/car/CategoryFilter";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [meta, setMeta] = useState({});
  const [links, setLinks] = useState({});
  const [loading, setLoading] = useState(false);
  const { navigateR } = useStateContext();

  const onPageClick = (url) => {
    getCars(url);
  };

  const onFilterCarsHandle = (payload) => {
    axiosClient
      .get(`/cars/filter`, { params: payload })
      .then(({ data }) => {
        updateData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSearchCarHandle = (string) => {
    const payload = {
      string: string,
      user_id: "",
    };

    axiosClient
      .get(`/search-cars`, { params: payload, withCredentials: true })
      .then(({ data }) => {
        updateData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCars = (url) => {
    url = url || "/cars";
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        updateData(data);
      })
      .catch((error) => {
        navigateR(window.location.pathname, true, {
          code: error.response.status,
          mess: error.response.statusText,
        });
      });
  };

  const updateData = (data) => {
    setCars(data.data);
    setMeta(data.meta);
    setLinks(data.links);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <CategoryFilter
      title={"Cars"}
      loading={loading}
      filterCarsHandle={onFilterCarsHandle}
      searchCarHandle={onSearchCarHandle}
      userId={''}
    >
      <div>
        {cars.length > 0 && <CarLists cars={cars}></CarLists>}
        {cars.length === 0 && (
          <div className="text-center font-medium my-24">Cars not found...</div>
        )}
        {meta.links && (
          <PaginationLinks
            meta={meta}
            links={links}
            onPageClick={onPageClick}
          ></PaginationLinks>
        )}
      </div>
    </CategoryFilter>
  );
}
