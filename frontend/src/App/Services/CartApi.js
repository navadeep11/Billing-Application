import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CartApi = createApi({
  reducerPath: 'Cart',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  endpoints: (build) => ({

    // 🛒 Add item to cart
    addToCart: build.mutation({
      query: (body) => ({
        url: 'addToCart',
        method: 'POST',
        body,
      }),
    }),

    // ➕ Increase quantity
    increaseQuantity: build.mutation({
      query: (body) => ({
        url: 'increaseQuantity',
        method: 'PUT',
        body,
      }),
    }),

    // ➖ Decrease quantity
    decreaseQuantity: build.mutation({
      query: (body) => ({
        url: 'decreaseQuantity',
        method: 'PUT',
        body,
      }),
    }),

    // ❌ Remove item from cart
    removeFromCart: build.mutation({
      query: (itemId) => ({
        url: `removeFromCart/${itemId}`,
        method: 'DELETE',
      }),
    }),

    // 📦 Get user's cart
    getCart: build.query({
      query: () => '/getCart',
    }),

  }),
});

export const {
  useAddToCartMutation,
  useIncreaseQuantityMutation,
  useDecreaseQuantityMutation,
  useRemoveFromCartMutation,
  useGetCartQuery,
} = CartApi;
