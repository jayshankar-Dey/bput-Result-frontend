import { Link } from "react-router-dom"


const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-600">
      <div className="w-[34rem] h-96 bg-zinc-800 flex justify-center items-center rounded-md shadow-md flex-col">
      <h1 className="text-white font-bold text-5xl font-mono">Page Not Found</h1>
      <Link to={"/admin"} className="bg-zinc-700 p-2 rounded text-white mt-3">Go to Home page</Link>
      </div>
    </div>
  )
}

export default PageNotFound
