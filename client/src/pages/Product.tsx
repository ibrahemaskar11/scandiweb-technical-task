import React, { useEffect, useReducer, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { PRODUCT_QUERY } from "@/grqphql/schema";
import { useApolloClient, useQuery } from "@apollo/client";
import {
  IPrice,
  IProduct,
  IProductResponse,
  ISelectedAttributes,
} from "@/types/Products";
import { formatPrice } from "@/utils/formatters";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import useStore from "@/store";
import HTMLReactParser from "html-react-parser";

type Action = {
  type: "SELECT_ATTRIBUTE";
  payload: {
    id: string;
    value: string;
  };
};

const reducer = (
  state: ISelectedAttributes[],
  action: Action
): ISelectedAttributes[] => {
  switch (action.type) {
    case "SELECT_ATTRIBUTE":
      const existingAttributeIndex = state.findIndex(
        (attr) => attr.id === action.payload.id
      );

      if (existingAttributeIndex !== -1) {
        const updatedState = [...state];
        updatedState[existingAttributeIndex] = {
          id: action.payload.id,
          value: action.payload.value,
        };
        return updatedState;
      } else {
        return [
          ...state,
          {
            id: action.payload.id,
            value: action.payload.value,
          },
        ];
      }

    default:
      return state;
  }
};

const Product = () => {
  const client = useApolloClient();
  const { id } = useParams();
  const { addToCart, cart } = useStore((state) => state);
  const [addToCartError, setAddToCartError] = useState<boolean>(false);
  const [selectedAttributes, dispatch] = useReducer(reducer, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, error, data, refetch } = useQuery<IProductResponse>(
    PRODUCT_QUERY,
    {
      variables: {
        productId: id,
      },
    }
  );
  console.log({
    error,
    loading,
    data,
  });

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === (data?.product.gallery.length as number) - 1
        ? 0
        : prevIndex + 1
    );
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? (data?.product.gallery.length as number) - 1
        : prevIndex - 1
    );
  };

  const dispatchToCart = () => {
    if (!data?.product) return;
    if (
      (data?.product.attributes.length as number) > 0 &&
      selectedAttributes.length !== (data?.product.attributes.length as number)
    ) {
      setAddToCartError(true);
      setTimeout(() => {
        setAddToCartError(false);
      }, 3000);
      return;
    }
    const sortedSelectedAttributes = selectedAttributes
      .slice()
      .sort((a, b) => a.id.localeCompare(b.id));

    let key = data?.product.id;
    sortedSelectedAttributes.forEach((attribute) => {
      key += `-${attribute.id}_${attribute.value}`;
    });
    console.log({ key });
    addToCart(
      key,
      data?.product,
      selectedAttributes,
      data.product.prices[0].currency,
      data.product.prices[0].amount
    );
  };
  console.log({
    cart,
    selectedAttributes,
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
      <main
        data-testid={`product-${data?.product.name
          .replace(/\s+/g, "-")
          .toLowerCase()}`}
        className="w-full h-full py-[5rem] flex justify-start px-[6.25rem] gap-x-[2.5rem] items-start"
      >
        <div
          data-testid="product-gallery"
          className="flex justify-start items-start gap-x-[2.5rem]"
        >
          {/* Thumbnail Images */}
          <div className="flex flex-col gap-y-[1.25rem] h-full w-[5rem] max-h-[31.25rem] overflow-y-scroll">
            {data?.product.gallery.map((img, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="w-full h-[5rem] relative"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: index === currentIndex ? 1 : 0.5 }}
                transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
              >
                <img
                  src={img}
                  className="w-full h-full object-contain"
                  alt=""
                />
              </motion.button>
            ))}
          </div>

          {/* Main Image with Transition */}
          <div className="w-[35.938rem] h-[31.25rem] relative">
            {/* Transition Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 flex w-full justify-between items-center px-4 z-10">
              <button
                onClick={handlePrev}
                className="w-8 h-8 bg-[#000000BA] flex justify-center items-center"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.9687 5.16618L7.53955 12.5875L14.9687 20.0088"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 bg-[#000000BA] flex justify-center items-center"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5.09158L16.5 12.5836L9 20.0757"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Animated Image */}
            <div className="w-full h-full relative overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                {!data?.product.inStock && (
                  <p className="text-[#8D8F9A] text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    OUT OF STOCK
                  </p>
                )}
                <motion.img
                  key={currentIndex}
                  src={data?.product.gallery[currentIndex]}
                  className={`w-full h-full object-contain ${
                    !data?.product.inStock && "opacity-50"
                  }`}
                  alt=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: !data?.product.inStock ? 0.5 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex justify-start items-start gap-x-[6.875rem]">
          <div className="h-full w-[18.25rem]">
            <h1 className="font-semibold text-3xl text-[#1D1F22]">
              {data?.product.name}
            </h1>
            <div className="w-full">
              {data?.product.attributes.map((attribute) =>
                attribute.type === "swatch" ? (
                  <div
                    data-testid={`product-attribute-${attribute.name
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                    key={attribute.id}
                    className="mt-8 gap-y-2 flex flex-col justify-start items-start "
                  >
                    <h3 className="font-[700] text-lg roboto text-[#1D1F22]">
                      {attribute.name}:
                    </h3>
                    <div className="w-full flex justify-start items-end flex-wrap gap-y-2 gap-x-2">
                      {attribute.items.map((item) => (
                        <div
                          key={item.id}
                          className={`w-8 h-8 ${
                            selectedAttributes.some(
                              (selected_attribute) =>
                                selected_attribute.id === attribute.id &&
                                selected_attribute.value === item.value
                            ) && "border-[1px] p-[1px] border-[#5ECE7B]"
                          } flex justify-center p-[1px] items-center`}
                        >
                          <button
                            data-testid={`product-attribute-${attribute.name
                              .replace(/\s+/g, "-")
                              .toLowerCase()}-${item.value.replace(
                              /\s+/g,
                              "-"
                            )}${
                              selectedAttributes.some(
                                (selected_attribute) =>
                                  selected_attribute.id === attribute.id &&
                                  selected_attribute.value === item.value
                              )
                                ? "-selected"
                                : ""
                            }`}
                            onClick={() => {
                              dispatch({
                                type: "SELECT_ATTRIBUTE",
                                payload: {
                                  id: attribute.id,
                                  value: item.value,
                                },
                              });
                              setAddToCartError(false);
                            }}
                            style={{ backgroundColor: item.value }}
                            className={`w-full h-full bg-[${item.value}]`}
                          ></button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div
                    data-testid={`product-attribute-${attribute.name
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                    key={attribute.id}
                    className="mt-8 gap-y-2 flex flex-col justify-start items-start"
                  >
                    <h3 className="text-lg font-[700] text-[#1D1F22] roboto">
                      {attribute.name}:
                    </h3>
                    <div className="flex flex-wrap justify-start items-center gap-x-3">
                      {attribute.items.map((item) => (
                        <button
                          data-testid={`product-attribute-${attribute.name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}-${item.value.replace(/\s+/g, "-")}${
                            selectedAttributes.some(
                              (selected_attribute) =>
                                selected_attribute.id === attribute.id &&
                                selected_attribute.value === item.value
                            )
                              ? "-selected"
                              : ""
                          }`}
                          onClick={() => {
                            dispatch({
                              type: "SELECT_ATTRIBUTE",
                              payload: {
                                id: attribute.id,
                                value: item.value,
                              },
                            });
                            setAddToCartError(false);
                          }}
                          key={item.id}
                          className={`w-[3.875rem] h-[2.813rem] border-[1px] source-sans-pro border-[#1D1F22] text-[#1D1F22] text-base font-[400] ${
                            selectedAttributes.some(
                              (selected_attribute) =>
                                selected_attribute.id === attribute.id &&
                                selected_attribute.value === item.value
                            ) && "bg-[#1D1F22] text-white"
                          }`}
                        >
                          {item.value}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="mt-8 gap-y-2.5 flex flex-col justify-start items-start ">
              <h3 className="font-[700] text-lg roboto text-[#1D1F22]">
                PRICE:
              </h3>
              <h5 className="font-[700] text-[#1D1F22] text-2xl">
                {formatPrice(data?.product.prices[0] as IPrice)}
              </h5>
            </div>
            <button
              data-testid="add-to-cart"
              onClick={dispatchToCart}
              disabled={
                !data?.product.inStock ||
                ((data?.product.attributes.length as number) > 0 &&
                  selectedAttributes.length !==
                    (data?.product.attributes.length as number))
              }
              className={`mt-5 w-full h-[3.25rem] ${
                addToCartError ? "bg-red-500" : "bg-[#5ECE7B]"
              }  text-center text-white font-semibold text-xl`}
            >
              ADD TO CART
            </button>
            <div
              data-testid="product-description"
              className="mt-6 text-base font-[500] w-full text-[14px] text-[#1D1F22]"
            >
              {HTMLReactParser(data?.product.description as string)}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Product;
