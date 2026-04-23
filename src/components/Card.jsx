export default function Card({ description, onDelete, priority, id }) {
  const priorityStyle = {
    urgent: "bg-red-200 border-red-400",
    important: "bg-yellow-200 border-yellow-400",
    "not-urgent": "bg-green-200 border-green-400"
  }

  return (
    <div className="w-full h-20 px-7 bg-gray-800 rounded-xl flex place-content-between items-center">
      <p className="font-semibold text-lg">{description}</p>
      <p className={`w-fit px-2 border-2 text-black ${priorityStyle[priority]} rounded-xl`}>{priority}</p>
      <button onClick={() => onDelete(id)} className="w-20 h-8 bg-red-400 text-black border-2 border-red-500 hover:bg-red-300 rounded-xl">Close</button>
    </div>
  )
}
