import React, { useContext, useState } from "react";
import Logo from "./logo.jsx";
import { IoSearch } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummeryApi from "../common/Summery.jsx";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice.jsx";
import ROLE from "../common/role.jsx";
import Context from "../context/context.js";
const Header = () => {
  const user = useSelector((state) => state?.user?.user?.data);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);

  const navigate = useNavigate();

  const searchInput = useLocation();
  const searchURL = new URLSearchParams(searchInput?.search);
  const URLSearchQuery = searchURL.getAll("q");

  const [search, setSearch] = useState(URLSearchQuery);
  const handleLogout = async () => {
    const fetchData = await fetch(SummeryApi.logout_user.url, {
      method: SummeryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  const handelSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };
  return (
    <header className="h-16 shadow-md bg-white px-4 fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          <Link to={"/"}>
            <Logo w={80} h={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded focus-within:shadow-md hover:shadow-md  pl-2 ">
          <input
            type="text"
            placeholder=" Search product here..."
            className="w-full outline-none h-8  "
            onChange={handelSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-violet-500 flex items-center justify-center rounded-l-full text-white">
            <IoSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center "
                onClick={() => setMenuDisplay((preve) => !preve)}
              >
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    className="h-10 w-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit  p-2  shadow-lg rounded ">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to={"/order"}
                    className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay((prev) => !prev)}
                  >
                    Order
                  </Link>
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <Link to={"cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>

              <div className="bg-violet-500 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-2">
                <p className="text-sm">{context.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full bg-violet-500 text-white hover:bg-violet-600"
              >
                LogOut
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full bg-violet-500 text-white hover:bg-violet-600"
              >
                login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
