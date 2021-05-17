import React from 'react'
import { setting } from '../setting'
import { Cell } from './cell'
import { Active } from '../setting'
import "./style.sass"

export const InventoryActive = () => {
    
    return (
        <div className={"conteiner-invenrory-usability"} onContextMenu={e => e.preventDefault()}>
        <div className={"conteiner-border-usability"}>
            {
                Active.key.map((key, indexW) => {
                    return  <Cell key={indexW} keygen={key} size={setting.size} cell={Active}/>
                })
            }
        </div>
        </div>

    )
}