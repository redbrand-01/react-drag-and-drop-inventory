import { setting } from '../setting'

export const checkInItem = (sq, all, is) => { // проверка на границы и наложения
    let status1 = true
    let status2 = true

    sq.forEach(v => { 
        if(all.includes(v)) status1 = false
    });

    if(sq.length > 1 && status1) {
        status2 = checkBorder(sq, is)
    }

    return status1 && status2 ? true : false
}

const checkBorder = (sq, is) => {

    let status = true
    const field = setting.fieldW * setting.fieldH - 1 // поля

    sq.forEach(v => { // вверх/вниз
        if(v < 0 || v > field) status = false
    })

    const position = ((is.sq + is.width - 1) / setting.fieldW) // лево/право
    const str = (is.sq / setting.fieldW)

    if(parseInt(position) > parseInt(str)) status = false
   
    return status
}

export const CheckCharacterItem = (is, items, cell, index) => {
    let status = null 
    // совпадает итем с ичейокй или нет
    status = is.param.item === cell ? "empty" : false // если совпадает то по умолчанию свободна 

    if(status) {
        items.forEach(v => { // проверка есть ли итем или нет
            if(v.cell === cell && v.sq === index) status = "occupied"
        })
    }

    return status
}

export const CheckInventoryItem = (is, items, index) => {
    let status = false
    items.forEach(v => {
       if( is.cell === v.param.item && v.sq === index && is.cell !== v.cell) {
           status = v 
        } // замена в инвентарь
       if( is.cell === v.cell && v.sq === index && v.width === is.width && v.height === is.height && is.id !== v.id) { // замена внутри инвенторя
            status = v
       }
    })

    return status
}