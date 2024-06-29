import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import loginIcon from "../assest/loginGi.gif";
import imageTobase64 from "../helpers/imageTobase64";
import SummeryApi from "../common/Summery";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();
  const handeOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handelUplodePic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  const hadelSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummeryApi.SignUp.url, {
        method: SummeryApi.SignUp.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Password and Confirm Password not match");
    }
  };
  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcon} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 py-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Uplode Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handelUplodePic}
                />
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={hadelSubmit}>
            <div className="grid">
              <label>Name : </label>
              <div className="bg-slate-100  p-2">
                <input
                  name="name"
                  onChange={handeOnChange}
                  type="text"
                  value={data.name}
                  placeholder="Enter your name"
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>
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
            </div>
            <div>
              <label>Confirm Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={handeOnChange}
                  placeholder="Enter Confirm password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-violet-500 hover:bg-violet-700 text-white px-6 py-1.5 w-full max-w-[150px] rounded-full hover:scale-110 tran mx-auto block mt-6">
              SignUp
            </button>
          </form>

          <p className="my-5">
            already have account ?
            <Link
              to={"/login"}
              className=" hover:text-violet-700  hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
