import React, { useEffect, useState } from "react";
import CarLists from "../../components/car/CarLists";
import axiosClient from "../../axios";
import PaginationLinks from "../../components/PaginationLinks";
import { useStateContext } from "../../contexts/ContextProvider";
import CategoryFilter from "../../components/car/CategoryFilter";

export default function UserCars() {
  const [cars, setCars] = useState([]);
  const [meta, setMeta] = useState({});
  const [links, setLinks] = useState({});
  const [loading, setLoading] = useState(false);
  const { navigateR, userToken } = useStateContext();

  const onPageClick = (url) => {
    getCars(url);
  };

  const onSearchCarsClick = (payload) => {
    axiosClient
      .get(`/user-cars-filter`, {params: payload, withCredentials: true})
      .then(({ data }) => {
        console.log(data);
        updateData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onCategoryClick = (cate) => {
    if (cate === "All") {
      getCars();
      return;
    }
    var url = `/user-cars/${cate}`;
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        updateData(data);
      })
      // .catch((error) => {
      //   navigateR(window.location.pathname, true, {
      //     code: error.response.status,
      //     mess: error.response.statusText,
      //   });
      // });
  };

  const getCars = (url) => {
    url = url || "/user-cars";
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        updateData(data);
      })
      // .catch((error) => {
      //   navigateR(window.location.pathname, true, {
      //     code: error.response.status,
      //     mess: error.response.statusText,
      //   });
      // });
  };

  const updateData = (data) => {
    setCars(data.data);
    setMeta(data.meta);
    setLinks(data.links);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!userToken) {
      navigateR("/login");
    }
    getCars();
  }, []);

  return (
    <CategoryFilter
      title={"Your Cars"}
      loading={loading}
      categoryClick={onCategoryClick}
      searchCarsClick={onSearchCarsClick}
    >
      <div>
        <CarLists cars={cars}></CarLists>
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
