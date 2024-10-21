import { atom } from "jotai"

export const listAtom = atom([
    {
        title: 'calculater',
        have: true
    },
    {
        title: 'pen',
        have: false
    },
    {
        title: 'paper',
        have: true
    },
    {
        title: 'ruler',
        have: false
    }
])