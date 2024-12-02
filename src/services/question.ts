import axios,{ResDataType} from "./ajax";

type SearchOptions={
    keyword:string,
    isStar:boolean,
    isDeleted:boolean
    page?:number,
    pageSize?:number
}
//获取单个问题信息
export async function getQuestionService(id:string):Promise<ResDataType>{
    const url=`/api/question/${id}`
    const data=(await axios.get(url)) as ResDataType
    return data
}

//创建问卷
export async function createQuestionService():Promise<ResDataType>{
    const url='/api/question'
    const data=(await axios.post(url)) as ResDataType
    return data
}

//获取问题列表
export async function getQuestionListService(opt:Partial<SearchOptions>={}): Promise<ResDataType>{
    const url='/api/question'
    const data=(await axios.get(url,{params:opt})) as ResDataType
    return data
}
//更新
export async function updateQuestionService(
    id: string,
    opt: { [key: string]: any }
): Promise<ResDataType> {
    const url = `/api/question/${id}`
    const data = (await axios.patch(url, opt)) as ResDataType
    return data
}
export async function duplicateQuestionService(id:string):Promise<ResDataType>{
    const url=`/api/question/duplicate/${id}`
    const data=(await axios.post(url))as ResDataType
    return data
}
//彻底删除
export async function deleteQuestionService(ids:string[]):Promise<ResDataType>{
    const url='/api/question'
    const data=(await axios.delete(url,{data:ids})) as ResDataType
    return data
}