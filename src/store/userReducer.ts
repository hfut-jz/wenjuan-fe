import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type UserStateType={
    username:string,
    nickname:string,
}

const INITIAL_STATE:UserStateType={
    username:'',
    nickname:'',
}

export const userSlice=createSlice(
    {
        name:'user',
        initialState:INITIAL_STATE,
        reducers:{
            loginReducer(state:UserStateType,action:PayloadAction<UserStateType>){
                return action.payload
            },
            logoutReducer(){
                return INITIAL_STATE
            }
        }
    }

)
export const {loginReducer,logoutReducer}=userSlice.actions
export default userSlice.reducer