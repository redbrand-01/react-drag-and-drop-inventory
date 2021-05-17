import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ITEM_USABILITY } from '../../store/CONSTANT/store'
import { Active } from '../setting'

export const ActiveKey = () => {
    const items = useSelector(state => state.inv.items)
    const dispatch = useDispatch()

    const ActiveKey = (e) => {
        const key = e.key
        let status = false
        Active.key.forEach(v => {
            if(v.key === key) status = v
        })

        if(status) {

            let item = false

            items.forEach(v => {
                if(v.sq === status.index && v.cell === Active.cell)  item = v
            })

            if(item) {
                dispatch({
                    type: ITEM_USABILITY,
                    item: item
                })
            }

        }
    }

    useEffect(() => {
        const onKeypress = e => ActiveKey(e);
      
        document.addEventListener('keypress', onKeypress);
    
        return () => {
          document.removeEventListener('keypress', onKeypress);
        };
    });

    return null
}