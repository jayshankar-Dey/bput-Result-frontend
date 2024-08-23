
import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Model from "../components/Model"
import axios from "axios"
import { Pagination } from "@mui/material"
import toast from "react-hot-toast"


const Students = () => {
  const[open,setOpen]=useState(false)
  // collage, studentName, branch, reg, address 
  const [value, setValue] = useState("select-college")
  const [collage, setCollage] = useState("")
  const [studentName, setStudentName] = useState("")
  const [page, setPage] = useState(1)
  const[change, setChange] = useState("")
  const [branch, setBranch] = useState("")
  const [reg, setReg] = useState("")
  const [address, setAddress] = useState("")
  const[selectButton,setSectButton] = useState(false)
 const[colleges,setColleges]=useState([])
 const[search,setSearch]=useState("")
 const[students,setStudents] = useState([])
 const[Student_search,set_student_Search] = useState("")
 const[totalPages,setTotalPages] = useState(1)
  ///get All Collage
const getAllCollage =async()=>{
  const res = await axios.get(`https://bput-result-backand.onrender.com/api/v1/collage/all/${search}`,{
      headers:{
          Authorization: `Bearer ${localStorage.getItem("Bputoken")}`,
      }
  })
 setColleges(res.data.collage)
}

useEffect(()=>{
getAllCollage()
},[search])


///add student
const handlesubmit = async (e) => {
  e.preventDefault();
  //setloading(true);
  const res = await axios.post(`https://bput-result-backand.onrender.com/api/v1/student/add`, {
    collage, studentName, branch, reg, address
  },
  {
    headers:{
        Authorization: `Bearer ${localStorage.getItem("Bputoken")}`,
    }
}
);
  console.log(res.data)
 if(res.data.success){
  toast.success(res.data.message);
  setChange(res.data.message);
    setStudentName("");
    setReg("");
    setAddress("");
 }else{
  toast.error(res.data.message)
 }
   
 // setloading(false);
};


///get all student
const get_all_students = async () => {
  
  //setloading(true);
  const res = await axios.get(`https://bput-result-backand.onrender.com/api/v1/student/all?reg=${Student_search}&page=${page}`,
  {
    headers:{
      Authorization: `Bearer ${localStorage.getItem("Bputoken")}`,
  }
}
);
  
 if(res.data.success){
  setChange(res.data.message);
    setStudents(res.data.students)
    setTotalPages(res.data.TotalPage)
 }else{
  toast.error(res.data.message)
 }
};
 useEffect(() => {
  get_all_students()
 }, [Student_search,change,page])
 
const changePagination=async(e,data)=>{
setPage(data)
}

  return (
    <Layout>
      <div className="lg:w-[70rem]  p-3 bg-white shadow border">
         <div className="flex md:flex-row flex-col justify-between items-center">
          <input type="text" value={Student_search} onChange={(e)=>set_student_Search(e.target.value)} placeholder="Search Student by Reg No.." className="px-5 h-14 md:w-[30rem] w-full rounded-full outline-none border" />
          <button onClick={()=>setOpen(!open)} className="p-2 bg-blue-600 px-3 mt-4 md:mt-0 flex justify-center items-center gap-x-3 rounded text-white ">Add students<ion-icon name="add-circle-outline"></ion-icon></button>
         </div>
      </div>

      <Model popup={open}>
        <div className="flex justify-center items-center h-screen">
                <form onSubmit={handlesubmit} className="md:w-[30rem] w-96 flex flex-col p-6 rounded shadow bg-white border gap-y-7">
                  <div className="flex justify-between ">
                  
                    <input id="collage" type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search-Collage..." className="p-2 border-b border-black w-full outline-none" />
                    <button type="button" onClick={()=>setOpen(!open)} className="float-end text-red-600 text-xl"><ion-icon name="close-circle-outline"></ion-icon></button>
                  </div>

                  <div className="border-b relative border-black h-fit">
                      <div  onClick={()=>{
                          setSectButton(!selectButton)
                        }} className="flex cursor-pointer  justify-between">
                        <p className="font-bold p-2">{value}</p>
                        <button type="button" className={` duration-300 ${!selectButton&&"rotate-90"}`}><ion-icon name="chevron-down-outline"></ion-icon></button>
                      </div>

                <div className={`${selectButton?"absolute":"hidden"}  bg-white p-2 border rounded shadow-md z-30`}>
                          
                      {
                  colleges.map((data,i)=>(
                    <p onClick={()=>{
                      setValue(data?.collageName)
                      setCollage(data?._id)
                      setSectButton(!selectButton)
                    }} className="p-2 cursor-pointer hover:bg-zinc-200" key={i}>{data?.collageName}</p>
                  ))
                   }
                   {colleges.length==0&&<div className="  h-full  flex justify-center items-center">
                  <h1 className="text-xl animate-bounce"> search valide collage</h1>
                 </div>}
                 </div>
                  </div>


                  <input type="text" placeholder="Student Name"
                  value={studentName} onChange={(e)=>setStudentName(e.target.value)} className="border-b-2 outline-none border-black font-semibold p-2 px-4"/>

                  <select name="" id="" value={branch} onChange={(e)=>setBranch(e.target.value)} className="border-b-2  outline-none border-black font-semibold p-2 px-4">
                    <option value={""}  className="bg-blue-400">select branch</option>

                    <option value="Computer Science and Engineering (SCE)">Computer Science and Engineering (SCE)</option>

                    <option value="Civil Engineering (CE)">Civil Engineering (CE)</option>

                    <option value="Electrical Engineering (EE)">Electrical Engineering (EE)</option>

                    <option value="Mechanical Engineering (ME)">Mechanical Engineering (ME)</option>
                  </select>

                   <input type="text" placeholder="Student Reg no.."
                  value={reg} onChange={(e)=>setReg(e.target.value)} className="border-b-2 outline-none border-black font-semibold p-2 px-4"/>

                  <input type="text" placeholder="Student Address.."
                  value={address} onChange={(e)=>setAddress(e.target.value)} className="border-b-2 outline-none border-black font-semibold p-2 px-4"/>


                  <div>
                  <button className="bg-blue-600 p-2 rounded text-white font-bold px-4 shadow-lg border hover:bg-blue-700 duration-300">Save Student</button>
                  </div>


                </form>
        </div>
      </Model>



      {/* ///table */}

      <div className="overflow-x-auto lg:w-[70rem] mt-5 border shadow rounded">
        <table  className="border overflow-x-auto *:border bg-white">
          <thead>
            <tr className="*:p-1 bg-zinc-700 text-white *:border">
              <th className="w-80">Collage</th>
              <th className="w-72">Student Name</th>
              <th className="w-96">Branch</th>
              <th className="w-80">Reg No.</th>
              <th className="w-52">Address</th>
            </tr>
          </thead>

          <tbody>
            {
              students.map((data, i) => (
                <tr key={i} className="*:border *:p-2">
                  <td>{data.collage.collageName}</td>
                  <td>{data.studentName}</td>
                  <td>{data.branch}</td>
                  <td>{data.reg}</td>
                  <td>{data.address}</td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <div className="bg-white p-3 flex justify-end">
               
                  <Pagination count={totalPages} onChange={changePagination} />
               
              </div>
      </div>
    </Layout>
  )
}

export default Students
