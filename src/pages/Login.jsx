import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginUser } from "../features/user/userSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await axios.post(
        "https://strapi-store-server.onrender.com/api/auth/local",
        data
      );
      store.dispatch(loginUser(response.data));
      console.log(response);
      toast.success("logged in successfully");

      return redirect("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message || "failed to login";
      toast.error(errorMessage);
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginAsGuestUser = async () => {
    try {
      const response = await axios.post(
        "https://strapi-store-server.onrender.com/api/auth/local",
        {
          identifier: "test@test.com",
          password: "secret",
        }
      );
      console.log(response.data);
      dispatch(loginUser(response.data));
      toast.success("logged in as guest user");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("failed to login as guest user");
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          label="email"
          name="identifier"
          defaultValue="test@test.com"
        />
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue="secret"
        />
        <div className="mt-4">
          <SubmitBtn text="LOGIN" />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={loginAsGuestUser}
        >
          GUEST USER
        </button>
        <p className="text-center">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
