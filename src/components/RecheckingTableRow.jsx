/* eslint-disable react/prop-types */
import { Dialog } from "@mui/material"
import { useState } from "react"


const RecheckingTableRow = ({data,i}) => {
   
    const[vewRechecking,setVeewRechecking]=useState(false)
    
    
  return (
    <tr   className="*:border *:text-start  *:p-2 text-zinc-800 font-semibold text-sm">
    <td className="w-28 ">{i+1}</td>
    <td className="">Semistar:-{data.semistar}</td>
    <td className="w-36 ">subjects:-{data.subjects.length}</td>
    <td className="w-44  border-none flex justify-between items-center gap-x-2">
        {data.payment? <button type="button" className="px-2 p-2 rounded-md bg-green-600  w-20 text-white ">sussess</button>:<button type="button" className="px-2 p-2 rounded-md bg-red-600 text-white w-20 ">failed</button>}

         <button onClick={()=>setVeewRechecking(!vewRechecking)} type="button" className="px-2 p-2 rounded-md bg-blue-600 text-white ">view</button>

          </td>
          <Dialog open={vewRechecking} onClose={()=>setVeewRechecking(!vewRechecking)}>

            <div className="w-full h-full flex justify-center items-center">
               <div className="md:w-[36rem] font-semibold p-5 bg-white flex flex-col gap-y-3 ">
                <div>
                    <button onClick={()=>setVeewRechecking(!vewRechecking)} className="float-right text-red-500 text-xl">x</button>
                </div>
                 <h1>Semistar :- {data. semistar}</h1>
                 <h1>Collage :- {data. collage}</h1>
                 <h1>Name :- {data. name}</h1>
                 <h1>Reg No :- {data. reg}</h1>
                 <h1>Total Payment :- <span className="text-green-500"> ₹{data. price}</span></h1>
                 {
                    data.subjects.map((subject,i)=>(
                        <h1 className="bg-blue-200  px-4 p-1 my-[.0rem] text-sm rounded shadow-lg" key={i}>{subject}</h1>
                    ))
                 }

                {
                   data.payment?<button className="bg-green-400 text-sm p-1 text-white rounded-md shadow-md w-36"> Payment Success</button> :<button className="bg-red-400 text-sm p-1 text-white rounded-md shadow-md w-36"> Payment Failed</button>
                }
               </div>
            </div>

          </Dialog>
</tr>
  )
}

export default RecheckingTableRow
