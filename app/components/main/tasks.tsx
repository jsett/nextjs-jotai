"use client"
import { useAtom } from 'jotai'
import { listAtom } from '../atoms/basicAtoms'
import { dataAtom, tasksAtomsAtom } from '../atoms/tasksAtoms'
import { PrimitiveAtom } from 'jotai/vanilla';
import { initialData } from '../atoms/tasksAtoms';
import { validateHeaderName } from 'http';
import { useAtomDevtools } from 'jotai-devtools';
import { focusAtom } from 'jotai-optics';
import { splitAtom } from 'jotai/utils';

import type { OpticFor } from "optics-ts";

const focusTags = (optic: OpticFor<typeof initialData["tasks"][number]>) => optic.prop("tags");


function TaskComponent({taskAtom}: {taskAtom: PrimitiveAtom<typeof initialData["tasks"][number]>}){
    const [task, setTask] = useAtom(taskAtom);
    return <>
    <li>
        {task.text} - {task.state}
    </li>
    </>
}

function TagComponent({tagAtom}: {tagAtom: PrimitiveAtom<typeof initialData["tasks"][number]["tags"][number]>}){
    const [data, setData] = useAtom(tagAtom);
    return (
        <li
          contentEditable
          suppressContentEditableWarning
          onBlur={(event) => setData(event.currentTarget.textContent || "")}
        >
          {data}
        </li>
    );
}

function TaskStartComponent({taskAtom}: {taskAtom: PrimitiveAtom<typeof initialData["tasks"][number]>}){
    const [task, setTask] = useAtom(taskAtom);
    const tagsAtom = focusAtom(taskAtom, focusTags);
    const tagsAtomsAtom = splitAtom(tagsAtom);
    const [tagsAtoms] = useAtom(tagsAtomsAtom);
    if(task.state == 'start'){

        return <>
        <li>
            {task.text} - {task.state}
            <button className="btn" onClick={()=> setTask((preTask) => ({...preTask, state: "working"}))}>change state</button>
            <ul>
                {tagsAtoms.map((tagAtom) => (
                    <TagComponent tagAtom={tagAtom} key={`${tagAtom}`} />
                ))}
            </ul>
        </li>
        </>
    } else {
        return <>-</>
    }
}

function TaskWorkingComponent({taskAtom}: {taskAtom: PrimitiveAtom<typeof initialData["tasks"][number]>}){
    const [task, setTask] = useAtom(taskAtom);
    const tagsAtom = focusAtom(taskAtom, focusTags);
    const tagsAtomsAtom = splitAtom(tagsAtom);
    const [tagsAtoms] = useAtom(tagsAtomsAtom);

    useAtomDevtools(taskAtom)
    if(task.state == 'working'){

        return <>
        <li>
            {task.text} - {task.state}
            <button className="btn" onClick={()=> setTask((preTask) => ({...preTask, state: "done"}))}>change state</button>
            <ul>
                {tagsAtoms.map((tagAtom) => (
                    <TagComponent tagAtom={tagAtom} key={`${tagAtom}`} />
                ))}
            </ul>
        </li>
        </>
    } else {
        return <>-</>
    }
}

function TaskDoneComponent({taskAtom}: {taskAtom: PrimitiveAtom<typeof initialData["tasks"][number]>}){
    const [task, setTask] = useAtom(taskAtom);
    const tagsAtom = focusAtom(taskAtom, focusTags);
    const tagsAtomsAtom = splitAtom(tagsAtom);
    const [tagsAtoms] = useAtom(tagsAtomsAtom);
    if(task.state == 'done'){

        return <>
        <li>
            {task.text} - {task.state}
            <button className="btn" onClick={()=> setTask((preTask) => ({...preTask, state: "start"}))}>change state</button>
            <ul>
                {tagsAtoms.map((tagAtom) => (
                    <TagComponent tagAtom={tagAtom} key={`${tagAtom}`} />
                ))}
            </ul>
        </li>
        </>
    } else {
        return <></>
    }
}

function DataJSON(){
    const [data, setData] = useAtom(dataAtom);
    return <>
    <h1>All Data</h1>
    {JSON.stringify(data)}
    </>
}

export const TasksApp = () => {
  const [tasksAtoms] = useAtom(tasksAtomsAtom)

  return (
    <>
        <DataJSON />
      <div>
        <h1>All Tasks</h1>
      {tasksAtoms.map((taskAtom) => (
        <TaskComponent taskAtom={taskAtom} key={`${taskAtom}`} />
      ))}
    </div>
    <div>
        <h1>Start Tasks</h1>
      {tasksAtoms.map((taskAtom) => (
        <TaskStartComponent taskAtom={taskAtom} key={`${taskAtom}`} />
      ))}
    </div>
    <div>
        <h1>Working Tasks</h1>
      {tasksAtoms.map((taskAtom) => (
        <TaskWorkingComponent taskAtom={taskAtom} key={`${taskAtom}`} />
      ))}
    </div>
    <div>
        <h1>Done Tasks</h1>
      {tasksAtoms.map((taskAtom) => (
        <TaskDoneComponent taskAtom={taskAtom} key={`${taskAtom}`} />
      ))}
    </div>
    </>
  )
}