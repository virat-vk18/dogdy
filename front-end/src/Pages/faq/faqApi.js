import { api } from "../../app/service/api";
const token = JSON.parse(localStorage.getItem("token"));

const faqApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFAQDatas: builder.mutation({
      query: (body) => ({
        headers: {
          authorization: `Bearer ${token}`,
        },
        url: "user/faq/getData",
        method: "POST",
        body,
      }),
      invalidatesTags: ["StopOrder"],
    }),
  }),
});
export const { useGetFAQDatasMutation } = faqApi;
