/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom"


const PublicRoute = ({children}) => {
    const Token=localStorage.getItem("Bputoken")

    if(Token){
        return <Navigate to="/admin" />
    }else{
      return children
    }
  
}

export default PublicRoute
