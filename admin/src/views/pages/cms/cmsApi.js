import { api } from '../../../app/service/api'

const cmsEditorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    handleCMSGetAboutUsData: builder.query({
      query: () => ({ url: `admin/cmsUpdate/aboutUsGetData` }),
      providesTags: ['Admin'],
    }),
    handleCMSUpdateAboutUs: builder.mutation({
      query: (body) => ({
        url: 'admin/cmsUpdate/aboutUsUpdate',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
    // terms And Conditions
    handleCMSGetTermsAndConditionsData: builder.query({
      query: () => ({ url: `admin/cmsUpdate/termsAndConditionsGetData` }),
      providesTags: ['Admin'],
    }),
    handleCMSTermsAndConditios: builder.mutation({
      query: (body) => ({
        url: 'admin/cmsUpdate/termsAndConditions',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
    // privacyPolicy
    handleCMSGetPrivacyPolicyData: builder.query({
      query: () => ({ url: `admin/cmsUpdate/privacyPolicyGetData` }),
      providesTags: ['StopOrder'],
    }),
    handleCMSPrivacyPolicyUpdate: builder.mutation({
      query: (body) => ({
        url: 'admin/cmsUpdate/privacyPolicyUpdate',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
})

export const {
  useHandleCMSUpdateAboutUsMutation,
  useHandleCMSTermsAndConditiosMutation,
  useHandleCMSGetAboutUsDataQuery,
  useHandleCMSGetTermsAndConditionsDataQuery,
  useHandleCMSPrivacyPolicyUpdateMutation,
  useHandleCMSGetPrivacyPolicyDataQuery,
} = cmsEditorApi
