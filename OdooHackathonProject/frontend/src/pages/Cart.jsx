import React, { useContext, useEffect, useState } from "react";
import SummeryApi from "../common/Summery";
import Context from "../context/context";
import displayINRCurrency from "../helpers/DisplayCurrency";
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const context = useContext(Context);
  const LoadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummeryApi.addToCartProductView.url, {
      method: SummeryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    console.log(responseData.data);
    if (responseData.success) {
      setData(responseData.data);
    }
  };
  const handelLoading = async () => {
    await fetchData();
  };
  useEffect(() => {
    setLoading(true);
    handelLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummeryApi.updateCartProduct.url, {
      method: SummeryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummeryApi.updateCartProduct.url, {
        method: SummeryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProductWithId = async (id) => {
    const response = await fetch(SummeryApi.deleteCartProduct.url, {
      method: SummeryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };
  const handelPayment = async () => {
    const stripePromise = await loadStripe(
      process.env.REACT_APP_STRIPE_PUBLIC_KEY
    );
    const response = await fetch(SummeryApi.payment.url, {
      method: SummeryApi.payment.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems: data,
      }),
    });
    const responseData = await response.json();
    if (responseData?.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData.id });
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (previousValue, currentValue) =>
      previousValue +
      currentValue?.quantity * currentValue?.productId?.sellingPrice,
    0
  );

  return (
    <div className="container mx-auto px-8">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !Loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between py-2">
        {/* view product */}
        <div className="w-full max-w-3xl">
          {Loading
            ? LoadingCart.map((el, index) => {
                return (
                  <div
                    className="w-full bg-slate-200 h-32 my-1 border border-slate-300 animate-pulse"
                    key={el + "Add to Cart Loading" + index}
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    className="w-full bg-white h-32 my-1 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
                    key={product?._id}
                  >
                    <div className="w-32 h-32 bg-slate-200 ">
                      <img
                        src={product?.productId?.productImage[0]}
                        alt=""
                        className="w-full h-full object-scale-down mix-blend-multiply "
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/* Delete Product */}
                      <div
                        className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                        onClick={() => deleteCartProductWithId(product?._id)}
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId?.category}
                      </p>
                      <div className="flex items-center justify-between ">
                        <p className="text-violet-600 font-medium text-lg">
                          {displayINRCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayINRCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className=" border border-violet-600 text-violet-600 w-6 h-6 flex justify-center items-center rounded hover:bg-violet-600 hover:text-white font-medium"
                          onClick={() =>
                            decraseQty(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className=" border border-violet-600 text-violet-600 w-6 h-6 flex justify-center items-center rounded hover:bg-violet-600 hover:text-white font-medium"
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* ****Total Product**** */}
        {data[0] && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm ">
            {Loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white">
                <h2 className="text-white bg-violet-600 px-4 py-1"> Summary</h2>
                <div className="flex items-center justify-between px-4 py-1 gap-2 font-medium text-lg text-slate-600">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>
                <div className="flex items-center justify-between px-4 py-1 gap-2 font-medium text-lg text-slate-600">
                  <p>Total Price</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>

                <button
                  className="bg-green-700 p-2 text-white w-full"
                  onClick={handelPayment}
                >
                  Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
