import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import Axios from "axios";
export const userlogin = createAsyncThunk(
    "auth/userlogin",
    async (data: any, thunkAPI) => {
        try {
            console.log("hello")
            let response = (
                await Axios.get(`/api/login`, { params: data })
            ).data
            console.log("response")
            if (response) {
                toast.success("Login has been successful!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                })
                return response
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response)
        }
    }
)