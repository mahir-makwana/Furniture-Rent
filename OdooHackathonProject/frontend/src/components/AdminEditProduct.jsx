import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import DisplayImge from "./DisplayImge";
import { MdDelete } from "react-icons/md";
import SummeryApi from "../common/Summery";
import { toast } from "react-toastify";

const AdminEditProduct = ({ onClose, productData, fetchData }) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handelOnChange = (e) => {
    const { name, value } = e.target;

    setData(() => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  const handelUploadProduct = async (e) => {
    const file = e.target.files[0];
    console.log("file = >", file);
    const uploadImageCloudinary = await uploadImage(file);
    setData(() => {
      return {
        ...data,
        productImage: [...data.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handelDeleteProductImage = async (index) => {
    console.log("image index", index);

    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData(() => {
      return {
        ...data,
        productImage: [...newProductImage],
      };
    });
  };

  // Update product
  const handelSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummeryApi.updateProduct.url, {
      method: SummeryApi.updateProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await dataResponse.json();
    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      fetchData();
    }
    if (responseData.error) {
      toast.error(responseData.message);
    }
  };
  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35  top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center py-3">
          <h2 className="font-bold text-lg">Edit Products</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-violet-600 hover:cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>
        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-20"
          onSubmit={handelSubmit}
        >
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter Product Name"
            name="productName"
            value={data.productName}
            onChange={handelOnChange}
            className="p-2 bg-slate-100 border  rounded"
            required
          />

          <label htmlFor="brandName" className="mt-3">
            Brand Name
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter Brand Name "
            value={data.brandName}
            name="brandName"
            onChange={handelOnChange}
            className="p-2 bg-slate-100 border  rounded"
            required
          />

          <label htmlFor="category" className="mt-3">
            Category
          </label>
          <select
            value={data.category}
            className="p-2 bg-slate-100 border  rounded"
            onChange={handelOnChange}
            name="category"
            required
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image </p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handelUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <div
                        className="absolute top-0 right-0 p-1  text-white bg-violet-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handelDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-violet-600 text-xs">
                *Please Upload product image
              </p>
            )}
          </div>
          <label htmlFor="price" className="mt-3">
            Price
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter your price"
            value={data.price}
            name="price"
            onChange={handelOnChange}
            className="p-2 bg-slate-100 border  rounded"
            required
          />

          <label htmlFor="price" className="mt-3">
            Selling Price
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Enter your Selling Price"
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handelOnChange}
            className="p-2 bg-slate-100 border  rounded"
            required
          />

          <label htmlFor="description" className="mt-3">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="h-28 bg-slate-100 border resize-none"
            placeholder="Enter Product Description"
            onChange={handelOnChange}
            value={data.description}
          ></textarea>

          <button className="px-3 py-2 bg-violet-600 text-white mb-5 hover:bg-violet-700">
            Update Product
          </button>
        </form>
      </div>

      {/* display image full screen */}
      {openFullScreenImage && (
        <DisplayImge
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;
