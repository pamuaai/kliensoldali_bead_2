import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

const taskListsApiSlice = createApi({
    reducerPath: "taskListsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (build) => ({
        getAllTaskLists: build.query({
            query: () => ({ url: "tasklists?$limit=50" }),
        }),
        getOneTaskList: build.query({
            query: (taskListId) => {
                return {
                    url: `tasklists/${taskListId}`,
                }
            }
        }),
        addTaskList: build.mutation({
            query: (body) => {
                return {
                    url: "taskLists",
                    method: 'POST',
                    body
                }
            },
        }),
        modifyTaskList: build.mutation({
            query: (body) => {
                return {
                    url: `taskLists/${body.id}`,
                    method: 'PATCH',
                    body
                }
            },
        }),
    }),
});

export const { useGetAllTaskListsQuery, useAddTaskListMutation, useModifyTaskListMutation } = taskListsApiSlice;

export default taskListsApiSlice;
