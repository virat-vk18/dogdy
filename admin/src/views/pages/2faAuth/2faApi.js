import { api } from '../../../app/service/api'

const twoFactorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTwoFactorAuthentication: builder.mutation({
      query: (body) => ({
        url: '/admin/admin2fa/login/twoFactorGetCode',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
    twoFactorVerify: builder.mutation({
      query: (body) => ({
        url: 'admin/admin2fa/login/twoFactorVerify',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
    disableTwoFactorVerify: builder.mutation({
      query: (body) => ({
        url: 'admin/admin2fa/login/disableTwoFactor',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
})

export const {
  useGetTwoFactorAuthenticationMutation,
  useTwoFactorVerifyMutation,
  useDisableTwoFactorVerifyMutation,
} = twoFactorApi
