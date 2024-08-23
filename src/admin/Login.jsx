import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import Loadind from "../components/Loadind"
import { useNavigate } from "react-router-dom"


const Login = () => {
  //const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[loadind,setloading]=useState(false)
 // const [users,setUsers]=useState()
  //const[en,setEn]=useState("")
const navigate=useNavigate()
  ///add users////////
  const handlesubmit=async(e)=>{
    e.preventDefault()
    setloading(true)
     const res=await axios.post(`https://bput-result-backand.onrender.com/api/v1/auth/login`,{email,password})
     try {
      if(res.data.success) {
        toast.success(res.data.message)
        localStorage.setItem("Bputoken",res.data.token)
        setEmail("")
        setPassword("")
        setloading(false)
        navigate("/admin")
      }else{
        localStorage.removeItem("Bputoken")
        setEmail("")
        setPassword("")
        setloading(false)
        toast.error(res.data.message)
      }
      
     } catch (error) {
      console.log(error)
     }
  }

  return (
    <div className="bg-zinc-900 h-screen flex justify-center items-center">
       <form onSubmit={handlesubmit} className="w-96 h-80 bg-zinc-800 border border-gray-600 rounded shadow shadow-zinc-700 flex flex-col gap-4 *:mt-3 p-5 justify-center ">
            <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="h-10 outline-none focus:bg-sky-400 px-3 text-black font-semibold bg-transparent border-b " required/>

            <input type="password"  onChange={(e)=>setPassword(e.target.value)} placeholder="Gov.Password" className="h-10  outline-none focus:bg-sky-400 px-3 text-black font-semibold bg-transparent border-b " required/>
            {loadind?<Loadind/>:<button className="h-10 w-full rounded-md text-white bg-zinc-800 border shadow-lg  font-semibold">Login</button>
                    }
            
       </form>
    </div>
  )
}

export default Login
