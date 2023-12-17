import { api } from "../../app/service/api";

const cmsClientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    clientGetAboutUs: builder.query({
      query: () => ({ url: `admin/cmsUpdate/aboutUsGetData` }),
      providesTags: ["Todos"],
    }),
    // terms And Conditions
    clientGetTermsAndConditions: builder.query({
      query: () => ({ url: `admin/cmsUpdate/termsAndConditionsGetData` }),
      providesTags: ["Todos"],
    }),

    // privacyPolicy
    clientGetPrivacyPolicy: builder.query({
      query: () => ({ url: `admin/cmsUpdate/privacyPolicyGetData` }),
      providesTags: ["Todos"],
    }),
  }),
});

export const {
  useClientGetAboutUsQuery,
  useClientGetPrivacyPolicyQuery,
  useClientGetTermsAndConditionsQuery,
} = cmsClientApi;
