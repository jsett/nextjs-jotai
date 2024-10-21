"use client"
import { useAtom } from 'jotai'
import { listAtom } from '../atoms/basicAtoms'

export const BasicListApp = () => {
  const [list, setList] = useAtom(listAtom)

  return (
    <>
      <ul>
        {list.map((item) => (
          <li key={item.title}>{item.title} - Have: {JSON.stringify(item.have)}</li>
        ))}
      </ul>
      <button className='border-2' onClick={() => {
        setList((list) => [
          ...list,
          {
            title: 'scissors',
            have: true
          }
        ])
      }}>
        Get Scissors
      </button>
    </>
  )
}