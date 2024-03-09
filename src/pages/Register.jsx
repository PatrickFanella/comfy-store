import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await axios.post(
      "https://strapi-store-server.onrender.com/api/auth/local/register",
      data
    );
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message || "failed to register";
    toast.error(errorMessage);
  }
};

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="text" label="username" name="username" />
        <FormInput type="email" label="email" name="email" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="REGISTER" />
        </div>
        <p className="text-center">
          Already a member?{" "}
          <Link className="ml-2 link link-hover link-primary capitalize">
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
