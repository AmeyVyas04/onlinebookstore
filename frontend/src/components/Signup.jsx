import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.post("http://localhost:4001/user/signup", userInfo);
      if (res.data) {
        toast.success("Signup Successfully");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-base-200">
        <div className="w-full max-w-md bg-base-100 p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Signup</h3>
              <Link to="/" className="btn btn-sm btn-circle btn-ghost">✕</Link>
            </div>

            {/* Fullname */}
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                placeholder="Enter your fullname"
                className="input input-bordered w-full"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && <p className="text-error text-sm">This field is required</p>}
            </div>

            {/* Email */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="text-error text-sm">This field is required</p>}
            </div>

            {/* Password */}
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                {...register("password", { required: true })}
              />
              {errors.password && <p className="text-error text-sm">This field is required</p>}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button type="submit" className="btn btn-primary">Signup</button>
              <button
                type="button"
                className="link text-blue-500"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Have an account? Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Login modal here */}
      <Login />
    </>
  );
}

export default Signup;
