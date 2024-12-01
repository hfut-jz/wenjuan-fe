import React from "react";
import {createBrowserRouter} from "react-router-dom";

import MainLayout from "../Layouts/MainLayout";
import ManageLayout from "../Layouts/ManageLayout";
import QuestionLayout from "../Layouts/QuestionLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import List from "../pages/manage/List";
import Trash from "../pages/manage/Trash";
import Star from "../pages/manage/Star";
import Edit from "../pages/question/Edit";
import Stat from "../pages/question/Stat";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {path: '/', element: <Home/>},
            {path: '/login', element: <Login/>},
            {path: '/register', element: <Register/>},
            {
                path: 'manage', element: <ManageLayout/>,
                children: [{path: 'list', element: <List/>},
                    {path: 'trash', element: <Trash/>},
                    {path: 'star', element: <Star/>}]
            },
            {path: '*', element: <NotFound/>},
        ],
    },
    {
        path: 'question', element: <QuestionLayout/>,
        children: [
            {path: 'edit/:id', element: <Edit/>},
            {path: 'stat/:id', element: <Stat/>}
        ]
    },
])
export default router

export const LOGIN_PATH = '/login'
export const REGISTER_PATH = '/register'
export const HOME_PATH = '/'
export const MANAGE_LIST_PATH = '/manage/list'

export function isLoginOrRegisterPath(pathname: string) {
    if([LOGIN_PATH,REGISTER_PATH].includes(pathname)){
        return true
    }
    return false
}
export function isNoNeedUserInfo(pathname: string){
    if([LOGIN_PATH,REGISTER_PATH,HOME_PATH,MANAGE_LIST_PATH].includes(pathname)) return true
    return false
}