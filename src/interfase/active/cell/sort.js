export const sort = (cell, index, items) => {
    let res = false
  
    items.forEach(v => {
        
        if(v.cell === cell.cell && v.sq === index) {
            res = v
        }
    });

    return res
}