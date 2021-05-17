import React from 'react'
import { useSelector } from 'react-redux'
import './style.sass'

import { Cell } from './cell'

export const Character = () => {
    const { helmet, body, shoes, ring, jewerly, weapon } = useSelector(state => state.inv.character)
    return(
        <div className={"character-conteiner-border"}>
           
            <div className={"character-conteiner-items"}>
                <Cell cell={weapon} index={0}/> 
            </div>
            <div className={"character-conteiner-items"}>
                <Cell cell={helmet} index={0}/>
                <Cell cell={body} index={0}/>
                <Cell cell={shoes} index={0} />
            </div>
            <div className={"character-conteiner-items"}>
                <Cell cell={jewerly} index={0}/>
                <Cell cell={ring} index={0}/>
                <Cell cell={ring} index={1}/>
            </div>
        </div>
    )
}