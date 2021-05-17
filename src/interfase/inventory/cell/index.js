import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ITEM_NEW_POSITION } from '../../../store/CONSTANT/store'
import { Inventory } from '../../setting'
import './style.sass'

import { sort } from './sort'

import { Item } from '../../item'

export const Cell = ({ index, size }) => {
    const [ load, setLoad ] = useState(true)
    
    const act = useSelector(state => state.inv.active)
    const items = useSelector(state => state.inv.items)
    const dispatch = useDispatch()

    const { active , item } = sort(act, items, index)

    useEffect(() => {
      setLoad(false)
      setTimeout(() => {
        setLoad(true)
      }, 50)
    }, [item])

    const [, drop] = useDrop(
        () => ({
          accept: "item",
          drop: (item) => dispatch({ 
            type: SET_ITEM_NEW_POSITION,
            item: item,
            index: index,
            cell: Inventory
          }),
          collect: (monitor) => ({
            isOver: !!monitor.isOver()
          })
        })
      )
    // background -- для проверки активных ячеек
    return (
        <div style={{ width: size, height: size, background: active ? "" : "", zIndex: item ? 10: 0 }} className={"cell"} ref={drop}>
            {
              item && load ? <Item item={item} /> : null
            }
        </div>
    )
}