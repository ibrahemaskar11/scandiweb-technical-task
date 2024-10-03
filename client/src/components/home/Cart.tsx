import React, { useEffect, useState } from "react";
import dummyShirtImage from "@/assets/dummy_shirt.png";
import dummyGlassesImage from "@/assets/dummy_glasses.png";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "@/store";
import { formatPrice } from "@/utils/formatters";
import { ICurrency } from "@/types/Products";
import { ApolloError, isApolloError, useMutation } from "@apollo/client";
import { PLACE_ORDER_MUTATION } from "@/grqphql/schema";
import toast from "react-hot-toast";
import LoadingSpinner from "../ui/LoadingSpinner";

const Cart: React.FC<{ discardCart: () => void; isVisible: boolean }> = ({
  discardCart,
  isVisible,
}) => {
  const {
    cart,
    removeFromCart,
    addToCart,
    changeSelectedAttributes,
    emptyCart,
  } = useStore((state) => state);
  const [placeOrder, { loading }] = useMutation(PLACE_ORDER_MUTATION);
  console.log({ isVisible });
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

  const placeOrderHandler = async () => {
    try {
      if (!cart.itemsQuantity) return toast.error("Cart is empty");
      const items = cart.products.map((product) => {
        return {
          id: product.product.id,
          quantity: product.quantity,
          paid_amount: product.amount * product.quantity,
          paid_currency: product.currency.label,
          selected_attributes: product.selectedAttributes,
        };
      });
      console.log({
        total: cart.totalAmount,
        currency_id: cart.currecny?.label,
        items,
      });
      const { data } = await placeOrder({
        variables: {
          input: {
            total: cart.totalAmount,
            currency_id: cart.currecny?.label,
            items,
          },
        },
      });
      console.log({
        data,
      });
      toast.success(data.placeOrder.message);
      emptyCart();
    } catch (error) {
      console.log(error);

      if (error instanceof ApolloError) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          const errorMessage =
            error.graphQLErrors[0]?.message || "Unknown GraphQL error";
          return toast.error(`Error placing order: ${errorMessage}`);
        } else {
          return toast.error("Error placing order: Unknown error occurred.");
        }
      } else {
        return toast.error("Something went wrong!");
      }
    }
  };
  return (
    <AnimatePresence key={"cartAnnimation"}>
      {isVisible && (
        <>
          <motion.div
            data-testid="cart-overlay"
            onClick={discardCart}
            className="fixed w-full h-full left-0 z-[90] top-[5rem] bg-[#39374838]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          ></motion.div>
          <motion.div
            className="absolute z-[100] max-h-[39.375rem] top-[3.5rem] py-8 px-4 flex flex-col justify-between items-start right-0 bg-white w-[20.313rem] "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <div className="w-full flex flex-col gap-y-8 max-h-[39.25rem]">
              <h1 className="text-[#1D1F22] font-semibold">
                My Bag,{" "}
                <span className="font-[500]">
                  {cart.itemsQuantity}{" "}
                  {cart.itemsQuantity > 1 ? "items" : "item"}
                </span>
              </h1>
              <div className="min-h-[8rem] max-h-[24rem] flex flex-col gap-y-[2.5rem] overflow-y-scroll">
                {cart.products.map((product) => (
                  <div
                    key={product.key}
                    className="w-full flex  items-start justify-center gap-x-2"
                  >
                    <div className="w-[10.25rem] min-h-[10.75rem] h-full flex items-start">
                      <div className="w-full h-full flex flex-col gap-y-2">
                        <div className="flex flex-col items-start gap-y-1">
                          <h1 className="text-lg text-[#1D1F22]">
                            {product.product.name}
                          </h1>
                          <p className="text-[#1D1F22] font-[500]">
                            {formatPrice(product.product.prices[0])}
                          </p>
                        </div>
                        {product.product.attributes.map((attribute) =>
                          attribute.type === "swatch" ? (
                            <div
                              data-testid={`cart-item-attribute-${attribute.name
                                .replace(/\s+/g, "-")
                                .toLowerCase()}`}
                              key={attribute.id}
                              className="flex flex-col items-start gap-y-1"
                            >
                              <h3 className="text-[#1D1F22] w-full text-nowrap text-ellipsis overflow-hidden">
                                {attribute.name}:
                              </h3>

                              <div className="w-full flex justify-start items-end flex-wrap gap-y-2 gap-x-2">
                                {attribute.items.map((item) => (
                                  <div
                                    key={item.id}
                                    className={`w-5 h-5 ${
                                      product.selectedAttributes.some(
                                        (selected_attribute) =>
                                          selected_attribute.id ===
                                            attribute.id &&
                                          selected_attribute.value ===
                                            item.value
                                      ) && "border-[#5ECE7B] border-[1px]"
                                    } p-[1px]  flex justify-center items-center`}
                                  >
                                    <button
                                      data-testid={`cart-item-attribute-${attribute.name
                                        .replace(/\s+/g, "-")
                                        .toLowerCase()}-${item.displayValue.replace(
                                        /\s+/g,
                                        "-"
                                      )}${
                                        product.selectedAttributes.some(
                                          (selected_attribute) =>
                                            selected_attribute.id ===
                                              attribute.id &&
                                            selected_attribute.value ===
                                              item.value
                                        )
                                          ? "-selected"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        changeSelectedAttributes(
                                          product.key,
                                          attribute.id,
                                          item.id
                                        );
                                      }}
                                      style={{ backgroundColor: item.value }}
                                      className="w-full h-full"
                                    ></button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div
                              data-testid={`cart-item-attribute-${attribute.name
                                .replace(/\s+/g, "-")
                                .toLowerCase()}`}
                              key={attribute.id}
                              className="flex flex-col items-start gap-y-1"
                            >
                              <h3 className="text-[#1D1F22]">
                                {attribute.name}:
                              </h3>
                              <div className="w-full flex flex-wrap justify-start items-end gap-x-2 gap-y-2">
                                {attribute.items.map((item) => (
                                  <button
                                    data-testid={`cart-item-attribute-${attribute.name
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()}-${item.displayValue.replace(
                                      /\s+/g,
                                      "-"
                                    )}${
                                      product.selectedAttributes.some(
                                        (selected_attribute) =>
                                          selected_attribute.id ===
                                            attribute.id &&
                                          selected_attribute.value ===
                                            item.value
                                      )
                                        ? "-selected"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      changeSelectedAttributes(
                                        product.key,
                                        attribute.id,
                                        item.value
                                      );
                                    }}
                                    key={item.id}
                                    className={`min-w-6  font-[500]  min-h-6 border-[1px] flex justify-center px-1 text-[12px] items-center border-[#1D1F22]  ${
                                      product.selectedAttributes.some(
                                        (selected_attribute) =>
                                          selected_attribute.id ===
                                            attribute.id &&
                                          selected_attribute.value ===
                                            item.value
                                      )
                                        ? "text-white bg-[#1D1F22]"
                                        : "text-[#1D1F22]"
                                    }`}
                                  >
                                    {item.displayValue}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                      <div className="w-6 min-h-[10.75rem] h-full flex justify-between items-center flex-col">
                        <button
                          data-testid="cart-item-amount-increase"
                          onClick={() => {
                            addToCart(
                              product.key,
                              product.product,
                              product.selectedAttributes,
                              product.currency,
                              product.product.prices[0].amount // should be based on location i guess but hardcoding it for now cause there is no specifications
                            );
                          }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_92234_46)">
                              <path
                                d="M12 8V16"
                                stroke="#1D1F22"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8 12H16"
                                stroke="#1D1F22"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <rect
                                x="0.5"
                                y="0.5"
                                width="23"
                                height="23"
                                stroke="#1D1F22"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_92234_46">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                        <span data-testid="cart-item-amount">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => {
                            removeFromCart(product.key);
                          }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="0.5"
                              y="0.5"
                              width="23"
                              height="23"
                              stroke="#1D1F22"
                            />
                            <path
                              d="M8 12H16"
                              stroke="#1D1F22"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="min-h-[10.75rem] h-full flex justify-center items-start">
                      <div className="w-[7.5rem] h-[10.75rem]">
                        <img
                          src={product.product.gallery[0]}
                          className="w-full h-full object-contain bg-transparent"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="">
                <div className="flex justify-between items-center">
                  <h1 className="font-[500]">Total</h1>
                  <h1 className="font-[700]">
                    {formatPrice({
                      amount: cart.totalAmount,
                      currency: cart.currecny as ICurrency,
                    })}
                  </h1>
                </div>
              </div>
            </div>
            <button
              onClick={placeOrderHandler}
              disabled={cart.itemsQuantity === 0 || loading}
              className={`mt-8 text-[14px] text-white font-semibold w-full flex justify-center items-center h-[2.5rem]  ${
                cart.itemsQuantity === 0 ? "bg-gray-300" : "bg-[#5ECE7B]"
              } `}
            >
              {loading ? (
                <div className="text-white flex justify-center items-center w-4 h-4">
                  <LoadingSpinner />
                </div>
              ) : (
                "PLACE ORDER"
              )}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
