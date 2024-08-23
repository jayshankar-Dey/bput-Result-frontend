/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react"
import Box1 from "../components/Box1"
import axios from "axios"
import toast from "react-hot-toast"
import { Button, Dialog, TextField } from "@mui/material"
import RecheckingTableRow from "../components/RecheckingTableRow"
import { useSelector } from "react-redux"


const Result = () => {
    const {Io}=useSelector(state=>state.socket)
    const [Date,setdet]=useState("")
    const[type,setType]=useState("")
    const[reg,setReg]=useState("")
    const[Collage,setCollage]=useState()
    const[student,setStudent]=useState()
    const[exam,setExam]=useState([])
    const[Disabled,setDisabled]=useState(false)
    const[showMark,setShowMark]=useState(false)
    const[ditails,setditails]=useState()
    const [mark,setMark]=useState([])
    const[open,setOpen]=useState(false)
    const[rechecking,setRechecking]=useState([])
  const[change,setChange]=useState("")
  const[examId,setExamId]=useState("")
    const[Name,setName]=useState("")
    const[Reg,setRegNo]=useState("")
    const[collage,setcollage]=useState("")
    const[semistar,setSemistar]=useState("")
    const[subject,setsubject]=useState("")
    const[subjects,setSubjects]=useState([])
    const[subjectprice,setSubjectprice]=useState(0)
    const getExamData = async(e) =>{
        e.preventDefault()
        try {
            const response = await axios.get(`https://bput-result-backand.onrender.com/api/v1/student/get/exam/${reg}/${type}`)
            if(response.data.success) {
                setDisabled(true)
                console.log(response.data)
                setExam(response.data.exam)
                setCollage(response.data.Collage)
                setStudent(response.data.student)
                toast.success(response.data.message)
            }else{
                setDisabled(false)
                toast.error(response.data.message)
               
            }
        } catch (error) {
            toast.error("Failed to fetch exam data")
            console.error(error)
           
        }
    }
const showResult=async(data)=>{
    setditails(data)
    setShowMark(true)
    const examId=data._id
    setExamId(examId)
    const res = await axios.get(`https://bput-result-backand.onrender.com/api/v1/student/get/mark/${examId}`);
    const respons = await axios.get(`https://bput-result-backand.onrender.com/api/v1/student/get/rechecking/${examId}`);
    setRechecking(respons.data.rechecking)

      if(res.data.success){
        setMark(res.data.mark)
       }else{
        toast.error(res.data.message)
       }
}
   // console.log(ditails,Collage,student,exam)
  //get mark students
  ///add subjects
  const HandleaddSubjects=async()=>{
    if(subject===""){
      toast.error("Please enter subject")
      return
    }
    setSubjects((prev)=>[...prev,subject])
    setSubjectprice(500*(subjects.length+1))
    setsubject("")

  }
  useEffect(()=>{
    if(examId){
        const showrechecking=async()=>{
            const respons = await axios.get(`https://bput-result-backand.onrender.com/api/v1/student/get/rechecking/${examId}`);
            setRechecking(respons.data.rechecking)
       
        }
        showrechecking()
    }
  },[change,examId])

  ///rechacking applying
  const rechecking_apply=async(e)=>{
    e.preventDefault()
    if(!subjects&&!collage&&!Name&&!Reg&&!semistar&&!subjectprice){
        toast.error("Please fill all the fields")
        return
    }
    console.log(subjects,collage,Name,Reg,semistar,subjectprice)
    const res = await axios.post(`https://bput-result-backand.onrender.com/api/v1/student/rechecking/subjects`, {subjects,collage,name:Name,reg:Reg,semistar,price:subjectprice,semistarID:ditails._id} )

  console.log(res.data.order,collage,Name,Reg,semistar,subjectprice)
     const data=res.data.order
    var options = {
      key: 'rzp_test_Ww0iu7fNG3RgTd', 
      amount: data.amount, 
      currency: "INR",
      name: "BPUT RESULT",
      description: "Test Transaction",
      image: "https://images.shiksha.com/mediadata/images/1612769635phpHzDZF2.jpeg",
      order_id: data.id, 
      handler:async function (response){
        // http://localhost:8080/api/v1/student/varify/payment
        const body={
       razorpay_payment_id: response.razorpay_payment_id,
       razorpay_order_id: response.razorpay_order_id,
       razorpay_signature:response.razorpay_signature,
       subjects,
       collage,
       name:Name,
       reg:Reg,semistar,
       price:subjectprice,
       semistarID:ditails._id
        }
        const res = await axios.post(`https://bput-result-backand.onrender.com/api/v1/student/varify/payment`,body)

        if(res.data.success){
            toast.success("payment succesfully")
            setDisabled(false)
            setOpen(false)
            setChange(res.data)
            if(Io){
                Io.emit("sendData",res.data)
               }
        }
        
    },
      prefill: {
          name: Name,
          email: "bput@gmail.com",
          contact: "9000090000"
      },
      notes: {
          "address": "Razorpay Corporate Office"
      },
      theme: {
          color: "#3399cc"
      }
  };
  const rzorpay = new window.Razorpay(options);
  rzorpay.open() 
  }

  
  

  return (
    <>
     <div className="h-fit bg-zinc-200   pb-48">
         <div className="mx-auto md:w-[70%] w-full  p-2 ">
         <h3 className="font-bold text-red-500 mb-6">STUDENTS RESULT SUMMARY</h3>

        <form onSubmit={getExamData} className="bg-white  pb-10 rounded border shadow">
        <div className=" p-1  flex  lg:flex-row flex-col *:border  *:m-2  *:rounded-md *:outline-none lg:*:w-96  *:h-12 ">
           {
            Disabled?<select value={type} name="" id="" className="px-2" disabled>
            <option className="bg-zinc-500 p-1 text-white" >select-session</option>
             <option value="Odd">Odd</option>
             <option value="Even">Even</option>
            </select>:<select value={type} onChange={(e)=>setType(e.target.value)} name="" id="" className="px-2" >
           <option className="bg-zinc-500 p-1 text-white" >select-session</option>
            <option value="Odd">Odd</option>
            <option value="Even">Even</option>
           </select>
           }

           {
            Disabled?<input type="number" value={reg}  placeholder="Reg No." required className="px-5  focus:bg-zinc-100 focus:ou" disabled/>:<input type="number" value={reg} onChange={(e)=>setReg(e.target.value)}  placeholder="Reg No." required className="px-5  focus:bg-zinc-100 focus:ou"/>
           }

           {
            Disabled?<input id="data" type="date"  value={Date} placeholder="BOB."  required   className="px-5 focus:bg-zinc-100 focus:ou" disabled/>:<input id="data" type="date"  value={Date} onChange={(e)=>setdet(e.target.value)} placeholder="BOB."  required   className="px-5 focus:bg-zinc-100 focus:ou" />
           }

           <div className="border-none p-0 flex justify-start items-center gap-3 ">
           <button type="submit" className="w-24 px-7 rounded-md bg-violet-600 text-white h-10">Vew</button> 
           
           </div>
         </div>
         <div className="px-3 sm:mt-2">
         <button type="button" onClick={()=>{
            setDisabled(false)
            setReg("")
            setType("")
            setdet("")
            setExam("")
            setShowMark(false)
            setRechecking([])
            }} className="w-24 px-7 rounded-md bg-zinc-600 text-white h-10">Reset</button>
         </div>
        </form>


        { !exam.length==0&&<h3 className="my-5 font-bold text-zinc-600">PUBLISHED RESULT LIST SUMMARY</h3>}
         {/* /////////////examlist */}
          <div className="bg-white overflow-hidden rounded border shadow ">
          {!exam.length==0&&<table className=" overflow-x-auto w-full">
            <thead className="bg-gray-700">
            <tr className="*:border-r *:text-start  *:p-2 text-zinc-200 text-sm">
                <th className="w-28 ">S.No</th>
                <th className="w-[36rem]">Course Name</th>
                <th className="w-52 ">Session</th>
                <th className="w-44  "></th>
            </tr>
            </thead>
            <tbody>
                {
                    exam.map((data,i)=>(
                        <tr  key={i} className="*:border *:text-start  *:p-2 text-zinc-800 font-semibold text-sm">
                        <td className="w-28 ">{i+1}</td>
                        <td className="w-[36rem]">B tech {student.branch} Semister-{data.semister}</td>
                        <td className="w-52 ">{data.type}({data.year})</td>
                        <td className="w-44  border-none flex justify-center items-center">
                             <button onClick={()=>showResult(data)} type="button" className="w-20 px-5 rounded-md bg-violet-600 text-white h-10">Vew</button> </td>
                    </tr>
                    ))
                }
                {/* //tablerow */}
           
             {/*end //tablerow */}
            
            </tbody>
           </table>}
          </div>
         {/*end /////////////examlist */}

         { !rechecking.length==0&&<h3 className="my-5 font-bold text-zinc-600">APPLY RECHECKING LIST SUMMARY</h3>}
         {/* /////////////examlist */}
          <div className="bg-white overflow-hidden rounded border shadow ">
          {!rechecking.length==0&&<table className=" overflow-x-auto w-full">
            <thead className="bg-gray-700">
            <tr className="*:border-r *:text-start  *:p-2 text-zinc-200 text-sm">
                <th className="w-28 ">S.No</th>
                <th className="w-48">Semistar Name</th>
                <th className="w-52 ">Total subject</th>
                <th className="w-44  "></th>
            </tr>
            </thead>
           
            <tbody>
                {
                    rechecking.map((data,i)=>(
                       <RecheckingTableRow key={i} data={data} i={i}/>
                    ))
                }
                {/* //tablerow */}
           
             {/*end //tablerow */}
            
            </tbody>
           </table>}
          </div>
         {/*end /////////////examlist */}

         {showMark&&<h3 className="my-5 font-bold text-zinc-600">STUDEN RESULT SUMMARY</h3>}
         {/* STUDEN RESULT SUMMARY */}
         {showMark&&<div className="p-5 bg-white border rounded shadow ">
             <div className="border rounded flex">
                <div className="w-full border-r">
                      <div className="overflow-x-auto">
                        <tr className=" border-b flex *:p-3">
                            <td className="w-40 border-r text-start">Reg No</td>
                            <td className="w-full flex  items-center">{student.reg}</td>
                        </tr>

                        <tr className=" border-b flex *:p-3">
                            <td className="w-40 border-r text-start">Name</td>
                            <td className="w-full flex  items-center"> {student.studentName}</td>
                        </tr>

                        <tr className=" border-b flex *:p-3">
                            <td className="w-40 border-r text-start">College</td>
                            <td className="w-full flex  items-center">{Collage.collageName}</td>
                        </tr>

                        <tr className=" border-b flex *:p-3">
                            <td className="w-40 border-r text-start">Branch</td>
                            <td className="w-full flex  items-center">Btech({student.branch}) Semister-{ditails.semister}</td>
                        </tr>
                        <tr className=" border-b flex *:p-3">
                            <td className="w-40 border-r text-start">Examination</td>
                            <td className="w-full flex  items-center">Semistar-{ditails.semister} {ditails.type}({ditails.year})</td>
                        </tr>

                      
                      </div>
                </div>
                <div className="w-80  hidden sm:flex justify-center items-center p-2">

                 {
                    student.image.url?<img src={student.image.url}  className="h-56"/>:<img src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg="  className="h-60"/>
                 }
                </div>
             </div>
         </div>}
           {/*end- STUDEN RESULT SUMMARY */}

           {/* show all result */}
          {showMark&& <h3 className="my-5 font-bold text-zinc-600">Semester:{ditails.semister} Examination {ditails.year}</h3>}
             {mark.length==0 && showMark&&<h1 className="text-red-500">No mark such found...</h1>}
           {showMark&&<div className="bg-white overflow-hidden rounded  shadow ">
          {mark.length >0&&<table className=" overflow-x-auto">
            <thead className="bg-gray-700">
            <tr className="*:border-r *:text-start  *:p-2 text-zinc-200 text-sm">
                <th className="w-28 ">S.No</th>
                <th className="w-52 ">Subject Code</th>
                <th className="w-[36rem]">Subject Name</th>
                <th className="w-44  ">Type</th>
                <th className="w-44  ">Credit</th>
                <th className="w-44  ">Final Grade</th>
            </tr>
            </thead>
            <tbody>
                {/* //tablerow */}
            {
                mark?.map((data,i)=>(
    <tr key={i} className="*:border *:text-start  *:p-2 text-zinc-800 font-semibold text-sm">
                <td className="w-28 ">{i+1}</td>
                <td className="w-52 ">{data.subjectCode}</td>
                <td className="w-[36rem]">{data.subjectName}</td>
                <th className="w-44  ">{data.type}</th>
                <th className="w-44  ">{data.cradit}</th>
                <th className="w-44  ">{data.finamGrade}</th>
            </tr>
                ))
            }
             {/*end //tablerow */}
            
            
            <tr className="*:text-start  *:p-2 text-zinc-800 font-semibold text-sm">
                <td className="w-28 "></td>
                <td className="w-52 "></td>
                <td className="w-[36rem]"></td>
                <th className="w-44  "></th>
                <th className="w-52 text-[.8rem]">
                    <p className="text-center">Total Credit</p>
                    <p className="text-center">22</p>
                </th>
                <th className="w-52 ">
                    SGPA:7.14
                </th>
            </tr>
           
            </tbody>
            
           </table>}
          </div>}
            {/*end show all result */}
            {showMark&&<div className="flex gap-x-2 justify-end">
                <button onClick={()=>setOpen(!open)} className="bg-green-500 p-2 px-6 text-sm rounded-md m-2 text-white border shadow">
                    Apply Rechecking
                </button>
                <button onClick={()=>{
                    window.print()
                }} className="bg-violet-500 p-2 px-6 text-sm rounded-md m-2 text-white border shadow">Print</button>
            </div>}

            <Box1/>
           
         </div>
     </div>


{/* //////apply rechacking */}
<Dialog open={open} onClose={()=>setOpen(!open)}>
   <div className="w-full h-full flex justify-center items-center ">
       <form onSubmit={rechecking_apply} className="w-[30rem] flex flex-col gap-y-4 p-3 bg-white border shadow rounded">
        <div className="flex justify-end">
            <Button type="button" onClick={()=>setOpen(!open)} variant="contained" color="error">X</Button>
        </div>
         <TextField label="Enter your name"  className="w-full" onChange={(e)=>setName(e.target.value)}/>
         <TextField label="Enter your Reg no"  className="w-full" onChange={(e)=>setRegNo(e.target.value)}/>
         <TextField label="Enter your college name"  className="w-full" onChange={(e)=>setcollage(e.target.value)}/>
         <TextField label="Enter semistar name which should you apply naw"  className="w-full" onChange={(e)=>setSemistar(e.target.value)}/>
            <div className="flex justify-between gap-x-3">
                <TextField value={subject} className="w-full" label="Add subject" onChange={(e)=>setsubject(e.target.value)}/>
                <Button type="button" onClick={HandleaddSubjects} variant="contained">add</Button>
                <Button type="button" onClick={()=>{
                    setSubjects([])
                    setSubjectprice(0)
                }} variant="contained" color="inherit">reset</Button>
            </div>
            <div className="flex flex-col gap-y-2">
                {
                    subjects.map((subject,i)=>(
                        <h1 key={i} className="p-2 border shadow-lg rounded bg-zinc-700 text-sm  text-white font-semibold ">{subject}</h1>
                    ))
                }
            </div>
         <h1 className="font-bold text-green-500">Total: <span className="text-orange-600">₹{subjectprice}</span></h1>
         <Button type="submit" variant="contained" color="primary" size="medium">pay and apply</Button>
       </form>
   </div>
</Dialog>
    
    </>
  )
}

export default Result
