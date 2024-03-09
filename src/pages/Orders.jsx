import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { OrdersList, ComplexPaginationContainer, SectionTitle } from "../components";

export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    if (!user) {
      toast.warn("Please login to view your orders");
      return redirect("/login");
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const response = await axios.get(
        "https://strapi-store-server.onrender.com/api/orders",
        {
          params,

          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message || "failed to order";
      toast.error(errorMessage);

      if (error.response.status === 401 || 403) {
        return redirect("/login");
      }
    }
    return null;
  };

const Orders = () => {
  const { orders, meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle text="You have no orders" />;
  }
  return <>
  <SectionTitle text='Your Orders'/>
  <OrdersList/>
  <ComplexPaginationContainer />
  </>
};

export default Orders;
