/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom"

const Protected = ({children}) => {
  const Token=localStorage.getItem("Bputoken")

  if(Token){
    return children
  }else{
    return <Navigate to="/" />
  }

}

export default Protected
