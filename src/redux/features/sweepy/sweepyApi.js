import baseApi from "../../api/baseApi";

export const sweepyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // sweepy get api
    getAllSweepy: builder.query({
      query: ({ page = 1, limit = 10, name, status }) => ({
        url: `/admin/get-sweepstake`,
        method: "GET",
        params: {
          page,
          limit,
          name,
          status,
        },
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
    // lzkdgvon
  }),
});

export const { useGetAllSweepyQuery, useAddSweepyMutation } = sweepyApi;
