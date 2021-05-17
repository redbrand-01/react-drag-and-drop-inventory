export const copyObj = (item) => {  // копирование обьекта
    let clone = {}

    for (let key in item) {
        clone[key] = item[key];
    }
        
    return clone
}