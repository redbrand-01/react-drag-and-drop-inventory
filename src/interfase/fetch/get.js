import { Axios, gettable } from './param'

// Получение итемов
export const GetTableFetch = async () => {
    const res = await Axios("get", gettable)
    return res
}