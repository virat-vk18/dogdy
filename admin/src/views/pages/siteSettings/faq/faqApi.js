import { api } from '../../../../app/service/api'

const siteSettingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaqQuery: builder.mutation({
      query: (body) => ({
        url: 'admin/faq/getAllFaqData',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    handleCreateFAQ: builder.mutation({
      query: (body) => ({
        url: 'admin/faq/createFaq',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    getSingleFaqQueryData: builder.mutation({
      query: (body) => ({
        url: 'admin/faq/singleData',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    deleteFaqQueryData: builder.mutation({
      query: (body) => ({
        url: 'admin/faq/deleteFaqData',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
  }),
})

export const {
  useHandleCreateFAQMutation,
  useGetAllFaqQueryMutation,
  useGetSingleFaqQueryDataMutation,
  useDeleteFaqQueryDataMutation,
} = siteSettingsApi
