import { api } from "../../app/service/api";

const createNft = api.injectEndpoints({
  endpoints: (builder) => ({
    nftCreate: builder.mutation({
      query: (createNft) => ({
        url: "/user/createnft",
        method: "POST",
        body: createNft,
      }),
      invalidatesTags: ["Todos"],
    }),
    sellCreate: builder.mutation({
      query: (formData) => ({
        url: "/user/createnft/sellcreation",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Todos"],
    }),
    studCreate: builder.mutation({
      query: (stud) => ({
        url: "/user/createnft/studcreation",
        method: "POST",
        body: stud,
      }),
      invalidatesTags: ["Todos"],
    }),
    getNft: builder.query({
      query: () => ({
        url: "/user/sellnft/marketplace",
      }),
      provideTags: ["Todos"],
    }),
    jwtAddress: builder.mutation({
      query: (body) => ({
        url: "/user/connectJwt/wallet",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Todos"],
    }),
    // loginUser: builder.mutation({
    //   query: (todo) => ({
    //     url: "/login",
    //     method: "POST",
    //     body: todo,
    //   }),
    //   invalidatesTags: ["Todos"],
    // }),

    // deleteUser: builder.mutation({
    //   query: (body) => ({
    //     url: "/register/deleteuser",
    //     method: "DELETE",
    //     body,
    //   }),
    //   invalidatesTags: ["Todos"],
    // }),
    // updateUser: builder.mutation({
    //   query: (body) => ({
    //     url: `register/edituser/`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["Todos"],
    // }),
    // submitUpdate: builder.mutation({
    //   query: ({ id, ...body }) => ({
    //     url: `register/${id}`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["Todos"],
    // }),
  }),
});

export const {
  useNftCreateMutation,
  useGetNftQuery,
  useJwtAddressMutation,
  useSellCreateMutation,
  useStudCreateMutation,
} = createNft;
