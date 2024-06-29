import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummeryApi from "../common/Summery";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  const [allProduct, setAllProduct] = useState([]);
  const fetchAllProducts = async () => {
    const responseData = await fetch(SummeryApi.allProduct.url, {
      method: SummeryApi.allProduct.method,
      credentials: "include",
    });

    const dataResponse = await responseData.json();
    setAllProduct(dataResponse?.data || []);
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          className="border-2 border-violet-600  text-violet-600 hover:bg-violet-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>
      {/* upload all product */}
      <div className="flex items-center flex-wrap gap-10 py-4 h-[calc(100vh-190px)] overflow-y-scroll ">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard
              fetchData={fetchAllProducts}
              data={product}
              key={index + "allProduct"}
            />
          );
        })}
      </div>

      {/* upload product component */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProducts}
        />
      )}
    </div>
  );
};

export default AllProducts;
