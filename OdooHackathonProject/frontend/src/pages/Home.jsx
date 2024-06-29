import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div className="px-5">
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct
        category={"living_room_furniture"}
        heading={"Living Room Furniture"}
      />
      <HorizontalCardProduct
        category={"bedroom_furniture"}
        heading={"Bedroom Furniture"}
      />
      <HorizontalCardProduct
        category={"dining_room_furniture"}
        heading={"Dining Room Furniture"}
      />

      <VerticalCardProduct
        category={"office_furniture"}
        heading={"Office Furniture"}
      />
      <VerticalCardProduct
        category={"outdoor_furniture"}
        heading={"Outdoor Furniture"}
      />
      <VerticalCardProduct
        category={"storage_furniture"}
        heading={"Storage Furniture"}
      />
      <VerticalCardProduct
        category={"accent_furniture"}
        heading={"Accent Furniture"}
      />
      <VerticalCardProduct
        category={"entryway_furniture"}
        heading={"Entryway Furniture"}
      />
    </div>
  );
};

export default Home;
