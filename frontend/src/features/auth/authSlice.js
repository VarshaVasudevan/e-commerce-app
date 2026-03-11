import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user=authService.geCurrentUser();

const initialState={
    user: user? user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const register=createAsyncThunk(
    'auth/register',async({name,email,password}, thunkAPI) => {
        try{

            return authService.register({name,email,password});
        }
        catch(error){
            const messaage=error.response?.data?.message;
            return thunkAPI.rejectWithValue(messaage);

        }
    }
)

export const login=createAsyncThunk(
    'auth/login',async({username,password}, thunkAPI) => {
        try{

            return authService.login({username,password});
        }
        catch(error){
            const messaage=error.response?.data?.message;
            return thunkAPI.rejectWithValue(messaage);

        }
    }
)

export const logout=createAsyncThunk(
    'auth/logout',async() => {
        await authService.logout();
    }
)

export const getProfile=createAsyncThunk(
    'auth/getProfile',async(_, thunkAPI) => {
    }
)