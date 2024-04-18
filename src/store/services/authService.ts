import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as EP from '@/store/services/endpoint';
// import { useAppSelector } from '../store';

// const profile = useAppSelector((state) => state.auth.profile);
const authApi: any = createApi({
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: EP.Login,
        method: 'POST',
        // headers: {
        //   Authorization: `Bearer ${useAppSelector((state) => state.auth.profile.token)}`
        // },
        body
      })
    }),
    register: builder.mutation({
      query: (body) => ({
        url: EP.Register,
        method: 'POST',
        body
      })
    }),
    getUser: builder.query({
      query: () => '/auth/user'
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useGetUserQuery } = authApi;
export default authApi;
