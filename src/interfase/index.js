import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './style.sass'

import { SET_ITEM_STORE } from '../store/CONSTANT/store'

import { Inventory } from './inventory'
import { Character } from './character'
import { InventoryActive } from './active'

import { InfoMessage } from './info'
import { ActiveKey } from './activeKey'

import { GetTableFetch } from './fetch/get'

export const Interface = () => {
    const dispatch = useDispatch()
    // eslint-disable-next-line 
    useEffect(async () => {
        const res = await GetTableFetch()
        if(res) {
            dispatch({
                type: SET_ITEM_STORE,
                items: res
            })
        }
        return () => true
    })
    
    return (
        <div className={"conteiner-position"}>
            <ActiveKey />
            <InfoMessage />
            <div className={"border-left"}/>
            <div className={"border-right"}/>
            <div className={"conteiner-invenrory-character"}  onContextMenu={e => e.preventDefault()} >
                <div className={"conteiner-character"}><Character /></div> 
                <div className={"conteiner-invenrory"}><Inventory /></div>
            </div>
            <InventoryActive />
        </div>
    )
}