/* eslint-disable react/prop-types */
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"


const UsersTableRow = ({user,change}) => {
    const[deletePopap,setdeletepoap]=useState(false)
    const[EddetPopap,setEddetpoap]=useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    //const [password, setPassword] = useState("");
    const [ID,setID]=useState("")
    //delete uuser
    const deleteUser=async(id)=>{
      const res = await axios.delete(
        `https://bput-result-backand.onrender.com/api/v1/auth/delete/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Bputoken")}`,
          },
        }
      );
      toast.success(res.data.message)
      change(res.data.message)
    }

    ///get single user data
    const getsingleUser=async(id)=>{
      
      const res = await axios.get(`https://bput-result-backand.onrender.com/api/v1/auth/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Bputoken")}`,
          }
        }
      );
      const {_id,name,email}=res.data.user
      setEmail(email)
      setName(name)
      setID(_id)
    }
   
     ///gupdata user data
     const updateuserdata=async(id)=>{
     
      const res = await axios.post(
        `https://bput-result-backand.onrender.com/api/v1/auth/update/users/${id}`,{
          name,
          email
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Bputoken")}`,
          }
        }
      );
      toast.success(res.data.message)
      change(res.data)
      console.log(res.data)
      setEddetpoap(false)
    }
   
  return (
   <>
    <tr className="border  *:border-r *:p-3 h- relative">
         
          <td>{user?._id}</td>
          <td>{user?.name}</td>
          <td>{user?.email}</td>
         
          <td className="flex justify-between items-center gap-2  ">
            <button onClick={()=>
                {
                    setEddetpoap(!EddetPopap)
                    getsingleUser(user?._id)
                }
            } className="bg-green-600 px-4 text-white rounded-md shadow-lg"><ion-icon name="eyedrop-outline"></ion-icon></button>
            <button onClick={()=>{
            setdeletepoap(!deletePopap);
            setID(user?._id)
           }} className="bg-red-600 px-4 text-white rounded-md shadow-lg"><ion-icon name="trash-outline"></ion-icon></button>
          </td>


          <div className={`${deletePopap?"flex":"hidden"} absolute top-0 left-0 bg-[#b2b0b095] w-full h-full  justify-center`}>
           <div className="w-52 flex justify-between items-center">
           <button onClick={()=>{
            setdeletepoap(!deletePopap);
           }} className="bg-green-600 px-4 p-1 text-white rounded-md shadow-lg">calcel</button>
           <button onClick={()=>{
            setdeletepoap(!deletePopap);
            deleteUser(ID)
           }} className="bg-red-600 px-4 p-1 text-white rounded-md shadow-lg">Confirm <ion-icon name="trash-outline"></ion-icon></button>
           </div>

          </div>
            

        
        </tr> 
          <div className={`h-screen  ${EddetPopap?"absolute scale-100 z-30":"hidden scale-0"} duration-300  top-0 left-0 bg-[#5e5e5ea1] w-full`}>
               <div className="w-full flex justify-center items-center h-full">
                 <div  className="w-96 h-fit  p-5 bg-zinc-800 border rounded-md shadow-lg flex flex-col *:gap-y-4    *:text-white *:mt-5 ">
                  <button onClick={()=>{
                    setEddetpoap(!EddetPopap)
                  }}  className="bg-red-600 ml-auto px-2 rounded-full">X</button>
                       <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Name"
                    className="focus:bg-zinc-700 p-3 border bg-transparent rounded-md "
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="email"
                    className="focus:bg-zinc-700 p-3 border bg-transparent rounded-md"
                  />

                    <button  onClick={()=>updateuserdata(ID)} className="bg-green-600 hover:shadow-green-700 duration-300 hover:scale-105 p-2 rounded shadow shadow-zinc-100  ml-auto">Save Change</button>
                     
                 </div>
               </div>
          </div>
   </>
  )
}

export default UsersTableRow
