import React, { useContext, useState } from "react";
import loginIcon from "../assest/loginGi.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummeryApi from "../common/Summery";
import { toast } from "react-toastify";
import Context from "../context/context";

const Login = () => {
  const [showPassword, setPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handeOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const hadelSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummeryApi.signIn.url, {
      method: SummeryApi.signIn.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  console.log("Data login", data);
  return (
    <section id="login">
      <div className="mx-auto container p-4 ">
        <div className="bg-white p-5 5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="login icons" />
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={hadelSubmit}>
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-100  p-2">
                <input
                  name="email"
                  onChange={handeOnChange}
                  type="email"
                  value={data.email}
                  placeholder="Enter email"
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label>Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={handeOnChange}
                  placeholder="Enter password"
                  name="password"
                  value={data.password}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-violet-500"
              >
                Forgot password ?
              </Link>
            </div>
            <button className="bg-violet-500 hover:bg-violet-700 text-white px-6 py-1.5 w-full max-w-[150px] rounded-full hover:scale-110 tran mx-auto block mt-6">
              Login
            </button>
          </form>

          <p className="my-5">
            Don't have account ?
            <Link
              to={"/sign-up"}
              className=" hover:text-violet-700  hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
