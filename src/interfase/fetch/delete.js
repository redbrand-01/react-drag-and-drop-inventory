import { Axios, deletetable } from './param'

// Удаление итемов
export const DeleteTableFetch = async (data) => {
    await Axios("post", deletetable, data)
}