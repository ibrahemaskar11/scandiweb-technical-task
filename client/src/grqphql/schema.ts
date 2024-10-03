import { gql } from "@apollo/client";

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      name
    }
  }
`;

export const PRODUCTS_QUERY = gql`
  query Products($category: String) {
    products(category: $category) {
      id
      name
      inStock
      gallery
      category
      description
      attributes {
        id
        items {
          displayValue
          value
          id
          attribute_id
        }
        name
        type
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      brand
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query Product($productId: String!) {
    product(id: $productId) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        items {
          displayValue
          value
          id
          attribute_id
        }
        name
        type
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      brand
    }
  }
`;

export const CATEGORIES_PRODUCTS_QUERY = gql`
  query ($category: String) {
    categories {
      name
    }
    products(category: $category) {
      id
      name
      inStock
      gallery
      category
      description
      attributes {
        id
        items {
          displayValue
          value
          id
          attribute_id
        }
        name
        type
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      brand
    }
  }
`;

export const PLACE_ORDER_MUTATION = gql`
  mutation placeOrder($input: OrderInput!) {
    placeOrder(OrderInput: $input) {
      message
      order
    }
  }
`;
