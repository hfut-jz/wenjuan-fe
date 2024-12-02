import {useKeyPress} from "ahooks";
import {useDispatch} from "react-redux";
import {
    copyComponentProps,
    deleteComponentProps,
    pasteComponentProps,
    selectNextComponent, selectPrevComponent
} from "../store/componentsReducer";
import {ActionCreators as UndoActionCreators} from "redux-undo";
//对其所在区域进行判断
function isActiveElementValid(){
    const activeElem=document.activeElement
    //增加判断条件
    if(activeElem===document.body)return true
    if(activeElem?.matches('div[role="button"]'))return true
    return false
}
function useBindCanvasKeyPress(){
    const dispatch=useDispatch()
    useKeyPress(['backspace','delete'],()=>{
        if(!isActiveElementValid())return
        dispatch(deleteComponentProps())
    })
    useKeyPress(['ctrl.c','meta.c'],()=>{
        if(!isActiveElementValid())return
        dispatch(copyComponentProps())
    })
    useKeyPress(['ctrl.v','meta.v'],()=>{
        if(!isActiveElementValid())return
        dispatch(pasteComponentProps())
    })
    useKeyPress(['uparrow'],()=>{
        if(!isActiveElementValid())return
        dispatch(selectPrevComponent())
    })
    useKeyPress(['downarrow'],()=>{
        if(!isActiveElementValid())return
        dispatch(selectNextComponent())
    })
    useKeyPress(['ctrl.z','meta.v'],()=>{
        if(!isActiveElementValid())return
        dispatch(UndoActionCreators.undo())
    })
    useKeyPress(['ctrl.shift.z','meta.shift.z'],()=>{
        if(!isActiveElementValid())return
        dispatch(UndoActionCreators.redo())
    })
}
export default useBindCanvasKeyPress