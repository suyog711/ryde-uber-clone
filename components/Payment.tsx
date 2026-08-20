import React from "react";
import CustomButton from "./CustomButton";

type Props = {};

const Payment = (props: Props) => {
  const openPaymentSheet = () => {};

  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />
    </>
  );
};

export default Payment;
