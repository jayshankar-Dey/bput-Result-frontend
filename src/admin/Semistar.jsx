/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import Model from "../components/Model"
import axios from "axios"
import toast from "react-hot-toast"


const Semistar = ({exam,change,id}) => {
  const[deletePopup,setDeletePopup] = useState(false)
  const[semistartPopap, setSemistartPopap] = useState(false)
  const[semister,setSemistar] = useState("")
  const[type,settype] = useState("")
  const[year,setyear] = useState("")
  const[addMarkPopup,setAddMarkPopup] = useState(false)
  const[mark,setMark]=useState([])
  const[subjectCode,setsubjectCode]=useState("")
  const[subjectName,setsubjectName]=useState("")
  const[Type,setype]=useState("")
  const[cradit,setcradit]=useState("")
  const[finamGrade,setfinamGrade]=useState("")
  const[examId,setExamId]=useState(exam._id)
  const[showmarkPopup,setShowMarkPopup]=useState(false)
  const[changes,setChanges]=useState("")
  ///delete student
  const DeleteStudent_semistar=async(exam_id)=>{
    console.log(exam_id,id)
    const res = await axios.delete(`https://bput-result-backand.onrender.com/api/v1/student/delete/semistar/${id}?exam_id=${exam_id}`, 
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("Bputoken")}`
      }
    }
    );
      if(res.data.success){
        toast.success(res.data.message);
        change(res.data);
        setDeletePopup(false)
       }else{
        toast.error(res.data.message)
       }
         
  }

  ///update student exam/////////////

  const Update_student_semistar=async(e)=>{
    e.preventDefault()
    const res = await axios.put(`https://bput-result-backand.onrender.com/api/v1/student/update/${id}?exam_id=${exam._id}`, {semister,type,year},
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("Bputoken")}`
      }
    }
    );
      if(res.data.success){
        toast.success(res.data.message);
        change(res.data);
        setSemistartPopap(false)
       }else{
        toast.error(res.data.message)
       }
  }
  useEffect(() =>{
    settype(semister%2==0?"Even":"Odd")
  },[semister,semistartPopap])


  //add mark students
  const HandleupdateMark=async(e)=>{
    e.preventDefault()
    const res = await axios.post(`https://bput-result-backand.onrender.com/api/v1/student/add/mark`, {subjectCode,subjectName,type:Type,cradit,finamGrade,examId},
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("Bputoken")}`
      }
    }
    );
      if(res.data.success){
        toast.success(res.data.message);
        change(res.data.message);
        setChanges(res.data);
       }else{
        toast.error(res.data.message)
       }
  }

  
  //get mark students
  const getMark=async(e)=>{
    const res = await axios.get(`https://bput-result-backand.onrender.com/api/v1/student/get/mark/${examId}`);
      if(res.data.success){
        setMark(res.data.mark)
        change(res.data);
        setAddMarkPopup(false)
       }else{
        toast.error(res.data.message)
       }
  }
  useEffect(() => {
  getMark()
  }, [changes])
  return (
    <>
    <div className="p-1 border flex  gap-x-7 mt-2 shadow bg-white md:w-fit font-semibold justify-between text-sm items-center ">
         <h2 className="w-28">Semister -{exam.semister}</h2>
         <h3 className="w-28">{exam.type} -({exam.year}) </h3>
         <div className="flex sm:flex-row flex-col  justify-center items-center">
         <button onClick={()=>setAddMarkPopup(!addMarkPopup)} className="bg-green-600 px-4 p-2 border shadow-xl rounded text-white font-semibold ">Add Mark</button>
         
         <button onClick={()=>setShowMarkPopup(!showmarkPopup)} className="bg-blue-600 px-4 p-2 border shadow-xl rounded text-white font-semibold mx-4">Vew Mark</button>

          <button onClick={()=>{
            setSemistartPopap(!semistartPopap)
            setSemistar(exam.semister)
            setyear(exam.year)
            settype(exam.type)
          }
            
          } className="bg-zinc-600 px-4 p-2 border shadow-xl mx-2 rounded text-white font-semibold" ><ion-icon name="open-outline"></ion-icon></button>

         <button onClick={()=>{
          setDeletePopup(!deletePopup)
         }} className="bg-red-600 px-4 p-2 border shadow-xl rounded text-white font-semibold">x</button>
         </div>
       </div>

       {/* ////eddetPopup */}
       
<Model popup={semistartPopap}>
   <div className="w-full h-full flex justify-center items-center ">
   <form onSubmit={Update_student_semistar} className=" flex flex-col gap-y-4 w-80 p-4 border shadow-md rounded bg-white">
      <div>
         <button type="button" onClick={()=>setSemistartPopap(!semistartPopap)} className="float-right text-red-500">X</button>
      </div>
    <input type="text" value={semister} onChange={(e)=>setSemistar(e.target.value)}  className="p-4 outline-none border-black  border-b-2  w-full" placeholder="semister"/>

    <select value={type} onChange={(e)=>settype(e.target.value)} name="" id=""  className="p-4 outline-none border-black  border-b-2  w-full">
      <option value="">select Type odd/even</option>
      <option value="Odd">odd</option>
      <option value="Even">Even</option>
    </select>

    <input type="text"value={year} onChange={(e)=>setyear(e.target.value)}  className="p-4 outline-none border-black  border-b-2  w-full" placeholder="Year"/>

    <button type="submit" className="p-2 bg-blue-500 text-white font-semibold rounded shadow-md">Update semistar</button>
   </form>
   </div>
</Model>

       {/* //////////deletePoPap */}
  <Model popup={deletePopup}>

<div className="w-full h-full flex justify-center items-center">
     <div className="bg-white p-3 w-96 border shadow rounded flex justify-between *:duration-300">
          <button onClick={()=>setDeletePopup(!deletePopup)} className="bg-blue-600 p-2 px-6 text-white font-semibold border rounded-md shadow-xl hover:bg-blue-700 ">Cancel</button>

          <button  onClick={()=>{
           DeleteStudent_semistar(exam?._id)
          }} className="bg-red-600 p-2 px-6 text-white font-semibold border rounded-md shadow-xl hover:bg-red-700 ">Confirm</button>
     </div>
</div>

</Model>
{/* End DeletePopp */}
{/* ///addMark */}
<Model popup={addMarkPopup}>
   <div className="w-full h-full flex justify-center items-center">
                  <form onSubmit={HandleupdateMark} className=" bg-white *:outline-none  *:p-4 p-4 shadow rounded gap-y-3 flex lg:flex-row flex-col gap-x-3 border">
                     <div>
                      <button type="button"  onClick={()=>setAddMarkPopup(!addMarkPopup)} className="float-right  text-red-500 bg-zinc-700 px-2 rounded-full">X</button>
                     </div>
                     <input type="text" value={subjectCode} onChange={(e)=>setsubjectCode(e.target.value)}  placeholder="subjectCode" className=" border-b-2 border-black" />
                     <input type="text" value={subjectName} onChange={(e)=>setsubjectName(e.target.value)}  placeholder="subjectName" className="border-b-2 border-black" />
                     <input type="text" value={Type} onChange={(e)=>setype(e.target.value)} placeholder="type"        className="border-b-2 border-black" />
                     <input type="text" value={cradit} onChange={(e)=>setcradit(e.target.value)} placeholder="cradit"       className="border-b-2 border-black" />
                     <input type="text" value={finamGrade} onChange={(e)=>setfinamGrade(e.target.value)} placeholder="finamGrade"   className="border-b-2 border-black" />
                     <button className="bg-blue-500  text-white font-semibold rounded shadow-md">Add Mark</button>
                  </form>
   </div>
</Model>
{/* ///end addMark */}


{/* ///show mark */}
<Model popup={showmarkPopup}>
<div className="flex justify-center items-center overflow-x-auto h-full">
   <div className="p-2 bg-white overflow-x-auto">
    <div>
      <button onClick={()=>setShowMarkPopup(!showmarkPopup)} className="float-right text-red-500 bg-zinc-700 px-2 m-3 rounded-full">X</button>
    </div>
   <table className="overflow-x-auto" >
  <thead>
    <tr className="*:p-2 *:px-5 *:border-r *:text-white *:bg-zinc-600 ">
      <th>subjectCode</th>
      <th>subjectName</th>
      <th>Type</th>
      <th>cradit</th>
      <th>finamGrade</th>
    </tr>
  </thead>
  <tbody>
    {mark && mark.map((item, index)=>(
      <tr key={index} className="*:bg-white *:p-2 *:border">
        <td>{item.subjectCode}</td>
        <td>{item.subjectName}</td>
        <td>{item.type}</td>
        <td>{item.cradit}</td>
        <td>{item.finamGrade}</td>
      </tr>
    ))}
  </tbody>
 
</table>
   </div>
</div>
</Model>

{/* end mark */}

       </>
  )
}

export default Semistar
