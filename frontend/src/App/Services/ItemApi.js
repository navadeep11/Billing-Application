import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ItemApi = createApi({
  reducerPath: 'Item',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:4000/',
    credentials: 'include', 
  }),
  endpoints: (build) => ({
    addCategory: build.mutation({
      query: (body) => ({
        url: 'addCategory',
        method: 'POST',
        body,
      }),
    }),

    getAllCategories: build.query({
      query: () => ({
        url: 'getAllCategories',
      }),
    }),

    addItem: build.mutation({
      query: (body) => ({
        url: 'addItem',
        method: 'POST',
        body,
      }),
    }),

    getAllItems: build.query({
      query: ({ search = "", category = "" }) => ({
        url: "getAllItems",
        method: "GET",
        params: { search, category },
      }),
    }),

    deleteItem: build.mutation({
      query: (id) => ({
        url: `items/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Auto-generated hooks
export const {
  useAddCategoryMutation,
  useGetAllCategoriesQuery,
  useAddItemMutation,
  useGetAllItemsQuery,
  useDeleteItemMutation,
} = ItemApi;
