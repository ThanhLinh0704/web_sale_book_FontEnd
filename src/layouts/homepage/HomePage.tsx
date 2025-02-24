import React from "react";
import Carousel from "./components/Carousel";
import ListProduct from "../../product/ListProduct";
import { useParams } from "react-router-dom";

interface HomePageProps {
  keywordSearch: string;
}

const HomePage = ({ keywordSearch }: HomePageProps) => {
  const { codeCategory } = useParams();
  let codeCategoryNumber = 0;

  try {
    codeCategoryNumber = parseInt(codeCategory + " ");
  } catch (error) {
    codeCategoryNumber = 0;
    console.log("Error: ", error);
  }
  if (Number.isNaN(codeCategoryNumber)) {
    codeCategoryNumber = 0;
  }

  return (
    <div>
      <Carousel />
      <ListProduct
        keywordSearch={keywordSearch}
        codeCategory={codeCategoryNumber}
      />
    </div>
  );
};

export default HomePage;
