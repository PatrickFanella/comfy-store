import { FeaturedProducts, Hero } from "../components";
import axios from 'axios'
const url =
  "https://strapi-store-server.onrender.com/api/products?featured=true";

const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: async () => axios.get(url)
  }




  export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery);
  console.log(response);
  const products = response.data.data
  return {products}

};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
