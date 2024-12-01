import {useRequest} from "ahooks";
import {getQuestionListService} from "../services/question";
import {useSearchParams} from "react-router-dom";
import {LIST_PAGE_SIZE_PARAM_KEY, LIST_SEARCH_PARAM_KEY} from "../constant";

type OptionType={
    isStar:boolean
    isDeleted:boolean

}
function useLoadQuestionListData(opt:Partial<OptionType>={}){
    const {isStar,isDeleted=false}=opt
    const [searchParams]=useSearchParams()
    console.log('keyWord',searchParams.get('keyword'));

    const {data,loading,error,refresh}=useRequest(async ()=>{
        const keyword=searchParams.get(LIST_SEARCH_PARAM_KEY)||''
        const page=parseInt(searchParams.get(LIST_SEARCH_PARAM_KEY)||'')
        const pageSize=parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY)||'')
        const data= await getQuestionListService({keyword,isStar,isDeleted,page,pageSize})
        return data
    },
        {
            //只要searchParams变化就刷新
            refreshDeps:[searchParams],
        })
    //返回解构后的数据
    return {data,loading,error,refresh}
}
export default useLoadQuestionListData