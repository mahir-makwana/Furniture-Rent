import React, { useContext } from "react";
import displayINRCurrency from "../helpers/DisplayCurrency";
import scrollTop from "../helpers/scrollTop";
import Context from "../context/context";
import addToCart from "../helpers/addtoCart";
import { Link } from "react-router-dom";

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handelAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-center md:justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all">
      {loading
        ? loadingList.map((product, index) => {
            return (
              <div className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[310px]  bg-white rounded-sm shadow ">
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse "></div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1  bg-slate-200 animate-pulse rounded-full py-2"></h2>
                  <p className="capitalize text-slate-500 animate-pulse rounded-full p-1  bg-slate-200 py-2"></p>
                  <div className="flex gap-3">
                    <p className="text-violet-700  font-medium animate-pulse rounded-full p-1  py-2 bg-slate-200 w-full"></p>
                    <p className="text-slate-500 line-through animate-pulse rounded-full p-1  py-2 bg-slate-200 w-full"></p>
                  </div>
                  <button className=" text-sm  text-white px-3 mt-2 rounded-full  animate-pulse bg-slate-200 py-2"></button>
                </div>
              </div>
            );
          })
        : data.map((product, index) => {
            return (
              <Link
                to={"/product/" + product._id}
                className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
                onClick={() => scrollTop}
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                  <img
                    src={product.productImage[0]}
                    alt=""
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product.category}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-violet-700  font-medium">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className=" text-sm bg-violet-600 hover:bg-violet-700 text-white px-3 py-1.5 mt-2 rounded-full"
                    onClick={(e) => handelAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default VerticalCard;
