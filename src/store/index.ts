import {configureStore} from "@reduxjs/toolkit";
import userReducer,{UserStateType} from './userReducer'
import componentsReducer,{ComponentsStateType} from "./componentsReducer";
import pageInfoReducer,{PageInfoType} from "./pageInfoReducer";
export type StateType={
    user:UserStateType
    components:ComponentsStateType
    pageInfo:PageInfoType
    //中转站，进行各种各样的导入
}

export default configureStore({
    //这里的信息由reducer进行管理
    reducer:{
        user: userReducer,
        //这里对组件列表进行集中展示
        components: componentsReducer,
        //问卷的信息

        pageInfo: pageInfoReducer,
    }
})