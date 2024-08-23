/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Loadind from "../components/Loadind";
import { Link } from "react-router-dom";

const CollegeTableRow = ({collage,change}) => {
    const[deletePopap,setdeletepoap]=useState(false)
    const[EddetPopap,setEddetpoap]=useState(false)
    ///Update college
    const [collageName, setCollegename] = useState("");
    const [address, setAddress] = useState("");
     //console.log(collage)
    const [loading, setloading] = useState(false);
    const [ID,setID]=useState("")
    //delete college//
    const deleteCollege=async(id)=>{
      const res = await axios.delete(`https://bput-result-backand.onrender.com/api/v1/collage/delete/${id}`,{
          headers:{
              Authorization: `Bearer ${localStorage.getItem("Bputoken")}`,
          }
      })
      if(res.data.success){
          toast.success(res.data.message)
          change(res.data.message)
      }else{
          toast.error(res.data.message)
      }
      //console.log(res.data)
  }

    //delete college//
    const getSingleCollege=async(id)=>{
      const res = await axios.get(`https://bput-result-backand.onrender.com/api/v1/collage/get/${id}`,{
          headers:{
              Authorization: `Bearer ${localStorage.getItem("Bputoken")}`,
          }
      })
      if(res.data.success){
          toast.success(res.data.message)
          change(res.data.message)
          setCollegename(res.data.collage.collageName)
          setAddress(res.data.collage.address)
          setID(res.data.collage._id)
         // console.log(res.data)
      }else{
          toast.error(res.data.message)
      }
      //console.log(res.data)
  }

  //Update college//
  const UpdateCollege=async(e)=>{
    e.preventDefault()
    setloading(true)
    const res = await axios.put(`https://bput-result-backand.onrender.com/api/v1/collage/update/${ID}`,{collageName,address},{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("Bputoken")}`,
    }
    })
    if(res.data.success){
        toast.success(res.data.message)
        change(res.data.collage)
        setloading(false)
    }else{
        toast.error(res.data.message)
        setloading(false)
    }
    //console.log(res.data)
}
  return (
    <>
    
      <tr className="border  *:border-r *:p-4 h- relative">
         
         <td>{collage?.collageName}</td>
         <td>{collage?.address}</td>
         
        
         <td className="flex justify-between items-center gap-2  ">
           <button onClick={()=>
               {
                   setEddetpoap(!EddetPopap)
                 getSingleCollege(collage?._id)
               }
           } className="bg-green-600 px-4 text-white rounded-md shadow-lg"><ion-icon name="eyedrop-outline"></ion-icon></button>
           <button onClick={()=>{
           setdeletepoap(!deletePopap);
           setID(collage?._id)
          }} className="bg-red-600 px-4 text-white rounded-md shadow-lg"><ion-icon name="trash-outline"></ion-icon></button>

       <Link to={`/admin/students/${collage?._id}`} onClick={()=>{}} className="bg-blue-600 px-4 text-white rounded-md shadow-lg"><ion-icon name="eye-outline"></ion-icon></Link>
         </td>


         <div className={`${deletePopap?"flex":"hidden"} absolute top-0 left-0 bg-[#b2b0b095] w-full h-full  justify-center`}>
          <div className="w-52 flex justify-between items-center">
          <button onClick={()=>{
           setdeletepoap(!deletePopap);
          }} className="bg-green-600 px-4 p-1 text-white rounded-md shadow-lg">calcel</button>
          <button onClick={()=>{
           setdeletepoap(!deletePopap);
           deleteCollege(ID)
          }} className="bg-red-600 px-4 p-1 text-white rounded-md shadow-lg">Confirm <ion-icon name="trash-outline"></ion-icon></button>
          </div>

         </div>
           

       
       </tr> 


 {/* ///model */}
 <div className={`h-screen  ${EddetPopap?"absolute scale-100 z-30":"hidden scale-0"} duration-300  top-0 left-0 bg-[#5e5e5ea1] w-full`}>
               <div className="w-full flex justify-center items-center h-full">
                 <form onSubmit={UpdateCollege}  className="w-96 h-fit  p-5 bg-zinc-800 border rounded-md shadow-lg flex flex-col *:gap-y-4    *:text-white *:mt-5 ">
                  <button type="button" onClick={()=>{
                    setEddetpoap(!EddetPopap)
                  }}  className="bg-red-600 ml-auto px-2 rounded-full">X</button>
                       <input
                    type="text"
                    value={collageName}
                    onChange={(e) => {
                        setCollegename(e.target.value);
                    }}
                    placeholder="College-Name"
                    className="focus:bg-zinc-700 p-3 border bg-transparent rounded-md "
                  />

                  <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    placeholder="College-address"
                    className="focus:bg-zinc-700 p-3 border bg-transparent rounded-md"
                  />

                  {loading ? (
                    <Loadind />
                  ) : (
                    <button
                      type="submit"
                      className="bg-green-600 hover:shadow-green-700 duration-300 hover:scale-105 p-2 rounded shadow shadow-zinc-100  ml-auto"
                    >
                      Add User
                    </button>
                  )}
                     
                 </form>
               </div>
          </div>
            
    </>
  )
}

export default CollegeTableRow
