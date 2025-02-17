import React, { useEffect, useState } from "react";
import axiosClient from "../../axios";
import { Spinner } from "flowbite-react";
import PaginationLinks from "../../components/PaginationLinks";
import PageComponent from "../../components/PageComponent";
import AdminCarList from "./component/AdminCarList";

export default function AdminCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const [links, setLinks] = useState({});

  useEffect(() => {
    getCars();
  }, []);

  const onPageClick = (url) => {
    getCars(url);
  };

  const getCars = (url) => {
    url = url || "/cars";

    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        setCars(data.data);
        setMeta(data.meta);
        setLinks(data.links);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <PageComponent title={"Manage Cars"}>
      {loading && (
        <div className="text-center text-lg text-medium my-32">
          Loading data... <Spinner color="warning"></Spinner>
        </div>
      )}
      {!loading && (
        <div>
          <AdminCarList cars={cars}></AdminCarList>
        </div>
      )}
      {meta.links && (
        <PaginationLinks
          meta={meta}
          links={links}
          onPageClick={onPageClick}
        ></PaginationLinks>
      )}
    </PageComponent>
  );
}
