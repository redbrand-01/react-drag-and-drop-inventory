import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ITEM_NEW_POSITION } from '../../../store/CONSTANT/store'
import { Item } from '../../item'
import { sort } from './sort'

import "./style.sass"

export const Cell = ({ size, keygen, cell }) => {
    const [ load, setLoad ] = useState(true)
    const items = useSelector(state => state.inv.items)
    const cellname = cell.cell

    const item = sort(cell, keygen.index, items)

    const dispatch = useDispatch()
    const [, drop] = useDrop(
        () => ({
          accept: "item",
          drop: (item) => dispatch({ 
            type: SET_ITEM_NEW_POSITION,
            item: item,
            index: keygen.index,
            cell: cellname
          }),
          collect: (monitor) => ({
            isOver: !!monitor.isOver()
          })
        })
    )

    useEffect(() => {
      setLoad(false)
      setTimeout(() => {
        setLoad(true)
      }, 50)
    }, [item])

    return (
        <div
            ref={drop}
            className={"cell-usability"}
            style={{ width: size * cell.width, height: size * cell.height }}
        > 
        <span className={"cell-usability-keygen"}>{keygen.key}</span>
          {
              item && load ? <Item item={item} /> : null
          }
        </div>
    )
}