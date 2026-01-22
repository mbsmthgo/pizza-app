import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {User} from "./types.ts";

const getInitialState = () => {
    const loadFromStorage = (): User => {
        try {
            const savedUser = localStorage.getItem("user")
            return savedUser && JSON.parse(savedUser)
        } catch (error) {
            console.log("Ошибка получения из localStorage:", error)
            return {email: "", code: ""}
        }
    }
    return loadFromStorage()
}
export const userSlice = createSlice({
    name: "user",
    initialState: getInitialState,
    reducers: {
        saveUser: (state: User, action: PayloadAction<User>) => {
            state = action.payload
            localStorage.setItem("user", JSON.stringify(state))
        }
    }
})
export const {saveUser} = userSlice.actions;
export default userSlice.reducer;