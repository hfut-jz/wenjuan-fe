import React,{FC} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

type PropsType={
    id:string
    children:React.ReactNode; // 替代 JSX.Element
}
const SortableItem:FC<PropsType> = (props) => {
    const {id,children}=props;
    const {attributes,listeners,setNodeRef,transform,transition}=useSortable({id});
    const style={
        transform:CSS.Transform.toString(transform),
        transition
    }
    return (
        <div>
            <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                {children}
            </div>
        </div>
    )
}
export default SortableItem;