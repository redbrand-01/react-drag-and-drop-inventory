import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ITEM_NEW_POSITION } from '../../store/CONSTANT/store'

import { Item } from '../item'

import { sort } from './sort'

import './style.sass'
import { setting } from '../setting'


export const Cell = ({ cell, index }) => {
    const [ load, setLoad ] = useState(true)

    const items = useSelector(state => state.inv.items)
    
    const dispatch = useDispatch()
    const size = setting.size
  
    const item = sort(cell.cell, index, items)

    
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
            cell: cell.cell
          }),
          collect: (monitor) => ({
            isOver: !!monitor.isOver()
          })
        })
      )

    return  (
        <div className={"character-cell-items"} ref={drop}
            style={{ width: size * cell.width, height: size * cell.height }}
        >
          {
            item && load ? <Item item={item} active cell={cell.cell}/> : null
          }
            <img  alt="" src={cell.img} className={'character-image'}
                style={{ width: size/1.5 * cell.width, height: size/1.5 * cell.height}}
            />
        </div>
    )
}