import { api } from '../../../app/service/api'
const nftList = api.injectEndpoints({
  endpoints: (builder) => ({
    getSellDogs: builder.mutation({
      query: () => ({
        url: '/user/selldogs/',
        method: 'POST',
      }),
      invalidatesTags: ['Todos'],
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
        url: 'user/studfarm',
        method: 'GET',
      }),
      provideTags: ['Todos'],
    }),
  }),
})

export const { useGetSellDogsMutation, useGetStudDogsQuery } = nftList
