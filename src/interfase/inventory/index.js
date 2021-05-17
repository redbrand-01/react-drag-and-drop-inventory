import React from 'react'

import { inventoory } from './table'
import { setting } from '../setting'

import { Recycle } from './recycle'

export const Inventory = () => {
    const squares = inventoory() // сетка инвенторя
    
    return (
        <div className={"inventory-conteiner-border"}>
        <div className={"conteiner-border"}>
            {
                squares.map((fieldH, indexI) => {
                    return (
                        <div key={indexI} className={"conteiner"}>
                            {
                                fieldH.map((FieldW, indexW) => {
                                    return  <FieldW key={indexW} index={indexI * setting.fieldW + indexW} size={setting.size} />
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
            <Recycle />
        </div>
    )
}