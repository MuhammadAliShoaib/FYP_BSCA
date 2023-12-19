import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { userlogin } from "./authReducer"
import type { RootState } from '../../store'
import { toast } from 'react-toastify'

interface AuthState {
    auth: { name: string, role: string },
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
}

const initialState: AuthState = {
    auth: { name: "", role: "" },
    isLoading: false,
    isSuccess: false,
    isError: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearState: () => initialState,
        clearData: state => {
            state.auth = { name: "", role: "" }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userlogin.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(userlogin.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.auth = action.payload
                console.log("success")
            })
            .addCase(userlogin.rejected, (state, action: PayloadAction<any>) => {
                toast.error(action.payload.data.non_field_errors[0], {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                })
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
            })
    }
})

export const { clearState, clearData } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.auth

export default authSlice.reducer