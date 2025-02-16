import React, { useEffect, useState } from "react";
import PageComponent from "../../components/PageComponent";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios";
import { useStateContext } from "../../contexts/ContextProvider";
import { Button } from "flowbite-react";
import { ModalComponent } from "../../components/ModalComponent";

export default function OrderShow() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [modal, setModal] = useState(false);
  const { userToken, navigateR, showToast } = useStateContext();

  const handleModal = (open) => {
    setModal(open);
  };

  const handleClickAcceptButton = () => {
    setModal(false);
    axiosClient
      .delete(`/order/${id}`)
      .then(() => {
        showToast("Cancel order success", "success");
        navigateR("/orders");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (!userToken) {
      navigateR("/login");
    }
    axiosClient
      .get(`/order/${id}`)
      .then(({ data }) => {
        setOrder(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <PageComponent title={`Order Detail`}>
      {order && (
        <div className="grid grid-cols-3 gap-2">
          <div className="grid grid-rows-2 mx-auto p-4 bg-white rounded-lg shadow-md">
            <div className="w-full">
              <img src={order.image} />
            </div>
            <div className="m-4">
              <h1 className="font-bold text-2xl mb-4">{order.slug}</h1>
              <div className="flex flex-col gap-2">
                <div>
                  <strong>Price : </strong>${order.price}
                </div>
                <div>
                  <strong>Amount : </strong>x{order.amount}
                </div>
                <div>
                  <strong>Total : </strong>${order.total_price}
                </div>
              </div>
              <div>
                <i
                  className="text-sm italic text-indigo-700 font-medium underline 
                    hover:opacity-70 hover:cursor-pointer"
                  onClick={() => {
                    navigateR(`/car/${order.car_id}/show`);
                  }}
                >
                  View car
                </i>
              </div>
            </div>
          </div>
          <div className="col-span-2 w-full mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Information</h2>
            <div className="mb-4">
              <strong>Customer Name:</strong> {order.user_name}
            </div>
            <div className="mb-4">
              <strong>Customer Email:</strong> {order.user_email}
            </div>
            <div className="mb-4">
              <strong>Customer Phone:</strong> {order.phone}
            </div>
            <div className="mb-4">
              <strong>Order Payment:</strong> {order.payment}
            </div>
            <div className="mb-4">
              <strong>Order ID:</strong> {order.order_id}
            </div>
            <div className="mb-4">
              <strong>Order Date:</strong> {order.created_at}
            </div>
            <div className="mb-4">
              <strong>Order State:</strong> {order.state}
            </div>
            <div className="mb-4">
              <strong>Receiving location:</strong> {order.address}
            </div>

            <div>
              <Button
                color="red"
                onClick={() => {
                  setModal(true);
                }}
              >
                Cancel Order
              </Button>
            </div>
          </div>
          <ModalComponent
            tittle="Cancel order?"
            message="Are you sure about to cancel this order?"
            setModal={handleModal}
            modal={modal}
            clickAcceptButton={handleClickAcceptButton}
          ></ModalComponent>
        </div>
      )}
    </PageComponent>
  );
}
