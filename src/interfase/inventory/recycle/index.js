import React from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { DeleteOutlined } from '@ant-design/icons'
import { DELETE_ITEM } from '../../../store/CONSTANT/store'
import './style.sass'

export const Recycle = () => {
    const dispatch = useDispatch()

    const [, drop] = useDrop(
        () => ({
          accept: "item",
          drop: (item) => dispatch({ 
            type: DELETE_ITEM,
            item: item
          }),
          collect: (monitor) => ({
            isOver: !!monitor.isOver()
          })
        })
      )

    return (
        <div className={"recycle-conteiner"}>
            <div className={"recycle-img-conteiner"} ref={drop}>
                <DeleteOutlined style={{fontSize: 30, color: "#402720"}} />
            </div>
        </div>
    )
}