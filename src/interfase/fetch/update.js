import { Axios, updatetable } from './param'

// Обновление итемов
export const UpdateTableFetch = async (data) => {
    await Axios("post", updatetable, data)
}