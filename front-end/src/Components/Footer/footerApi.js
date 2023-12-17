import { api } from "../../app/service/api";

const siteSettingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSiteSettingsURL: builder.mutation({
      query: (body) => ({
        url: "admin/siteSettings/getURLData",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Todos"],
    }),
    handleSiteSettinsURLUpdate: builder.mutation({
      query: (body) => ({
        url: "admin/siteSettings/URLUpdates",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Todos"],
    }),
    getCopyRight: builder.mutation({
      query: (body) => ({
        url: "admin/siteSettings/getcopyright",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useHandleSiteSettinsURLUpdateMutation,
  useGetSiteSettingsURLMutation,
  useGetCopyRightMutation,
} = siteSettingsApi;
