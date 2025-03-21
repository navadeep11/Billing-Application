import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AuthApi = createApi({
  reducerPath: 'Auth',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://billing-application-3vl7.onrender.com/',
    credentials: 'include', 
  }),
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
    otpVerify: build.mutation({
      query: (body) => ({
        url: 'verify-otp',
        method: 'POST',
        body,
      }),
    }),
    signIn: build.mutation({
      query: (body) => ({
        url: 'signin',
        method: 'POST',
        body,
      }),
    }),
    getUser: build.query({
      query: () => ({
        url: 'me',

      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
  }),
});

// Auto-generated hooks
export const {
  useSignUpMutation,
  useOtpVerifyMutation,
  useSignInMutation,
  useGetUserQuery,
  useLogoutMutation,
} = AuthApi;
