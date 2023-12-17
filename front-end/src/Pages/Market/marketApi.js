import { api } from "../../app/service/api";
const marketApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSellDogs: builder.mutation({
      query: () => ({
        url: "/user/selldogs/",
        method: "POST",
      }),
      invalidatesTags: ["Todos"],
    }),
    getMarketDogs: builder.mutation({
      query: (id) => ({
        url: "/user/selldogs/sellget",
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["Todos"],
    }),
    getsellSpecDogs: builder.query({
      query: (id) => ({
        url: "/user/selldogs/sellget",
        params: id,
      }),
      provideTags: ["Todos"],
    }),
    nftBuyerDetails: builder.mutation({
      query: (id) => ({
        url: "/user/selldogs/nftbuy",
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["Todos"],
    }),
    myStableDogs: builder.query({
      query: (id) => ({
        url: "/user/selldogs/stable",
        params: id,
      }),
      provideTags: ["Todos"],
    }),
    myDogDetailsPage: builder.mutation({
      query: (id) => ({
        url: "/user/dogdetails",
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetSellDogsMutation,
  useGetsellSpecDogsQuery,
  useGetMarketDogsMutation,
  useMyStableDogsQuery,
  useMyDogDetailsPageMutation,
  useNftBuyerDetailsMutation,
} = marketApi;
