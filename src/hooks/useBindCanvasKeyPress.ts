import {useKeyPress} from "ahooks";
import {useDispatch} from "react-redux";
import {
    copyComponentProps,
    deleteComponentProps,
    pasteComponentProps,
    selectNextComponent, selectPrevComponent
} from "../store/componentsReducer";
//对其所在区域进行判断
function isActiveElementValid(){
    const activeElem=document.activeElement
    if(activeElem===document.body)return true
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
}
export default useBindCanvasKeyPress