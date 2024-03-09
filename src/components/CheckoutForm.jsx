import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { toast } from "react-toastify";
import { formatPrice } from "../utils";
import axios from "axios";
import { clearCart } from "../features/cart/cartSlice";
import { data } from "autoprefixer";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);

    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };

    try {
      const response = await axios.post(
        "https://strapi-store-server.onrender.com/api/orders",
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      store.dispatch(clearCart());
      toast.success("Your order has been placed");
      return redirect("/orders");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message || "failed to order";
      toast.error(errorMessage);

      if (error.response.status === 401 || 403) {
        return redirect("/login");
      }
    }
  };

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl">shipping information</h4>
      <FormInput name="name" label="first name" type="text" />
      <FormInput name="address" label="address" type="text" />
      <div className="mt-4">
        <SubmitBtn text="PLACE YOUR ORDER" />
      </div>
    </Form>
  );
};

export default CheckoutForm;
