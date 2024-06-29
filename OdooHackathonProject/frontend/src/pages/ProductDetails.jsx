import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummeryApi from "../common/Summery";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import displayINRCurrency from "../helpers/DisplayCurrency";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addtoCart";
import Context from "../context/context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });

  const [zoomImage, setZoomImage] = useState(false);
  const navigate = useNavigate();
  const { fetchUserAddToCart, fetchUserDetails } = useContext(Context);

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummeryApi.productDetails.url, {
      method: SummeryApi.productDetails.method,

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataResponse = await response.json();
    setData(dataResponse.data);
    setActiveImage(dataResponse?.data.productImage[0]);
  };
  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handelMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };
  const handelZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      // console.log("coerdinet", left, top, width, height);
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );
  const handelLeaveImageZoom = () => {
    setZoomImage(false);
  };
  const handelAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className="container mx-auto p-12">
      <div className=" min-h-[200px] flex flex-col lg:flex-row gap-2">
        {/* product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4 relative p-2">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 ">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply cursor-pointer"
              alt=""
              onMouseMove={handelZoomImage}
              onMouseLeave={handelLeaveImageZoom}
            />
            {/* product Zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px]  mix-blend-multiply scale-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div className="h-20 w-20 bg-slate-200 rounded animate-pulse"></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imageURL, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                      key={imageURL}
                    >
                      <img
                        src={imageURL}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handelMouseEnterProduct(imageURL)}
                        onClick={() => handelMouseEnterProduct(imageURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* product detail */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className=" bg-slate-200 animate-pulse h-4 w-full rounded-full inline-block lg:h-8"></p>
            <h2 className="text-2xl lg:text-4xl font-medium  h-6 w-full bg-slate-200 animate-pulse lg:h-8"></h2>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 w-full lg:h-8"></p>

            <div className="bg-slate-200 h-6 animate-pulse flex items-center gap-1 w-full lg:h-8"></div>
            <div className="flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl h-6 animate-pulse w-full">
              <p className="text-violet-600 bg-slate-200 w-full"></p>
              <p className="text-slate-400 bg-slate-200 line-through w-full"></p>
            </div>
            <div className="flex items-center gap-3 my-2  w-full">
              <button className="h-6 bg-slate-200 rounded animate-pulse lg:h-8 w-full"></button>
              <button className="h-6 bg-slate-200 rounded animate-pulse lg:h-8 w-full"></button>
            </div>
            <div className="w-full">
              <p className="text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></p>
              <p className="h-10 bg-slate-200 rounded animate-pulse lg:h-8 w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-violet-200 text-violet-600 px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-400">{data?.category}</p>

            <div className="text-violet-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>
            <div className="flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl">
              <p className="text-violet-600">
                {displayINRCurrency(data.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayINRCurrency(data.price)}
              </p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-violet-600 rounded px-3 py-1 min-w-[120px] text-violet-600 font-medium hover:bg-violet-600 hover:text-white"
                onClick={(e) => handelAddToCart(e, data._id)}
              >
                Rent
              </button>
              <button
                className="border-2 border-violet-600 rounded px-3 py-1 min-w-[120px] font-medium  bg-violet-600 text-white hover:text-violet-600 hover:bg-white"
                onClick={(e) => handelAddToCart(e, data._id)}
              >
                Add To Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description :</p>
              <p>{data.description}</p>
            </div>
          </div>
        )}
      </div>
      {data.category && (
        <CategoryWiseProductDisplay
          category={data.category}
          heading={"Recommended Product"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
