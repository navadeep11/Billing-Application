import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BillApi = createApi({
  reducerPath: 'Bill',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:4000/',
    credentials: 'include', 
  }),
  endpoints: (build) => ({

    // 🔹 Store Bill
    storeBill: build.mutation({
      query: (body) => ({
        url: 'storeBill',
        method: 'POST',
        body,
      }),
    }),

    // 🔹 Get All Bills for Current User
    getBills: build.query({
      query: () => 'getBills',
    }),
  }),
});

export const {
  useStoreBillMutation,
  useGetBillsQuery,
} = BillApi;
