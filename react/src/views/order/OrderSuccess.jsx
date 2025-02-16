import React, { useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import PageComponent from "../../components/PageComponent";

export default function OrderSuccess() {
  const { setPaymentSuccess, detailOrder, userToken } = useStateContext();

  useEffect(() => {
    if (!userToken) {
      window.location.href = "/";
    }
    setPaymentSuccess(false);
  }, []);

  return (
    <PageComponent title={"Order successful"}>
      <div className="sm:mx-12">
        <div className="grid sm:grid-cols-2">
          <div className="sm:border-r-4 sm:mx-4 space-x-2 mb-2 sm:mb-0">
            <h1 className="font-bold text-2xl mb-6">Detail Order</h1>
            <div className="flex flex-col space-y-2">
              <div className="grid sm:grid-cols-3">
                <div className="font-medium">Name:</div>
                <p className="col-span-2">{detailOrder.fullName}</p>
              </div>
              <div className="grid sm:grid-cols-3">
                <div className="font-medium">Email:</div>
                <p className="col-span-2">{detailOrder.email}</p>
              </div>
              <div className="grid sm:grid-cols-3">
                <div className="font-medium">Phone:</div>
                <div className="col-span-2">{detailOrder.phone}</div>
              </div>
              <div className="grid sm:grid-cols-3">
                <div className="font-medium">Payment method:</div>
                <div className="col-span-2">{detailOrder.method}</div>
              </div>
            </div>
            <div className="my-8">
              <p className="italic text-sm">
                Thank you for trusting and purchasing from us. Please check the
                location in the order and come to receive the product as soon as
                possible (if you have not paid, please go to the nearest
                facility to complete the payment)
              </p>
            </div>
          </div>

          <div className="sm:mx-4">
            <h1 className="font-bold text-2xl mt-2 sm:mt-0 mb-6">List Order</h1>
            <div className="w-full">
              <div className="min-h-[20rem] max-h-[20rem] overflow-auto">
                {detailOrder.orderItems &&
                  detailOrder.orderItems.map((item, index) => {
                    return (
                      <div
                        key={`car_list_${index}`}
                        className="w-full h-28 rounded-lg bg-gray-100 flex gap-2 shadow-lg"
                      >
                        <div className="rounded-md w-[50%] m-2 flex justify-center items-center">
                          <img src={item.img_url} className="size-[80%]" />
                        </div>
                        <div className="flex flex-col justify-center w-[50%]">
                          <div className="font-medium">{item.slug}</div>
                          <div className="font-sm grid grid-cols-3">
                            <div className="font-medium">Price</div>
                            <div>: {item.price}$</div>
                          </div>
                          <div className="font-sm grid grid-cols-3">
                            <div className="font-medium">Amount</div>
                            <div>: x{item.amount}$</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
