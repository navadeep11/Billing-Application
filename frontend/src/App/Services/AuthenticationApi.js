import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AuthApi = createApi({
  reducerPath: 'Auth',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:4000/',
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
        credentials: "include", 
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
