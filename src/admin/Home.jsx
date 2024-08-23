/* eslint-disable no-const-assign */
import Layout from "../components/Layout";
import CountUp from "react-countup";
import UsersTableRow from "../components/UsersTableRow";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loadind from "../components/Loadind";
import { Pagination } from "@mui/material";

const Home = () => {
  const [AddUserPopap, setAddUserpoap] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadind, setloading] = useState(false);
  const [users, setUsers] = useState([]);
  const [change, setChange] = useState("hii");
  const [search, setSerch] = useState("");
  const [page, setPage] = useState();
  const [total, setTotal] = useState(0);
  const [totalUsers,setTotalUsers] = useState(0)
  const[totalCollege,setTotalCollege] = useState(0)
  const[totalStudent,setTotalStudent] = useState(0)
  ///add users////////
  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const res = await axios.post(`https://bput-result-backand.onrender.com/api/v1/auth/register`, {
      name,
      email,
      password,
    });
    toast.success(res.data.message);
    setChange(res.data.message);
    setName("");
    setEmail("");
    setPassword("");
    setloading(false);
  };

  const getUsers = async () => {
    setloading(true);
    const res = await axios.get(
      `https://bput-result-backand.onrender.com/api/v1/auth/get/users/${search}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Bputoken")}`,
        },
      }
    );
    setloading(false);
    setUsers(res.data.user);
    setTotal(res.data.total);
    setTotalUsers(res.data.totalUsers)
    setTotalCollege(res.data.totalCollege)
    setTotalStudent(res.data.TotalStudents)
  };

  const changePagination = (e, data) => {
    e.preventDefault();
    setPage(data);
   
  };

  useEffect(() => {
    getUsers();
  }, [change, search, page]);

  return (
    <>
      <div className="relative">
        <Layout>
          <div className="">
            <div className="flex sm:flex-row flex-col justify-around lg:*:w-80 md:*:w-52  sm:*:w-36  *:h-32 *:bg-white gap-3 *:border *:rounded *:flex *:flex-col *:justify-center *:items-center *:font-bold *:shadow ">
              <div>
                <h3 className="">Total Students</h3>
                <CountUp
                  className="text-3xl"
                  start={0}
                  end={totalStudent}
                  duration={5}
                />
              </div>
              <div>
                <h3 className="">Total College</h3>
                <CountUp
                  className="text-3xl"
                  start={0}
                  end={totalCollege}
                  duration={5}
                />
              </div>
              <div>
                <h3 className="">Total Users</h3>
                <CountUp
                  className="text-3xl"
                  start={0}
                  end={totalUsers}
                  duration={5}
                />
              </div>
            </div>

            {/* ////addusers */}

            <div className="my-3 md:px-4">
              <button
                onClick={() => {
                  setAddUserpoap(!AddUserPopap);
                }}
                className="float-end p-2 border bg-white md:mr-12 m-3 rounded font-semibold"
              >
                Add user
              </button>

              <div className="w-96 px-4 md:ml-9 h-14 bg-white rounded-full overflow-hidden flex shadow border">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSerch(e.target.value);
                  }}
                  placeholder="search...."
                  className="w-full h-full px-4 outline-none   "
                />
                <button className="text-2xl">
                  <ion-icon name="search-outline"></ion-icon>
                </button>
              </div>
            </div>

            <div
              className={`h-screen  ${
                AddUserPopap ? "absolute" : "hidden"
              } absolute duration-300  top-0 left-0 bg-[#5e5e5ea1] z-40 w-full`}
            >
              <div className="w-full flex justify-center items-center h-full">
                <form
                  onSubmit={handlesubmit}
                  className="w-96 h-fit  p-5 bg-zinc-800 border rounded-md shadow-lg flex flex-col *:gap-y-4    *:text-white *:mt-5 "
                >
                  <button
                    type="button"
                    onClick={() => {
                      setAddUserpoap(!AddUserPopap);
                    }}
                    className="bg-red-600 ml-auto px-2 rounded-full"
                  >
                    X
                  </button>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Name"
                    className="focus:bg-zinc-700 p-3 border bg-transparent rounded-md "
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="email"
                    className="focus:bg-zinc-700 p-3 border bg-transparent rounded-md"
                  />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="password No"
                    className="focus:bg-zinc-700 p-3 border bg-transparent rounded-md"
                  />

                  {loadind ? (
                    <Loadind />
                  ) : (
                    <button
                      type="submit"
                      className="bg-green-600 hover:shadow-green-700 duration-300 hover:scale-105 p-2 rounded shadow shadow-zinc-100  ml-auto"
                    >
                      Add User
                    </button>
                  )}
                </form>
              </div>
            </div>

            {/* ///end add user */}
             <div className="bg-white h-fit ">
            <table className="md:w-[93%]  overflow-x-auto mt-4 w-full  bg-white md:mx-auto">
              <thead>
                <tr className="border *:border-r *:p-2">
                
                  <th>id</th>
                  <th>Name</th>
                  <th>email</th>
                  <th className="w-40">Action</th>
                </tr>
              </thead>

              <tbody>
              {users ? (
                users.map((user, i) => <UsersTableRow change={setChange}  key={i} user={user} />)
              ) : (
                <></>
              )}
              </tbody>
               {users.length==0&&<div className="  h-full  flex justify-center items-center">
                  <h1 className="text-2xl animate-bounce">Users Not found...........</h1>
                 </div>}

              
            </table>
            <div className=" w-[90%] mx-auto flex justify-end p-3">
               
                  <Pagination count={total} onChange={changePagination} />
               
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default Home;
