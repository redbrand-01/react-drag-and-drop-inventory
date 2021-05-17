import React from 'react'

import { useDispatch } from 'react-redux'
import { SET_SQARE_POSITION, ITEM_USABILITY } from '../../../store/CONSTANT/store'

import { setting } from '../../setting'
import { poositionGet } from './position'
import './style.sass'

export const Content = ({ item }) => {
    const dispatch = useDispatch()
    
    const img = item.param.img
    const w = item.width
    const h = item.height
    const size = setting.size / 1.5


    const Position = (e) => { // позиция при нажатии
        const { r, b } = poositionGet(e.nativeEvent.offsetX, e.nativeEvent.offsetY, item)
        dispatch({
            type: SET_SQARE_POSITION,
            position: {
                right: r, bottom: b
            }
        })
    }

    const onContextMenu = () => {
        dispatch({
            type: ITEM_USABILITY,
            item: item
        })
    }

    return (
        <div className={"item_content_conteiner"}>
            <div 
                className={"item_content_position"}  
                onMouseDown={Position} 
                onContextMenu={onContextMenu}
            />
            {
                item.param.usability ? <span className={"item_num_usability"} >{item.param.quantity}</span> : null
            }
            <img  alt="" src={img} className={'character-image'}
                style={{ 
                    width: size * w,
                    height: size * h, 
                }}
            />
        </div>
    )
}