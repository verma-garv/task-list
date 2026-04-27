import { useState, useEffect } from "react"
import Card from "./components/Card.jsx"

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const [input, setInput] = useState("")
  const [priority, setPriority] = useState("")

  function handleAddTask() {
    if (!input.trim()) {
      alert("Please enter a task")
      return
    }

    if (!priority) {
      alert("Please select a priority")
      return
    }

    const newTask = {
      id: Date.now(),
      text: input,
      priority: priority
    }

    setTasks([...tasks, newTask])
    setInput("")
    setPriority("")
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const priorityOrder = {
    urgent: 3,
    important: 2,
    "not-urgent": 1
  }

  const [sortType, setSortType] = useState("none")

  let sortedTasks = [...tasks]

  if (sortType === "High") {
    sortedTasks.sort((a, b) => {return priorityOrder[b.priority] - priorityOrder[a.priority]})
  }

  if (sortType === "Low") {
    sortedTasks.sort((a, b) => {return priorityOrder[a.priority] - priorityOrder[b.priority]})
  }

    return (
    <>
      <div className="my-2"><h1 className="text-gray-600">Task List</h1></div>
      <div className=" max-w-full h-full flex flex-row items-center gap-4">
        <div className="p-4 w-75 h-50 bg-gray-900 rounded-xl  flex flex-col justify-center items-center gap-3">
          <input value={input} type="text" onChange={(e) => setInput(e.target.value)} className="px-1 w-50 border-2  border-gray-500 rounded-sm hover:border-gray-400"></input>

          {/* select for the drop down menu for the priority*/}
          <select value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-50 h-8 border-2 border-gray-500 hover:border-gray-400 rounded-sm" >
            <option value="" disabled>Select priorty</option>
            <option value="urgent">Urgent</option>
            <option value="important">Important</option>
            <option value="not-urgent">important-noturgent</option>
          </select>

          <button onClick={handleAddTask} className=" bg-gray-800 w-20 h-8 border-2 border-gray-400 rounded-xl hover:border-gray-500">Submit</button>
          </div>
          <div className=" w-full h-fit p-4 bg-gray-900 rounded-xl flex flex-col gap-4 overflow-y-auto">
            <div className="flex gap-2">
              <button onClick={() => setSortType("High")} className=" bg-gray-800 w-30 h-8 border-2 border-gray-400 rounded-xl hover:border-gray-500">low to high</button>
              <button onClick={() => setSortType("Low")} className=" bg-gray-800 w-30 h-8 border-2 border-gray-400 rounded-xl hover:border-gray-500">high to low</button>
              <button onClick={() => setSortType("none")} className=" bg-gray-800 w-30 h-8 border-2 border-gray-400 rounded-xl hover:border-gray-500">Default</button>
            </div>
          {sortedTasks.map(task =>
            <Card key={task.id} description={task.text} onDelete={handleDeleteTask} priority={task.priority} id={task.id} />
          )}
        </div>
      </div>
    </>
  )
}
