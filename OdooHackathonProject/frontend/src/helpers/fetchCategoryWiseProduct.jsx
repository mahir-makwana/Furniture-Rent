import SummeryApi from "../common/Summery";

const fetchCategoryWiseProduct = async (category) => {
  const response = await fetch(SummeryApi.categoryWiseProduct.url, {
    method: SummeryApi.categoryWiseProduct.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category: category }),
  });
  const dataResponse = await response.json();
  return dataResponse;
};

export default fetchCategoryWiseProduct;
