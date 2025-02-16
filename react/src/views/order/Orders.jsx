import React, { useEffect, useState } from "react";
import PageComponent from "../../components/PageComponent";
import axiosClient from "../../axios";
import { Spinner } from "flowbite-react";
import { useStateContext } from "../../contexts/ContextProvider";
import PaginationLinks from "../../components/PaginationLinks";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({});
  const [links, setLinks] = useState({});
  const [loading, setLoading] = useState(false);
  const { navigateR } = useStateContext();

  const onPageClick = (url) => {
    getOrders(url);
  };

  const getOrders = (url) => {
    url = url || "/my-orders";
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        setOrders(data.data);
        setMeta(data.meta);
        setLinks(data.links);
        setLoading(false);
      })
      .catch((error) => {
        navigateR(window.location.pathname, true, {
          code: error.response.status,
          mess: error.response.statusText,
        });
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <PageComponent title={"Your Orders"}>
      {loading && (
        <div className="text-center text-2xl my-32">
          Loading data... <Spinner color="warning"></Spinner>
        </div>
      )}
      {!loading && orders.length === 0 && (
        <div className="text-center text-xl my-32">
          You have not placed any orders recently.
        </div>
      )}
      {!loading && orders.length > 0 && (
        <div className="min-h-[20rem]">
          <div className="mx-4 grid sm:grid-cols-2 gap-2">
            {orders.map((order, index) => {
              return (
                <div
                  key={`order-${index}`}
                  className="rounded-lg shadow-lg bg-gray-100 grid grid-cols-3 hover:opacity-70 hover:cursor-pointer"
                  onClick={() => {
                    navigateR(`/orders/${order.id}/show`);
                  }}
                >
                  <div className="rounded-md m-2 flex items-center">
                    <img src={order.image} className="rounded-md" />
                  </div>

                  <div className="col-span-2 m-2">
                    <h1 className="font-bold text-lg">
                      {order.slug}{" "}
                      <span className="font-medium ml-2">x{order.amount}</span>
                    </h1>
                    <div>
                      <div className="grid grid-cols-2">
                        <div>
                          <strong>Price : </strong>
                          {order.price}$
                        </div>
                        <div>
                          <strong>Total : </strong>
                          {order.total_price}$
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div>
                          <strong>Payment : </strong>
                          {order.payment}
                        </div>
                        <div>
                          <strong>State : </strong>
                          {order.state}
                        </div>
                      </div>
                      <div>
                        <strong>Create Date : </strong>
                        {order.created_at}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
