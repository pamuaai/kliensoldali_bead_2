import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

const tasksApiSlice = createApi({
    reducerPath: "tasksApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (build) => ({
        getAllTasks: build.query({
            query: () => ({ url: "tasks" }),
        }),
        getonetask: build.query({
            query: (taskId) => {
                return {
                    url: `authentication/${taskId}`,
                }
            }
        }),
        getSomeTasks: build.query({
            query: (offset, limit = 10) => ({ url: `tasks/?$skip=${offset}&$limit=${limit}` }),
        }),
        addTask: build.mutation({
            query: (body) => {
                return {
                    url: "users",
                    method: 'POST',
                    body
                }
            },
        }),
    }),
});

export const { useGetAllTasksQuery, useGetonetaskQuery, useGetSomeTasksQuery } = tasksApiSlice;

export default tasksApiSlice;
