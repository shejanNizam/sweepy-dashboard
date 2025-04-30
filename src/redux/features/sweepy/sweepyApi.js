import baseApi from "../../api/baseApi";

export const sweepyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // sweepy get api
    getAllSweepy: builder.query({
      query: ({ page = 1, limit = 10, search, status }) => ({
        url: `/admin/get-sweepstake`,
        method: "GET",
        params: {
          page,
          limit,
          name: search,
          status,
        },
      }),
      providesTags: ["sweepy"],
    }),
    getSweepyDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/details-sweepstake/${id}`,
        method: "GET",
      }),
      providesTags: ["sweepy"],
    }),

    addSweepy: builder.mutation({
      query: (data) => ({
        url: "/admin/add-sweepstake",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sweepy"],
    }),
    revelSweepy: builder.mutation({
      query: (id) => ({
        url: `/admin/revel-winners/${id}`,
        method: "POST",
        // body: data,
      }),
      invalidatesTags: ["sweepy"],
    }),
    // lzkdgvon
  }),
});

export const {
  useGetAllSweepyQuery,
  useGetSweepyDetailsQuery,
  useAddSweepyMutation,
  useRevelSweepyMutation,
} = sweepyApi;
