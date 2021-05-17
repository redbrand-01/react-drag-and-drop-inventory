import { setting, Inventory } from '../setting'

export const ActiveItemInv = (items) => {
    const active = []
    const fieldWidth = setting.fieldW
    
    items.forEach(v => {
        if(v.cell === Inventory) // получение заполненных ячеек инвентаря
        {
            const sq = v.sq
            const width = v.width
            const height = v.height

            for(let h = 0; h < height; h++) { // ширина
                active.push(sq + (h * fieldWidth))
                for(let w = 1; w < width; w++) { // длина
                    active.push(sq + (h * fieldWidth) + w)
                }
            }
        }
    });
    return { active: active }
}