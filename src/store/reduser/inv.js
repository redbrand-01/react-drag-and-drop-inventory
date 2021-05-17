import { 
  SET_ITEM_STORE,
  SET_SQARE_POSITION,
  SET_ITEM_NEW_POSITION,
  DELETE_ITEM,
  INFO_MESSAGE_DEFAULT,
  ITEM_USABILITY
} from '../CONSTANT/store'
import { character } from '../setting'

import { ActiveItemInv } from '../inv/active_item_inv'
import { ItemNewPosition } from '../inv/item_new_position'
import { DeleteItem } from '../inv/delete'
import { Usability } from '../inv/usability'

import { UpdateTableFetch } from '../../interfase/fetch/update'
import { DeleteTableFetch } from '../../interfase/fetch/delete'

class initState {
  items = []
  active = []
  position = {
    right: 0,
    bottom: 0
  }
  info = ''
  character = character
}

const init = new initState()

export const inv = ( state = init, action ) => {
  switch (action.type) {
    case SET_ITEM_STORE : // получение итемов
      const result1 = ActiveItemInv(action.items)
      return {
        ...state,
        items: action.items,
        active: result1.active
      }
    case SET_ITEM_NEW_POSITION : // установка на новые позиции
      const result2 = ItemNewPosition(action, [...state.items], state.position)
      if(result2) {
        UpdateTableFetch(result2.fetchData)
          return {
            ...state,
            items: result2.items,
            active: result2.activeAll
          }
        } else {
          return state
        }
    case DELETE_ITEM : // удаление итема
        const result3 = DeleteItem(action.item.id, [...state.items])
        DeleteTableFetch(result3.fetchData)
        return {
          ...state,
          items: result3.items,
          active: result3.activeAll,
          info: 'Итем удален'
        }
    case ITEM_USABILITY : // позиция мыши на итеме
        const result4 = Usability(action.item, [...state.items], state.active, state.character)
        if(result4) {
          UpdateTableFetch(result4.fetchData)
          return {
            ...state,
            items: result4.items,
            active: result4.activeAll,
          }
        } else {
          return state
        }
        
    case SET_SQARE_POSITION : // позиция мыши на итеме
        return {
          ...state,
          position: action.position
        }
    case INFO_MESSAGE_DEFAULT : // удаляет сообщение после показа
      return {
        ...state,
        info: ''
      }
    default:
      return state
  }
}