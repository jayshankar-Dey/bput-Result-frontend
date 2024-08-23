/* eslint-disable react/prop-types */
import { useState } from "react"
import toast from "react-hot-toast"
import { Link,  useNavigate } from "react-router-dom"


const Layout = ({children}) => {
    const[I,setI]=useState(0)
    const[open,setopen]=useState(false)
    const navigate=useNavigate()
    const menu=[
        {
            label:'Dashboard',
            to:'/admin',
            icon:'bar-chart-outline',
            buttom:true
        },
        {
            label:'AddStudent',
            to:'/admin/students',
            icon:'git-branch-outline',
        },
        {
            label:'Add-college',
            to:'/admin/add-college',
            icon:'business-outline',
        },
        {
            label:'Result',
            to:'/bput/result',
            icon:'male-outline',
        },
        {
            label:"Recheckings",
            to:"/rechicking",
            icon:'document-outline',
        }

        
       
    ]
   
  return (
   <>
   <div className="flex relative">
   <div className={`bg-zinc-800 duration-300 ${open?"block lg:hidden scale-100 z-30  absolute":"hidden lg:block"} h-screen w-80 border-r `}>

  <div className=" flex justify-end">
  <button className={`text-white m-2 lg:hidden block`}onClick={()=>setopen(!open)}><ion-icon name="filter-outline"></ion-icon></button>
  </div>

      <div className="flex flex-col  gap-y-4  text-white  pt-6">
        {
            menu.map((item,i)=>(
                <div key={i}>
                    <Link to={item.to}  onClick={()=>{
                        setI(i)
                        if(item.logout){
                            localStorage.removeItem('Bputoken')
                            navigate('/')
                            toast.success("Logout SuccessFully")
                            
                        }
                    }
                        
                    } className={`flex ${I==i&&"bg-zinc-700"} ${item.top==true&&" mt-20 border-t rounded-none"} ${item.buttom==true&&"mb-28 border-b-2 rounded-none bg-zinc-700"}  items-center gap-x-6 p-2 duration-300 rounded-md shadow-md mx-2 mt-1 hover:bg-zinc-700 `} >
                    <ion-icon name={`${item.icon}`}></ion-icon>
                    <span>{item.label}</span>
                    </Link>
                </div>
            ))
        }
            <div >
                    <button onClick={()=>{
                        localStorage.removeItem('Bputoken')
                        navigate('/')
                        toast.success("Logout SuccessFully")
                    }}  className={`flex border-t m items-center gap-x-6 p-2 duration-300 rounded-md shadow-md mx-2 mt-20 hover:bg-zinc-700 `} >
                    <ion-icon name="log-out-outline"></ion-icon>
                    <span>Log-out</span>
                    </button>
                </div>
      </div>
    </div>

    <div className="overflow-y-auto h-screen w-full bg-zinc-200 ">
        <div className=" text-blue-950 p-2 ">
            <button  className={`${open&&"hidden"} font-semibold text-3xl block lg:hidden`} onClick={()=>setopen(!open)}><ion-icon name="reorder-three-outline"></ion-icon></button>
        </div>
       
        {children}
    </div>
   </div>
   </>
  )
}

export default Layout
