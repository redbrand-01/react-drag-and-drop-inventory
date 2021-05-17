import { setting } from "../../setting"

export const poositionGet = (x, y) => {
    const widthPos = parseInt((x) / setting.size)
    const heightPos = parseInt((y) / setting.size)
    return { r: widthPos, b: heightPos}
}