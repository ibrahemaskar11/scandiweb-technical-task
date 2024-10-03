import { Store } from "@/types/store";
import { create } from "zustand";

const useStore = create<Store>((set) => ({
  categories: [],
  cartToggle: false,
  cart: {
    itemsQuantity: 0,
    products: [],
    totalAmount: 0,
    currecny: null,
  },
  toggleCart: () => {
    set((state) => {
      return {
        ...StaticRange,
        cartToggle: !state.cartToggle,
      };
    });
  },
  initializeCart: (cart) => {
    set((state) => {
      return {
        ...state,
        cart,
      };
    });
  },
  initializeCategories: (categories) =>
    set((state) => ({
      categories,
    })),
  addToCart: (key, product, selectedAttributes, currency, amount) => {
    set((state) => {
      const existingItemIndex = state.cart.products.findIndex(
        (item) => item.key === key
      );

      if (existingItemIndex !== -1) {
        const updatedCartItems = [...state.cart.products];
        updatedCartItems[existingItemIndex].quantity += 1;

        return {
          cartToggle: true,
          cart: {
            ...state.cart,
            itemsQuantity: state.cart.itemsQuantity + 1,
            products: updatedCartItems,
            totalAmount:
              Math.round(
                (state.cart.totalAmount + product.prices[0].amount) * 100
              ) / 100,
            currecny: product.prices[0].currency,
          },
        };
      } else {
        return {
          cartToggle: true,
          cart: {
            ...state.cart,
            itemsQuantity: state.cart.itemsQuantity + 1,
            totalAmount:
              Math.round(
                (state.cart.totalAmount + product.prices[0].amount) * 100
              ) / 100,
            currecny: state.cart.currecny || product.prices[0].currency,
            products: [
              ...state.cart.products,
              {
                selectedAttributes,
                quantity: 1,
                key,
                product,
                amount,
                currency,
              },
            ],
          },
        };
      }
    });
  },
  removeFromCart: (key) => {
    set((state) => {
      const existingItemIndex = state.cart.products.findIndex(
        (item) => item.key === key
      );

      if (existingItemIndex !== -1) {
        const updatedCartItems = [...state.cart.products];
        const itemToRemove = updatedCartItems[existingItemIndex];

        if (itemToRemove.quantity > 1) {
          itemToRemove.quantity -= 1;
          return {
            cart: {
              ...state.cart,
              itemsQuantity: state.cart.itemsQuantity - 1,
              totalAmount:
                Math.round(
                  (state.cart.totalAmount -
                    state.cart.products[existingItemIndex].product.prices[0]
                      .amount) *
                    100
                ) / 100,
              products: updatedCartItems,
            },
          };
        } else {
          updatedCartItems.splice(existingItemIndex, 1);
          return {
            cart: {
              ...state.cart,
              itemsQuantity: state.cart.itemsQuantity - 1,
              totalAmount:
                Math.round(
                  (state.cart.totalAmount -
                    state.cart.products[existingItemIndex].product.prices[0]
                      .amount) *
                    100
                ) / 100,
              products: updatedCartItems,
            },
          };
        }
      }
      return state;
    });
  },
  changeSelectedAttributes: (
    key: string,
    selectedAttributeId: string,
    selectedAttributeItemValue: string
  ) => {
    set((state) => {
      const updatedCartItems = [...state.cart.products];

      const existingItemIndex = updatedCartItems.findIndex(
        (item) => item.key === key
      );

      if (existingItemIndex !== -1) {
        const itemToUpdate = updatedCartItems[existingItemIndex];

        const attributeIndex = itemToUpdate.selectedAttributes.findIndex(
          (attr) => attr.id === selectedAttributeId
        );

        if (attributeIndex !== -1) {
          itemToUpdate.selectedAttributes[attributeIndex].value =
            selectedAttributeItemValue;
        }

        const sortedSelectedAttributes = [
          ...itemToUpdate.selectedAttributes,
        ].sort((a, b) => a.id.localeCompare(b.id));

        let newKey = `${itemToUpdate.product.id}`;
        sortedSelectedAttributes.forEach((attribute) => {
          newKey += `-${attribute.id}_${attribute.value}`;
        });

        const existingNewKeyIndex = updatedCartItems.findIndex(
          (item) => item.key === newKey
        );
        if (existingNewKeyIndex !== -1) {
          updatedCartItems[existingNewKeyIndex].quantity +=
            itemToUpdate.quantity;
          updatedCartItems.splice(existingItemIndex, 1);
        } else {
          itemToUpdate.key = newKey;
        }

        return {
          cart: {
            ...state.cart,
            products: updatedCartItems,
          },
        };
      }

      return state;
    });
  },
  emptyCart: () => {
    set((state) => ({
      cart: {
        itemsQuantity: 0,
        products: [],
        totalAmount: 0,
        currecny: null,
      },
    }));
  },
}));

export default useStore;
