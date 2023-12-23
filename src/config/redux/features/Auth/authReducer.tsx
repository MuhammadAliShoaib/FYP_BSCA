import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";
export const userlogin = createAsyncThunk(
    "auth/userlogin",
    async (data: any, thunkAPI) => {
        try {
            let response = await axios.post(`/api/login`, { address: data })
            console.log(response.data)
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
                return response.data
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response)
        }
    }
)