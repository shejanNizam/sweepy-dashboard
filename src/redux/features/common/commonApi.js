import baseApi from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // DashboardHome page
    getStatistics: builder.query({
      query: (year) => ({
        url: `/profiles/statistics?year=${year}`,
        method: "GET",
      }),
      providesTags: ["common"],
    }),
    getAllSummary: builder.query({
      query: () => ({
        url: `/admin/dashboard/summery`,
        method: "GET",
      }),
      providesTags: ["common"],
    }),
    getAllMapSummary: builder.query({
      query: () => ({
        url: `/admin/dashboard/map-user`,
        method: "GET",
      }),
      providesTags: ["common"],
    }),
    getAllUserEarning: builder.query({
      query: ({ year }) => ({
        url: `/admin/dashboard/earning-chart?yearly=${year}`,
        method: "GET",
      }),
      providesTags: ["common"],
    }),
    getTotalUserSummary: builder.query({
      query: ({ year }) => ({
        url: `/admin/dashboard/user-chart?yearly=${year}`,
        method: "GET",
      }),
      providesTags: ["common"],
    }),
    getTotalPropertySummary: builder.query({
      query: ({ search, limit, page }) => ({
        url: `/admin/dashboard/product-chart?searchQ=${search}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["common"],
    }),

    getCategory: builder.query({
      query: ({ search }) => ({
        url: `/admin/get-category?name=${search}`,
        method: "GET",
      }),
      providesTags: ["common"],
    }),

    // Earning in DashboardHome page
    getEarnings: builder.query({
      query: (year) => ({
        url: `/payments/chart?year=${year}`,
        method: "GET",
        // headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["common"],
    }),

    // client page
    getAllClient: builder.query({
      query: ({ page = 1, limit = 10, name, date }) => ({
        url: "/users",
        method: "GET",
        params: {
          page,
          limit,
          name,
          date,
        },
      }),
      providesTags: ["common"],
    }),
    // all beautician
    getAllBeauticians: builder.query({
      query: ({ status, page = 1, limit = 10, name, date }) => ({
        url: `/profiles/all?status=${status}`,
        method: "GET",
        params: {
          page,
          limit,
          name,
          date,
        },
      }),
      providesTags: ["common"],
    }),
    // get beautician by id
    getBeauticianById: builder.query({
      query: (profileId) => ({
        url: `profiles/${profileId}`,
        method: "GET",
      }),
      providesTags: ["common"],
    }),

    //  approved beautician
    approvedBeautician: builder.mutation({
      query: ({ id }) => ({
        url: `/profiles/${id}`,
        method: "PUT",
      }),
    }),

    // get all category
    getAllCategory: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/categories",
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["category"],
    }),
    // get all Advertisements
    getAllAdvertisements: builder.query({
      query: () => ({
        url: "/admin/get-advertisements",
        method: "GET",
      }),
      providesTags: ["advertisements"],
    }),
    // get all earnings
    getAllEarnings: builder.query({
      query: () => ({
        url: "/admin/earning-history",
        method: "GET",
      }),
      providesTags: ["earnings"],
    }),

    // get all suggestion
    getAllSuggestion: builder.query({
      query: () => ({
        url: "/support",
        method: "GET",
      }),
      providesTags: ["suggestion"],
    }),

    // get all assistant
    getAllAssistant: builder.query({
      query: () => ({
        url: "/admin/get-assistants",
        method: "GET",
      }),
      providesTags: ["assistant"],
    }),

    // get about us
    getAboutUs: builder.query({
      query: () => ({
        url: "/about",
        method: "GET",
      }),
      providesTags: ["about"],
    }),

    // get terms
    getTerms: builder.query({
      query: () => ({
        url: "/terms",
        method: "GET",
      }),
      providesTags: ["terms"],
    }),
    // get privacy
    getPrivacy: builder.query({
      query: () => ({
        url: "/privacy",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),
    // get notifications
    getAllNotification: builder.query({
      query: () => ({
        url: "/notification",
        method: "GET",
      }),
      providesTags: ["notification"],
    }),
    // get notifications badge
    getBadgeNotification: builder.query({
      query: () => ({
        url: "/notification/badge-count",
        method: "GET",
      }),
      providesTags: ["notification"],
    }),
    // get my profile
    getMyProfile: builder.query({
      query: () => ({
        url: "/auth/my-profile",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    //  add category
    addCategory: builder.mutation({
      query: (addCategoryData) => ({
        url: "/categories",
        method: "POST",
        body: addCategoryData,
      }),
      invalidatesTags: ["category"],
    }),

    //  edit category
    editCategory: builder.mutation({
      query: ({ categoryId, editCategoryData }) => ({
        url: `/categories/${categoryId}`,
        method: "PUT",
        body: editCategoryData,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetStatisticsQuery,
  useGetEarningsQuery,
  useGetTotalUserSummaryQuery,
  useGetAllClientQuery,
  useGetAllBeauticiansQuery,
  useGetBeauticianByIdQuery,
  useApprovedBeauticianMutation,
  useGetAllCategoryQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useGetAllSummaryQuery,
  useGetAllMapSummaryQuery,
  useGetAllUserEarningQuery,
  useGetTotalPropertySummaryQuery,
  useGetCategoryQuery,
  useGetAllAdvertisementsQuery,
  useGetAllEarningsQuery,
  useGetAllSuggestionQuery,
  useGetAllAssistantQuery,
  useGetAboutUsQuery,
  useGetTermsQuery,
  useGetPrivacyQuery,
  useGetAllNotificationQuery,
  useGetBadgeNotificationQuery,
  useGetMyProfileQuery,
} = userApi;
