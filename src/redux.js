import { configureStore, createSlice } from '@reduxjs/toolkit'

const apiSlice = createSlice({
    name: 'api',
    initialState: {},
    reducers: {
        addApiData: (state, action) => {
            return { ...state, ...action.payload }
        }
    }
})

export const { addApiData } = apiSlice.actions

export const store = configureStore({
    reducer: apiSlice.reducer
})
