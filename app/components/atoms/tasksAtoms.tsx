import { atom } from 'jotai'
import { focusAtom } from 'jotai-optics'
import { splitAtom } from 'jotai/utils'
import type { OpticFor } from "optics-ts";


export const initialData = {
    tasks: [
      {
        id: 1,
        text: "task1",
        state: "start",
        tags: ["a","b","c"]
      },
      {
        id: 2,
        text: "task2",
        state: "working",
        tags: ["a","b","c"]
      },
      {
        id: 3,
        text: "task3",
        state: "done",
        tags: ["a","b","c"]
      },
    ],
    other: [
      "a",
      "b",
      "c",
    ],
    other2: [
        "a",
        "b",
        "c",
    ],
  }

export const dataAtom = atom(initialData)

export const tasksAtom = focusAtom(dataAtom, (optic) => optic.prop('tasks'))

export const tasksAtomsAtom = splitAtom(tasksAtom)

export const focusTags = (optic: OpticFor<typeof initialData["tasks"][number]>) => optic.prop("tags");

