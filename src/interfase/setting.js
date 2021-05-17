export const setting = {
    fieldW: 10,
    fieldH: 10,
    size: 40,
}

export const Inventory = "item"
export const Character = ['helmet', 'body', 'shoes', 'ring', 'jewerly', 'weapon']

export const Active = {
    width: 1,
    height: 1,
    cell: 'usability',
    key: [
        { index: 0, key: "1"},
        { index: 1, key: "2"},
        { index: 2, key: "3"},
        { index: 3, key: "4"},
        { index: 4, key: "5"},
        { index: 5, key: "6"},
        { index: 6, key: "7"},
        { index: 7, key: "8"},
        { index: 8, key: "9"},
        { index: 9, key: "0"}
    ]
}

export const character = {
    helmet: {
        width: 2,
        height: 2,
        img: '/helmet.png',
        cell: Character[0],
        cellActive: 1
    },
    body: {
        width: 2,
        height: 3,
        img: '/armor.png',
        cell: Character[1],
        cellActive: 1
    },
    shoes: {
        width: 2,
        height: 3,
        img: '/pants.png',
        cell: Character[2],
        cellActive: 1
    },
    ring: {
        width: 1,
        height: 1,
        img: '/ring.png',
        cell: Character[3],
        cellActive: 2
    },
    jewerly: {
        width: 2,
        height: 2,
        img: '/pendant.png',
        cell: Character[4],
        cellActive: 1
    },
    weapon: {
        width: 2,
        height: 3,
        img: '/sword.png',
        cell: Character[5],
        cellActive: 1
    }
}