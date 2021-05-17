import { setting } from '../setting'

export const IndexPosition = (index, position) => { // позиция мыши на итеме корректировка
    const fieldW = setting.fieldW

    const bottom = position.bottom
    const right = position.right
    const sq = index - bottom * fieldW - right

    return { sq }
}