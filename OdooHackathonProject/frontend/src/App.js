import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummeryApi from "./common/Summery";
import Context from "./context/context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummeryApi.current_user.url, {
      method: SummeryApi.current_user.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummeryApi.addToCartProductCount.url, {
      method: SummeryApi.addToCartProductCount.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  };
  useEffect(() => {
    // user Details
    fetchUserDetails();
    //user cart Product
    fetchUserAddToCart();
  }, []);
  return (
    <>
      <Context.Provider
        value={{ fetchUserDetails, cartProductCount, fetchUserAddToCart }}
      >
        <ToastContainer position="top-center" />

        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
