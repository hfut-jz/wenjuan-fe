import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {ComponentPropsType} from "../../components/QuestionComponents";
import {produce} from "immer";
import {getNextSelectedId, insertNewComponent} from "./utils";
import cloneDeep from 'lodash.clonedeep'
import {arrayMove} from "@dnd-kit/sortable";


//两种状态，一个存储的是组件本身的信息，一个存储的是组件在store中的信息
export type ComponentInfoType = {
    fe_id: string
    type: string
    title: string
    //这里必须是进行统一的，
    isHidden?: boolean,
    isLocked?:boolean
    props: ComponentPropsType
}
//由于redux中需要存储的是组件列表，在这里对其进行重新定义
export type ComponentsStateType = {
    selectedId: string,
    componentList: Array<ComponentInfoType>,
    copiedComponent:ComponentInfoType |null
}
const INIT_STATE: ComponentsStateType = {
    selectedId: '',
    componentList: [],
    copiedComponent:null
}

export const ComponentsSlice = createSlice({
    name: 'components',
    //这里的是标准化的操作
    initialState: INIT_STATE,
    reducers: {
        //在这里定义组件的增删改查
        //1.重置所有组件
        resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
            return action.payload
        },
        changeSelectedId: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                selectedId: action.payload,
            };
        },
        addComponents: produce((
            draft: ComponentsStateType,
            action: PayloadAction<ComponentInfoType>
        ) => {
            const newComponent = action.payload
            insertNewComponent(draft,newComponent)
        }),
        changeComponentProps: produce((
            draft: ComponentsStateType,
            action: PayloadAction<{ fe_id: string, newProps: ComponentPropsType }>
        ) => {
            const {fe_id, newProps} = action.payload
            const curComp = draft.componentList.find(c => c.fe_id === fe_id)
            if (curComp) {
                curComp.props = {
                    ...curComp.props,
                    ...newProps
                }
            }
        }),
        deleteComponentProps: produce((
            draft: ComponentsStateType
        ) => {
            const {selectedId: removedId, componentList = []} = draft
            //删除简单，直接
            const newSelectId = getNextSelectedId(removedId, componentList)
            draft.selectedId = newSelectId
            const index = componentList.findIndex(c => c.fe_id === removedId)
            componentList.splice(index, 1)
        }),
        hiddenComponentProps: produce((
            draft: ComponentsStateType,
            action: PayloadAction<{ fe_id: string, isHidden: boolean }>
        ) => {
            const {componentList=[]}=draft
            const {fe_id, isHidden} = action.payload
            //更新一下写法，对newSelectedId进行重新计算
            let newSelectedId=''
            if(isHidden){
                newSelectedId=getNextSelectedId(fe_id,componentList)
            }else{
                newSelectedId=fe_id
            }
            draft.selectedId=newSelectedId
            const curComp = draft.componentList.find(c => c.fe_id === fe_id)
            if (curComp) {
                curComp.isHidden = isHidden
            }
        }),
        lockedComponentProps:produce((
            draft:ComponentsStateType,
            action:PayloadAction<{fe_id: string}>
        )=>{
            const {fe_id}=action.payload
            const curComp=draft.componentList.find(c=>c.fe_id===fe_id)
           if(curComp){
               curComp.isLocked=!curComp.isLocked
           }

        }),
        copyComponentProps:produce((
            draft:ComponentsStateType
        )=>{
            const {selectedId}=draft
            const curComp=draft.componentList.find(c=>c.fe_id===selectedId)
            if(curComp){
                draft.copiedComponent= cloneDeep(curComp)
            }
        }),
        pasteComponentProps:produce((
            draft:ComponentsStateType
        )=>{
            const {copiedComponent}=draft
            if(copiedComponent==null)return
            copiedComponent.fe_id=nanoid()
            insertNewComponent(draft,copiedComponent )
        }),
        selectPrevComponent:produce((
            draft:ComponentsStateType
        )=>{
            const {selectedId,componentList}=draft
            const selectIndex=componentList.findIndex(c=>c.fe_id===selectedId)
            if(selectIndex<0)return
            if(selectIndex<=0)return
             draft.selectedId=componentList[selectIndex-1].fe_id
        }),
        selectNextComponent:produce((
            draft:ComponentsStateType
        )=>{
            const { selectedId, componentList } = draft
            const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

            if (selectedIndex < 0) return // 未选中组件
            if (selectedIndex+1===componentList.length) return // 已经选中了第一个，无法在向上选中

            draft.selectedId = componentList[selectedIndex + 1].fe_id
        }),
        changeSelectedTitle:produce((
            draft:ComponentsStateType,
            action:PayloadAction<{fe_id:string,title:string}>
        )=>{
            const {fe_id,title}=action.payload
            const curComp=draft.componentList.find(c=>c.fe_id===fe_id)
            if(curComp){
                curComp.title=title
            }
        }),
        //移动组件位置
        moveComponent:produce(
            (draft:ComponentsStateType,
                    action:PayloadAction<{oldIndex:number;newIndex:number}>)=>{
                    const {componentList:curComponentList}=draft
                    const {oldIndex,newIndex}=action.payload
                    draft.componentList=arrayMove(curComponentList,oldIndex,newIndex)
            }
        )
    }
})
export const {
    resetComponents,
    changeSelectedId,
    addComponents,
    changeComponentProps,
    deleteComponentProps,
    hiddenComponentProps,
    lockedComponentProps,
    copyComponentProps,
    pasteComponentProps,
    selectNextComponent,
    selectPrevComponent,
    changeSelectedTitle,
    moveComponent
} = ComponentsSlice.actions

export default ComponentsSlice.reducer