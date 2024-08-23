/* eslint-disable no-unused-vars */
import Layout from "../components/Layout"
import { useEffect, useState } from "react";
//import toast from "react-hot-toast";
import axios from "axios";
import Recheching_Rows from "../components/Recheching_Rows";
import { useSelector } from "react-redux";


const RecheckingApply = () => {
    const[rechecking,setRechecking]=useState([])
    const {Io}=useSelector(state=>state.socket)
    const[change,setChange] = useState("")
   if(Io){
    Io.on("getdata",data=>{
      setChange(data)
     })
  
   }
   useEffect(() => {
    
    const showrechecking=async()=>{
        const respons = await axios.get(`https://bput-result-backand.onrender.com/api/v1/student/getall/rechecking`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("Bputoken")}`,
            },
 
        });
        setRechecking(respons.data.rechecking)
    }
    showrechecking()
   }, [change])
  return (
    <Layout>
      <div className="flex flex-col gap-y-3">
            
         {
            rechecking.map((item, index) => (
              <Recheching_Rows key={index} item={item} />
            ))

          // add more table rows for rechecking records here
         }
      </div>
    </Layout>
  )
}

export default RecheckingApply
