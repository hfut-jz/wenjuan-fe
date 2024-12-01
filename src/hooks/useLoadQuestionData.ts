import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useRequest} from "ahooks";
import {getQuestionService} from "../services/question";
import {useDispatch} from "react-redux";
import {resetComponents} from "../store/componentsReducer";
import {resetPageInfo} from "../store/pageInfoReducer";

function useLoadQuestionData(){
    //首先获取id
    const {id=''}=useParams()
    const dispatch=useDispatch()
    //发送请求
    const {data,loading,error,run}=useRequest(
        async (id:string)=>{
            if(!id)throw new Error('id不存在')
            const data=await getQuestionService(id)
            return data
        },{
        manual:true
    })
    //监听
    useEffect(() => {
        run(id)
    }, [id]);
    //返回解构后的数据,存储到redux store中
    //就是对loading，error进行监听，监听到了就返回数据。
    useEffect(() => {
        if(!data)return
        const {title='',componentList=[],desc='',js='',css=''}=data
        let selectedId=''
        if (componentList.length>0){
            selectedId=componentList[0].fe_id
        }

        dispatch(resetComponents({componentList,selectedId,copiedComponent:null}))
        //把pageInfo存储到redux中
        dispatch(resetPageInfo({title,desc,js,css}))
    }, [data]);
    return {loading,error}
}
export default useLoadQuestionData