import React, { useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import PageComponent from "../../components/PageComponent";

export default function OrderSuccess() {
  const { setPaymentSuccess, detailOrder } = useStateContext();

  useEffect(() => {
    setPaymentSuccess(false);
  }, []);

  return (
    <PageComponent title={"Detail Order"}>
        <div>
            {}
        </div>
    </PageComponent>
  );
}
