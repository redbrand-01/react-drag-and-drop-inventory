import React from 'react'
import { setting } from '../setting'
import './style.sass'
import { useDrag } from 'react-dnd'

import { Content } from './content'

export const Item = ({ item, active }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "item",
        item: item,
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <div
            ref={drag}
            className={"conteiner-item"}
            style={{ 
                width: setting.size * item.width - (item.width), 
                height: setting.size * item.height - (item.height ), 
                display: isDragging ? "none" : "flex" 
            }}
        >
            <Content item={item} active={active}/>
        </div>
    )
}
