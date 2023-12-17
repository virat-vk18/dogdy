import { api } from '../../../app/service/api'

const breedingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (body) => ({
        url: 'admin/adminlogin',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
    // sellCreate: builder.mutation({
    //   query: (formData) => ({
    //     url: "createnft/sellcreation",
    //     method: "POST",
    //     body: formData,
    //   }),
    //   invalidatesTags: ["Todos"],
    // }),
  }),
})

export const { useAdminLoginMutation } = breedingApi
