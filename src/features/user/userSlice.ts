import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {BirthDate, User} from "./types.ts";

const getInitialState = (): User => {
    try {
        const savedUser = localStorage.getItem("user")
        return savedUser ? JSON.parse(savedUser) : {email: "", code: "", name: "", birthDate: {day: 0, month: {name: "", order: 0}, year: 0}}
    } catch (error) {
        console.log("Ошибка получения из localStorage:", error)
        return {email: "", code: "", name: "", birthDate: {day: 0, month: {name: "", order: 0}, year: 0}}
    }
}
export const userSlice = createSlice({
    name: "user",
    initialState: getInitialState,
    reducers: {
        saveUser: (state: User, action: PayloadAction<User>): void => {
            state.email = action.payload.email
            state.code = action.payload.code
            localStorage.setItem("user", JSON.stringify(state))
        },
        deleteUser: (state: User): void => {
            state.email = ""
            state.code = ""
            localStorage.setItem("user", JSON.stringify(state))
        },
        changeUserName: (state: User, action: PayloadAction<string>): void => {
            state.name = action.payload
            localStorage.setItem("user", JSON.stringify(state))
        },
        saveUserBirthDate: (state: User, action: PayloadAction<BirthDate>): void => {
            state.birthDate = action.payload
            localStorage.setItem("user", JSON.stringify(state))
        }
    }
})
export const {saveUser, deleteUser, changeUserName, saveUserBirthDate
} = userSlice.actions;
export default userSlice.reducer;