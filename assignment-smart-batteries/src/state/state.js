import { atom } from "recoil";


export const userAtom = atom(
    {
        key: "userAtom",
        default: ""
    }
)


// function createData(email, phone, criteria, values, day) {
//     return { email, phone, criteria, values, day };
// }

// const rows = [
//     'Donut@gmail.com', 2222222222, 'greater', 51, "Monday",
//     'Eclair@gmail.com', 3333333333, 'lesser', 24, "Monday",
//     'Frozen@gmail.com', 4444444444, 'lesser', 24, "Monday",
//     'Gingerbread@gmail.com', 5555555555, 'greater', 49, "Monday",
//     'Honeycomb@gmail.com', 9999999999, 'greater', 87, "Monday",
//     'ice@gmail.com', 8888888888, 'lesser', 37, "Monday",
//     'Jelly@gmail.com', 5555555555, 'lesser', 94, "Monday",
//     'KitKat@gmail.com', 7777777777, 'lesser', 65, "Monday",
// ];

export const tableAtom = atom(
    {
        key: "cartitems",
        default: []
    }
)