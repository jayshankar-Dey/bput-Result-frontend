import { Pagination } from "@mui/material"
import Layout from "../components/Layout"
import CollegeTableRow from "../components/CollegeTableRow"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Loadind from "../components/Loadind";

const College = () => {
    // Add College
    const [collageName, setcollegename] = useState("");
    const [address, setaddress] = useState("");
     const [totalPage, setTotalPage] = useState(1);
    const[Loading,setLoading]=useState(false)
    const [search, setSerch] = useState("");
    const [page, setPage] = useState(1);
   const [colleges,setColleges]=useState([])
   const[change, setChange] = useState("")

    //add college//
    const AddCollege=async(e)=>{
        e.preventDefault()
        setLoading(true)
        const res = await axios.post(`https://bput-result-backand.onrender.com/api/v1/collage/add`, {collageName, address},{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("Bputoken")}`,
            }
        })
        setChange(res.data.message)
        if(res.data.success){
            toast.success(res.data.message)
            setcollegename("")
            setaddress("")
            setLoading(false)
            setChange(res.data.message)
        }else{
            toast.error(res.data.message)
            setLoading(false)
        }
        //console.log(res.data)
    }

///get All Collage
const getAllCollage =async()=>{
    const res = await axios.get(`https://bput-result-backand.onrender.com/api/v1/collage/all/${search}?page=${page}`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("Bputoken")}`,
        }
    })
   setColleges(res.data.collage)
   //setTotalPage(res.data.totapage)
   setTotalPage(res.data.totapage)
}
const changePagination = (e, data) => {
    e.preventDefault();
    setPage(data);
   
  };
//console.log(page)
useEffect(()=>{
getAllCollage()
},[search,page,change])
  return (
    <Layout>
       <div className="flex flex-col lg:justify-start justify-center w-full items-center lg:items-start">



       <form onSubmit={AddCollege} className="p-2 bg-white border shadow rounded md:w-[50rem] w-full ">
           <div className="flex md:flex-row flex-col gap-2">

            <input type="text" className="w-full outline-none  h-14 border border-green-600 px-5 rounded-full font-semibold "  placeholder="Collage Name" required value={collageName} onChange={(e)=>setcollegename(e.target.value)}/>

            <input type="text" className="w-full outline-none  h-14 border border-green-600 px-5 rounded-full font-semibold "  placeholder="Address" required value={address} onChange={(e)=>setaddress(e.target.value)}/>

            {
                Loading?<Loadind/>:<button type="submit" className="p-2  w-28 text-white px-6 border hover:bg-green-700 hover:shadow-xl duration-300 bg-green-600 rounded">Add</button>
            }
           </div>
           
        </form>
{/* ////search bar */}
        <div className="p-2 bg-white border shadow rounded w-full md:w-[50rem] mt-1 flex px-2">
          <input value={search} onChange={(e)=>setSerch(e.target.value)} type="text" placeholder="Search collage" className="w-full h-full outline-none px-4 p-1" />
          <button className="text-2xl"><ion-icon name="search-outline"></ion-icon></button>
        </div>
{/* ////table start */}
        <div className="p-2 bg-white border shadow rounded w-full md:w-[50rem] mt-10 ">
           <table className=" w-full overflow-x-auto">
            <thead>
             <tr className="border   border-black *:p-2">
                <th className="h-10  border-r">College-Name</th>
                <th className="h-10 border-r">College-Address</th>
                <th >Action</th>
             </tr>
            </thead>
            <tbody>
             {
                 colleges.map((collage,index)=>(
                  <CollegeTableRow key={index} collage={collage}change={setChange}/>
                 ))
             }

                 {colleges.length==0&&<div className="  h-full  flex justify-center items-center">
                  <h1 className="text-2xl animate-bounce">College Not found...........</h1>
                 </div>}
            </tbody>
           </table>

           <div className=" w-[90%] mx-auto flex justify-end p-3">
                  <Pagination count={totalPage}  onChange={changePagination}/>
          </div>
        </div>



       </div>
    </Layout>
  )
}

export default College
