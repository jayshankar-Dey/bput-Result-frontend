import Home from "./admin/Home"
import Login from "./admin/Login"
import PageNotFound from "./components/PageNotFound"
import Result from "./pages/Result"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import  { Toaster } from 'react-hot-toast';
import Protected from "./protectedRoutes/Protected"
import PublicRoute from "./protectedRoutes/PublicRoute"
import College from "./admin/College"
import Students from "./admin/Students"
import College_Students from "./admin/College_Students"
import SingleStudent from "./admin/SingleStudent"
import RecheckingApply from "./admin/RecheckingApply"
import { io } from "socket.io-client"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setSocket } from "./redux/SocketSlice"

const App = () => {
  const dispatch=useDispatch()
 
  useEffect(() => {
    dispatch(setSocket(io(`http://localhost:8080/`)))
  }, [])
  return (
    <>
      <BrowserRouter>
      <Toaster/>
        <Routes>
          <Route path="/bput/result" element={<Result />} />
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/admin/add-college" element={<Protected><College /></Protected>} />
          <Route path="/admin/students" element={<Protected><Students /></Protected>} />
          <Route path="/admin/students/:id" element={<Protected><College_Students /></Protected>} />
          <Route path="/single/students/:id" element={<Protected><SingleStudent /></Protected>} />
          <Route path="/rechicking" element={<Protected><RecheckingApply /></Protected>} />
          <Route path="/admin" element={<Protected><Home /></Protected>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
