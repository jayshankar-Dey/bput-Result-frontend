import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pagination } from "@mui/material";
import Model from "../components/Model";

const College_Students = () => {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchReg, setSearchReg] = useState("");
  const[change,setChange] = useState("")
  const[eddetPopup,setEddetPopup] = useState(false)
  const [value, setValue] = useState("select-college")
  const [collage, setCollage] = useState("")
  const [studentName, setStudentName] = useState("")
  const [branch, setBranch] = useState("")
  const [reg, setReg] = useState("")
  const [address, setAddress] = useState("")
  const[selectButton,setSectButton] = useState(false)
  const[colleges,setColleges]=useState([])
  const[search,setSearch]=useState("")
  const[ID,setID]=useState("")
  const[deletePopup,setDeletePopup] = useState(false)
  console.log(id)
  const getSingleStudent=async(id)=>{
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
  data.forEach((value)=>{
    setValue(value.collage.collageName)
    setStudentName(value.studentName)
    setBranch(value.branch)
    setReg(value.reg)
    setAddress(value.address)
  })
  }

  ///Update  student
const handlesubmit = async (e) => {
  e.preventDefault();
  //setloading(true);
  const res = await axios.put(`https://bput-result-backand.onrender.com/api/v1/student/profile/update/${ID}`, {
    collage, studentName, branch, reg, address
  },
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
  setEddetPopup(false)
 }else{
  toast.error(res.data.message)
 }
   
 // setloading(false);
};

///delete student
const DeleteStudent=async(id)=>{
  const res = await axios.delete(`https://bput-result-backand.onrender.com/api/v1/student/delete/${id}`, 
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
    setDeletePopup(false)
   }else{
    toast.error(res.data.message)
   }
     
}

  ///get all collage
const getAllCollage =async()=>{
  const res = await axios.get(`https://bput-result-backand.onrender.com/api/v1/collage/all/${search}`,{
      headers:{
          Authorization: `Bearer ${localStorage.getItem("Bputoken")}`,
      }
  })
 setColleges(res.data.collage)
}

  ///get all student
  const get_all_students = async () => {
  
    const res = await axios.get(
      `https://bput-result-backand.onrender.com/api/v1/student/all?collage=${id}&page=${page}&reg=${searchReg}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Bputoken")}`,
        },
      }
    );

    if (res.data.success) {
      setStudents(res.data.students);
      setTotalPage(res.data.TotalPage);
    } else {
      toast.error(res.data.message);
    }
  };
  useEffect(() => {
    get_all_students();
    getAllCollage()
  }, [id, searchReg,change,search,page]);


  const changePagination = async (e, data) => {
    setPage(data);
  };
  return (
    <Layout>
      <div className="p-2 px-4 bg-white w-fit border shadow rounded">
        <input
          value={searchReg}
          onChange={(e) => setSearchReg(e.target.value)}
          type="text"
          className="h-full w-96 font-semibold p-3 outline-none "
          placeholder="Search Student By Reg no.."
        />
        <button>
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </div>

      <div className="overflow-x-auto lg:w-[80rem] mt-5 border shadow rounded">
        <table className="border overflow-x-auto *:border bg-white">
          <thead>
            <tr className="*:p-1 bg-zinc-700 text-white *:border">
              <th className="w-80">Collage</th>
              <th className="w-72">Student Name</th>
              <th className="w-96">Branch</th>
              <th className="w-80">Reg No.</th>
              <th className="w-52">Address</th>
              <th className="w-60">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((data, i) => (
              <tr key={i} className="*:border *:p-2">
                <td>{data.collage.collageName}</td>
                <td>{data.studentName}</td>
                <td>{data.branch}</td>
                <td>{data.reg}</td>
                <td>{data.address}</td>
                <td className="flex justify-between items-center gap-x-3 border-none   lg:*:text-xl *:border *:p-1 *:shadow *:text-white *:px-2 *:rounded-full">
                  <button onClick={()=>{
                    setEddetPopup(!eddetPopup)
                    getSingleStudent(data?._id)
                    setID(data?._id)
                  }} id="eddit" className="bg-green-500">
                    <ion-icon name="open-outline"></ion-icon>
                  </button>
                  <button onClick={()=>{
                    setDeletePopup(!deletePopup)
                    setID(data?._id)
                  }} id="delete" className="bg-red-500">
                    <ion-icon name="trash-outline"></ion-icon>
                  </button>
                  <Link to={`/single/students/${data?._id}`} id="vew" className="bg-[#2ab3f8]">
                    <ion-icon name="eye-outline"></ion-icon>
                  </Link>
                </td>
              </tr>
            ))}

            {students.length == 0 && (
              <div className="  h-full  flex justify-center items-center">
                <h1 className=" mt-4 text-red-500 animate-bounce">
                  Not student found....
                </h1>
              </div>
            )}
          </tbody>
        </table>

        <div className="bg-white p-3 flex justify-end">
          <Pagination count={totalPage} onChange={changePagination} />
        </div>
      </div>

      {/* ////eddetPopup */}

      <Model popup={eddetPopup}>
        <div className="flex justify-center items-center h-screen">
                <form onSubmit={handlesubmit} className="md:w-[30rem] w-96 flex flex-col p-6 rounded shadow bg-white border gap-y-7">
                  <div className="flex justify-between ">
                  
                    <input id="collage" type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search-Collage..." className="p-2 border-b border-black w-full outline-none" />
                    <button type="button" onClick={()=>setEddetPopup(!eddetPopup)} className="float-end text-red-600 text-xl"><ion-icon name="close-circle-outline"></ion-icon></button>
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

      {/* end EddetpoPUp */}

{/* //////////deletePoPap */}
      <Model popup={deletePopup}>

       <div className="w-full h-full flex justify-center items-center">
            <div className="bg-white p-3 w-96 border shadow rounded flex justify-between *:duration-300">
                 <button onClick={()=>setDeletePopup(!deletePopup)} className="bg-blue-600 p-2 px-6 text-white font-semibold border rounded-md shadow-xl hover:bg-blue-700 ">Cancel</button>

                 <button  onClick={()=>{
                  DeleteStudent(ID)
                 }} className="bg-red-600 p-2 px-6 text-white font-semibold border rounded-md shadow-xl hover:bg-red-700 ">Confirm</button>
            </div>
       </div>

      </Model>
      {/* End DeletePopp */}
    </Layout>
  );
};

export default College_Students;
