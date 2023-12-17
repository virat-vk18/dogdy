import { api } from '../../../app/service/api'
const token = localStorage.getItem('adminToken')
const twoFactorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    verfiyEmail: builder.mutation({
      query: (body) => ({
        url: '/admin/adminforgot/verifyemail',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
    forgotPattern: builder.mutation({
      query: (body) => ({
        url: '/admin/adminforgot/forgotpattern',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
    adminChangePassword: builder.mutation({
      query: (body) => ({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: '/admin/changepassword',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Admin'],
    }),
    loginTwoFactorVerify: builder.mutation({
      query: (body) => ({
        url: 'admin/adminforgot/loginTwoFactorVerify',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
    forgetPasswordVerifymail: builder.mutation({
      query: (body) => ({
        url: 'admin/adminforgot/verifyemailforgotpassword',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
    setNewPassword: builder.mutation({
      query: (body) => ({
        url: 'admin/adminforgot/setNewPassword',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
    oldPatternCheck: builder.mutation({
      query: (body) => ({
        url: 'admin/changepattern/verifyoldpattern',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
})

export const {
  useVerfiyEmailMutation,
  useForgotPatternMutation,
  useAdminChangePasswordMutation,
  useLoginTwoFactorVerifyMutation,
  useForgetPasswordVerifymailMutation,
  useSetNewPasswordMutation,
  useOldPatternCheckMutation,
} = twoFactorApi
