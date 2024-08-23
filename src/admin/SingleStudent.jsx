import axios from "axios";
import Layout from "../components/Layout"
import Semistar from "./Semistar"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Model from "../components/Model";
import toast from "react-hot-toast";
import Loadind from "../components/Loadind";

const SingleStudent = () => {
 
  const [collage, setCollage] = useState("")
  const [studentName, setStudentName] = useState("")
  const [branch, setBranch] = useState("")
  const[file,setFile] = useState("")
  const[img,setImage] = useState("")
  const[Loading,setloading]=useState(false)
  const [reg, setReg] = useState("")
  const [address, setAddress] = useState("")
  const[Examps, setExamps] = useState([])
  const[semistartPopap, setSemistartPopap] = useState(false)
  const[semister,setSemistar] = useState()
  const[profile,setProfile]=useState("")
  const[type,settype] = useState("")
  const[year,setyear] = useState("")
  const[change, setChange] = useState("")
 const{id}=useParams()
 //console.log(id)

 //get single student/////////
  const getSingleStudent=async()=>{
   const res = await axios.get(
     `https://bput-result-backand.onrender.com/api/v1/student/all?id=${id}`,
     {
       headers: {
         Authorization: `Bearer ${localStorage.getItem("Bputoken")}`,
       },
     }
   );
 // console.log(res.data.students)
 const data=res.data.students;
 //console.log(data)
 data.forEach((value)=>{
   setCollage(value.collage.collageName)
   setStudentName(value.studentName)
   setBranch(value.branch)
   setExamps(value.exams)
   setReg(value.reg)
   setAddress(value.address)
   setProfile(value.image.url)
 })
 }
 useEffect(() => {
   getSingleStudent()
 }, [id,change])

 const add_student_semistar=async(e)=>{
  e.preventDefault()
  const res = await axios.put(
    `https://bput-result-backand.onrender.com/api/v1/student/semistar/create/${id}`,{ semister, type, year },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Bputoken")}`,
      },
    }
  );
// console.log(res.data.students)
if(res.data.success){
  toast.success(res.data.message);
  setChange(res.data);
  setSemistar("")
  settype("")
  setSemistartPopap(false)
 }else{
  toast.error(res.data.message)
 }
}

///update profile image//////////////////////////////
const setProfileImage=async()=>{
  const formdata=new FormData();
  formdata.append("file",file)
  console.log(formdata,file)
  setloading(true)
  const res = await axios.put(`https://bput-result-backand.onrender.com/api/v1/student/profileImage/update/${id}`, formdata,
  {
    headers:{
      Authorization: `Bearer ${localStorage.getItem("Bputoken")}`
  }
}
);
  console.log(res.data)
 if(res.data.success){
  toast.success(res.data.message);
  setChange(res.data);
  setImage("")
  setloading(false)
 }else{
  toast.error(res.data.message)
  setloading(false)
 }
}
useEffect(() =>{
  settype(semister%2==0?"Even":"Odd")
},[semister,semistartPopap])
  return (
    <Layout>
       <div className="md:w-[60rem] p-3 bg-white border shadow">
         <div className="flex justify-center items-center md:flex-row flex-col gap-x-5">
           <label htmlFor="image" className="relative">
          {
            profile? <img src={profile} alt="" className="h-60 w-52 object-cover object-center" />: <img src={"https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"} alt="" className="h-60 w-52 object-cover object-center" />
          }
           {img&&<img src={img} alt="" className="h-60 absolute top-0 left-0 z-10 w-52 object-cover object-center" />}

           </label>

           {
            img&&<>
            {
             Loading?<Loadind/>:<button title="Uplode Image" type="button" onClick={setProfileImage} className="m-5 bg-blue-400 p-1 px-2 text-white rounded shadow-md"><ion-icon name="cloud-upload-outline"></ion-icon></button>
            }
            </>
           }
            <input type="file" id="image" onChange={(e)=>{
               setImage(URL.createObjectURL(e.target.files[0]))
               setFile(e.target.files[0])
            }}  className="hidden" />
            <div className="w-full">
            <h3 className="font-semibold p-2">Name:- {studentName} </h3>
            <h3 className="font-semibold p-2">Address:- {address} </h3>
            <h3 className="font-semibold p-2">Collage:- {collage} </h3>
            <h3 className="font-semibold p-2">Branch:-{branch}</h3>
            <h3 className="font-semibold p-2">Reg:-{reg}</h3>
            </div>
         </div>

         <div className="mt-3">
            <button onClick={()=>setSemistartPopap(!semistartPopap)} className="bg-zinc-800 p-2 text-white font-semibold border shadow-xl rounded-lg">Add Semistar</button>
         </div>
       </div>

<Model popup={semistartPopap}>
   <div className="w-full h-full flex justify-center items-center ">
   <form onSubmit={add_student_semistar} className=" flex flex-col gap-y-4 w-80 p-4 border shadow-md rounded bg-white">
      <div>
         <button type="button" onClick={()=>setSemistartPopap(!semistartPopap)} className="float-right text-red-500">X</button>
      </div>
    <input type="text" value={semister} onChange={(e)=>setSemistar(e.target.value)}  className="p-4 outline-none border-black  border-b-2  w-full" placeholder="semister"/>

    <select value={type} onChange={(e)=>settype(e.target.value)} name="" id=""  className="p-4 outline-none border-black  border-b-2  w-full">
      <option >select Type odd/even</option>
      <option value="Odd">odd</option>
      <option value="Even">Even</option>
    </select>

    <input type="text"value={year} onChange={(e)=>setyear(e.target.value)}  className="p-4 outline-none border-black  border-b-2  w-full" placeholder="Year"/>

    <button type="submit" className="p-2 bg-blue-500 text-white font-semibold rounded shadow-md">Add semistar</button>
   </form>
   </div>
</Model>
{/* /////semistars */}
  {
    Examps.map((exam,i)=>(
      <Semistar exam={exam} id={id} change={setChange} key={i}/>
    ))
  }
{/* /////semistars */}




    </Layout>
  )
}

export default SingleStudent
