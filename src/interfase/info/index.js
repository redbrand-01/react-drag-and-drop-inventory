import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { INFO_MESSAGE_DEFAULT } from '../../store/CONSTANT/store'
import { message } from 'antd'

export const InfoMessage = () => {
    const info = useSelector(state => state.inv.info)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!!info) {
            message.success(info)
            dispatch({ type: INFO_MESSAGE_DEFAULT })
        }
    // eslint-disable-next-line
    }, [info])

    return null
}