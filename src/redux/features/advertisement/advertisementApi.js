import baseApi from "../../api/baseApi";

export const advertisementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all Advertisements
    createAdvertisement: builder.mutation({
      query: ({ data }) => ({
        url: `/admin/add-advertisement`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["advertisements"],
    }),
    getAllAdvertisements: builder.query({
      query: () => ({
        url: "/admin/get-advertisements",
        method: "GET",
      }),
      providesTags: ["advertisements"],
    }),
    editAdvertisement: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/edit-advertisement/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["advertisements"],
    }),
    deleteAdvertisement: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/delete-advertisement/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["advertisements"],
    }),
  }),
});

export const {
  useCreateAdvertisementMutation,
  useGetAllAdvertisementsQuery,
  useEditAdvertisementMutation,
  useDeleteAdvertisementMutation,
} = advertisementApi;
