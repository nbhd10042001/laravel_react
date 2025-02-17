import React, { useEffect, useState } from "react";
import axiosClient from "../../axios";
import { Spinner } from "flowbite-react";
import PaginationLinks from "../../components/PaginationLinks";
import PageComponent from "../../components/PageComponent";
import OrderList from "./component/OrderList";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const [links, setLinks] = useState({});

  useEffect(() => {
    getOrders();
  }, []);

  const onPageClick = (url) => {
    getOrders(url);
  };

  const getOrders = (url) => {
    url = url || "/order";

    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        setOrders(data.data);
        setMeta(data.meta);
        setLinks(data.links);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <PageComponent title={"Manage Orders"}>
      {loading && (
        <div className="text-center text-lg text-medium my-32">
          Loading data... <Spinner color="warning"></Spinner>
        </div>
      )}
      {!loading && (
        <div>
          <OrderList orders={orders}></OrderList>
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
