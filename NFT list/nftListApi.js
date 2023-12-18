import { api } from "../../../app/service/api";
const nftList = api.injectEndpoints({
  endpoints: (builder) => ({
    getSellDogs: builder.mutation({
      query: () => ({
        url: "/user/selldogs/",
        method: "POST",
      }),
      invalidatesTags: ["Admin"],
    }),
    // getSellDogs: builder.query({
    //   query: () => ({
    //     url: '/user/selldogs',
    //     method: 'GET',
    //   }),
    //   provideTags: ['Todos'],
    // }),
    getStudDogs: builder.query({
      query: () => ({
        url: "user/studfarm",
        method: "GET",
      }),
      provideTags: ["Admin"],
    }),
    getNftBuyers: builder.query({
      query: () => ({
        url: "admin/nftbuyers/buyerslist",
        method: "GET",
      }),
      provideTags: ["Admin"],
    }),
  }),
});

export const {
  useGetSellDogsMutation,
  useGetStudDogsQuery,
  useGetNftBuyersQuery,
} = nftList;
