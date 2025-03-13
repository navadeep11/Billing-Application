import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AuthApi = createApi({
  reducerPath: 'Auth',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://billing-application-3vl7.onrender.com/' }),
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (body) => ({
        url: `signup`,
        method: 'POST',
        body,
        mode: "cors", 
      }),
    }),
    otpVerify: build.mutation({
      query: (body) => ({
        url: `verify-otp`,
        method: 'POST',
        body,
        mode: "cors", 
      }),
    }),
    signIn: build.mutation({
      query: (body) => ({
        url: `signin`,
        method: 'POST',
        body,
        mode: "cors",
      }),
    }),
    
  }),
});




// Auto-generated hooks
export const {
  useSignUpMutation,
  useOtpVerifyMutation,
  useSignInMutation,
} = AuthApi;
