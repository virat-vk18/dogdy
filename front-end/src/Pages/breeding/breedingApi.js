import { api } from "../../app/service/api";
const token = localStorage.getItem("token");
const breedingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllDogs: builder.query({
      query: () => ({
        url: "user/studfarm",
        method: "GET",
      }),
      provideTags: ["Todos"],
    }),
    getStudDogs: builder.query({
      query: (id) => ({
        url: "user/studfarm/studget",
        params: id,
      }),
      provideTags: ["Todos"],
    }),
    getFemaleDogs: builder.query({
      query: () => ({
        url: "user/selldogs/femaledog",
      }),
      provideTags: ["Todos"],
    }),
    femaleDogsBreeding: builder.mutation({
      query: () => ({
        url: "user/selldogs/breedfemale",
        method: "POST",
      }),
      provideTags: ["Todos"],
    }),
    femaleDog: builder.mutation({
      query: (id) => ({
        url: "user/selldogs/uniquefemale",
        method: "POST",
        body: id,
      }),
      provideTags: ["Todos"],
    }),
    expiryDog: builder.mutation({
      query: (body) => ({
        url: "user/selldogs/expiry",
        method: "POST",
        body,
      }),
      provideTags: ["Todos"],
    }),
    getTimeManagement: builder.mutation({
      query: (formData) => ({
        url: "/admin/breeding/getTime/waitForBreed",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Todos"],
    }),
    onBreeding: builder.mutation({
      query: (body) => ({
        url: "/user/breeding/onbreeding",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Todos"],
    }),
    getTimeForBreed: builder.mutation({
      query: (formData) => ({
        url: "/admin/breeding/getTime/waitForBreed/getTime",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Todos"],
    }),
    completedBreed: builder.mutation({
      query: (formData) => ({
        url: "/admin/breeding/completedBreed",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetAllDogsQuery,
  useGetStudDogsQuery,
  useGetFemaleDogsQuery,
  useFemaleDogsBreedingMutation,
  useFemaleDogMutation,
  useExpiryDogMutation,
  useGetTimeManagementMutation,
  useOnBreedingMutation,
  useGetTimeForBreedMutation,
  useCompletedBreedMutation,
} = breedingApi;
