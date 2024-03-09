import axios from "axios";
import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { useLoaderData } from "react-router-dom";

const allProductsQuery = (queryParams) => {
  const { search, category, company, price, sort, shipping, page } =
    queryParams;
  return {
    queryKey: [
      "allProducts",
      search ?? "",
      category ?? "all",
      company ?? "all",
      price ?? 100000,
      sort ?? "a-z",
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      axios.get("https://strapi-store-server.onrender.com/api/products",{params:queryParams}),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log(params);
    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );
    console.log(response);
    const products = response.data.data;
    const meta = response.data.meta;
    return { products, meta, params };
  };

const Products = () => {
  const { products, meta } = useLoaderData();

  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
