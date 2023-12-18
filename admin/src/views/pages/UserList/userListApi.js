import { api } from "../../../app/service/api";

const socialmediaApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserList: builder.query({
      query: () => ({
        url: "admin/userlist/users",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    // handleSiteSettinsURLUpdate: builder.mutation({
    //   query: (body) => ({
    //     url: "admin/siteSettings/URLUpdates",
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["Admin"],
    // }),
  }),
});

export const { useGetUserListQuery } = socialmediaApi;
