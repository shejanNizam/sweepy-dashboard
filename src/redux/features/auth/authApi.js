// import { baseApi } from "../api/baseApi";

import baseApi from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 01. login
    login: builder.mutation({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),

    // 02. forgot password
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          url: `/auth/forgot`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 03. verify email
    verifyEmail: builder.mutation({
      query: ({ userId, code }) => {
        return {
          url: `otp/verify`,
          method: "POST",
          // headers: { Authorization: `Bearer ${token}` },
          body: { code, userId },
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 04. reset password
    resetPassword: builder.mutation({
      query: ({ token, password }) => {
        return {
          url: `auth/password/forget`,
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: { password: password },
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 05. resend otp
    resendOtp: builder.query({
      query: (id) => ({
        url: `/otp/resend?userId=${id}`,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),

    // 10. logout
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  // useResendOtpQuery,
  useLazyResendOtpQuery,
  useLogoutMutation,
} = authApi;
