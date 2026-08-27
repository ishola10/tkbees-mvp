import { apiService } from "@/services";const authApiSlice = apiService.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        data,
      }),
    }),
  }),
});
export const { useLoginMutation } = authApiSlice;
