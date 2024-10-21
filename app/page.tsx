import Image from "next/image";
import { BasicListApp } from "./components/main/basic";
import { TasksApp } from "./components/main/tasks";

export default function Home() {
  return (
    <>
    <h1>Task Items</h1>
    {/* <BasicListApp /> */}
    <TasksApp />
    </>
  );
}
