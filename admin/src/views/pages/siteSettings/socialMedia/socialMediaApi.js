import { api } from '../../../../app/service/api'

const socialmediaApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSiteSettingsURL: builder.mutation({
      query: (body) => ({
        url: 'admin/siteSettings/getURLData',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
    handleSiteSettinsURLUpdate: builder.mutation({
      query: (body) => ({
        url: 'admin/siteSettings/URLUpdates',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
})

export const { useHandleSiteSettinsURLUpdateMutation, useGetSiteSettingsURLMutation } =
  socialmediaApi
