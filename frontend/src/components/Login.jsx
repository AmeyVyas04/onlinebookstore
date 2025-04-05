import React from "react";
import { Link, useNavigate } from "react-router-dom"; // 👈 added useNavigate
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate(); // 👈 initialize navigate

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.post("https://onlinebookstore-4vl3.onrender.com/user/login", userInfo);
      if (res.data) {
        toast.success("Logged in successfully");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        document.getElementById("my_modal_3").close();
        navigate("/"); // 👈 redirect to homepage
      }
    } catch (err) {
      if (err.response) {
        console.error(err);
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="space-y-4">
          {/* Close button */}
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("my_modal_3").close()}
          >
            ✕
          </button>

          <h3 className="font-bold text-xl text-center">Login</h3>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-sm text-error">This field is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-sm text-error">This field is required</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2 pt-4">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
            <p className="text-center text-sm">
              Not registered?{" "}
              <Link to="/signup" className="text-blue-500 underline">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default Login;
