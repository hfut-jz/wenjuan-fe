import {configureStore} from "@reduxjs/toolkit";
import userReducer,{UserStateType} from './userReducer'
import componentsReducer,{ComponentsStateType} from "./componentsReducer";
import pageInfoReducer,{PageInfoType} from "./pageInfoReducer";
import undoable,{excludeAction,StateWithHistory} from 'redux-undo'

export type StateType={
    user:UserStateType
    components:StateWithHistory<ComponentsStateType>
    pageInfo:PageInfoType
    //中转站，进行各种各样的导入
}

export default configureStore({
    //这里的信息由reducer进行管理
    reducer:{
        user: userReducer,
        //这里对组件列表进行集中展示,增加undo:
        components: undoable(componentsReducer,{
            limit:20,
            filter:excludeAction([
                'components/resetComponents',
                'components/changeSelected',
                'components/selectNextComponent',
                'components/selectPrevComponent'
            ])
}) ,
        //问卷的信息

        pageInfo: pageInfoReducer,
    }
})