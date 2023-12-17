import { api } from '../../../../app/service/api'

const copyRight = api.injectEndpoints({
  endpoints: (builder) => ({
    getCopyRight: builder.mutation({
      query: (body) => ({
        url: 'admin/siteSettings/getcopyright',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
    handleSubmitCopyRight: builder.mutation({
      query: (body) => ({
        url: 'admin/siteSettings/copyright',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
})

export const { useHandleSubmitCopyRightMutation, useGetCopyRightMutation } = copyRight
