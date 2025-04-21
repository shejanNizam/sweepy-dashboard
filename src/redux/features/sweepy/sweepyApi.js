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
      providesTags: ["common"],
    }),

    // lzkdgvon
  }),
});

export const { useGetAllSweepyQuery } = sweepyApi;
