import React from "react";
import Navbar from "@/components/ui/Navbar";
import { useParams } from "react-router-dom";
import { PRODUCTS_QUERY } from "@/grqphql/schema";
import { useQuery } from "@apollo/client";
import { IPorductCardResponse } from "@/types/Products";
import ProductCard from "@/components/products/ProductCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
const Home = () => {
  const { section } = useParams();
  console.log({
    section,
  });
  const { loading, error, data } = useQuery<IPorductCardResponse>(
    PRODUCTS_QUERY,
    {
      fetchPolicy: "cache-first",
      variables: {
        category: section,
      },
      onCompleted: (data) => {
        console.log({ data });
      },
    }
  );
  console.log({
    loading,
    error,
    data,
  });
  if (loading) {
    return (
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 ">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <>
      <main className="w-screen h-screen ">
        <div className="px-[6.25rem] py-[5rem] w-full h-full ">
          <h1 className="text-[#1D1F22] text-[42px] font-[400] capitalize">
            {section}
          </h1>

          <div className="py-[5rem] grid grid-cols-3 items-center justify-items-center gap-x-[2.5rem] gap-y-[5rem]">
            {data?.products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
