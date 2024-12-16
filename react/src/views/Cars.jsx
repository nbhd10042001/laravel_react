import React, { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import CarLists from "../components/product/CarLists";
import axiosClient from "../axios";
import PaginationLinks from "../components/PaginationLinks";

export default function Cars() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [links, setLinks] = useState({});
  const [loading, setLoading] = useState(false);

  const onPageClick = (url) => {
    getCars(url);
  };

  const getCars = (url) => {
    url = url || "/car";
    axiosClient.get(url).then(({ data }) => {
      setProducts(data.data);
      setMeta(data.meta);
      setLinks(data.links);
      setLoading(false);
    });
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <PageComponent title="Cars">
      {loading && <div className="text-center text-lg">Loading...</div>}

      {!loading && (
        <>
          <CarLists products={products}></CarLists>
          {meta.links && (
            <PaginationLinks
              meta={meta}
              links={links}
              onPageClick={onPageClick}
            ></PaginationLinks>
          )}
        </>
      )}
    </PageComponent>
  );
}
