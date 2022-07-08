import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialUserState = {
    displayName: '',
    email: '',
    photoURL: '',
    emailVerified: '',
    uid: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialUserState,
    reducers: {
        addUserData: (state, action) => {
            return { ...action.payload, ...state }
        },
        removeUserData: (state) => {
            return initialUserState
        }
    }
})

export const { addUserData, removeUserData } = authSlice.actions

export const store = configureStore({
    reducer: authSlice.reducer
})
