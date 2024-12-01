import {useSelector} from "react-redux";
import {StateType} from "../store";
import {PageInfoType} from "../store/pageInfoReducer";

function useGetPageInfo(){
    const pages=useSelector<StateType>(state => state.pageInfo) as PageInfoType
    const {title,desc,js,css,isPublish}=pages
    return {title,desc,js,css,isPublish}
}
export default useGetPageInfo