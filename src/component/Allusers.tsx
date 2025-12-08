import { useState } from "react";
import { Link} from 'react-router-dom'
// import { useAppSelector } from '../store/hooks' // Unused
// import toast, { Toaster } from 'react-hot-toast'; // Unused

const AdminPanel = () => {
  const usersPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchActive, setSearchActive] = useState("");
  const [searchDeleted, setSearchDeleted] = useState("");
const [deleteCurrentPage] = useState(1)

  const activeUsers = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "User" : "Moderator",
    status: i % 4 === 0 ? "Disabled" : "Active",
  }));

  const deletedUsers = [
    { id: 101, name: "Karan Kapoor", email: "karan@old.com", role: "User", deletedAt: "2025-06-25" },
    { id: 102, name: "Neha Verma", email: "neha@past.com", role: "Admin", deletedAt: "2025-06-30" },
    
  ];

  // Filter logic
  const filteredActive = activeUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchActive.toLowerCase()) ||
      user.email.toLowerCase().includes(searchActive.toLowerCase())
  );

  const filteredDeleted = deletedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchDeleted.toLowerCase()) ||
      user.email.toLowerCase().includes(searchDeleted.toLowerCase())
  );

  const totalPages = Math.ceil(filteredActive.length / usersPerPage);
  const paginatedUsers = filteredActive.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

// const paginationDeletedUser = Math.ceil(filteredDeleted.length/ usersPerPage )
const deletedPagination = filteredDeleted.slice( (deleteCurrentPage-1)*usersPerPage , deleteCurrentPage*usersPerPage)


  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-6 py-10 space-y-12">
      <div className="max-w-7xl mx-auto space-y-14">

        {/* User Management */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">👤 User Management</h1>
            <input
              type="text"
              placeholder="Search user..."
              className="bg-[#1a1a1a] border border-[#333] px-4 py-2 rounded-md text-sm w-64"
              value={searchActive}
              onChange={(e) => {
                setSearchActive(e.target.value);
                setCurrentPage(1); // reset page
              }}
            />
          </div>

          <div className="overflow-x-auto rounded-lg shadow-lg border border-[#2b2b2b]">
            <table className="min-w-full table-auto bg-[#1a1a1a] text-sm">
              <thead className="bg-[#222222] border-b border-[#333]">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold">Name</th>
                  <th className="text-left px-6 py-3 font-semibold">Email</th>
                  <th className="text-left px-6 py-3 font-semibold">Role</th>
                  <th className="text-left px-6 py-3 font-semibold">Status</th>
                  <th className="text-center px-6 py-3 font-semibold">Actions</th>
                  <th className="text-center px-6 py-3 font-semibold">Manage Storage</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="border-b border-[#2b2b2b] hover:bg-[#2a2a2a] transition">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active" ? "bg-green-600" : "bg-gray-600"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center flex gap-2 justify-center flex-wrap">
                      <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-[6px] rounded text-xs">
                        Disable
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-[6px] rounded text-xs">
                        Delete
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                    <Link to={`/userData/${user.id}`}>
                    <button className="bg-violet-600 hover:bg-yellow-700 text-white px-4 py-[6px] rounded text-xs">
                        View User
                      </button></Link>
                    </td>
                  </tr>
                ))}
                {paginatedUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-400">
                      No users found.
                    </td>
                    
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredActive.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded disabled:opacity-40"
              >
                ⬅ Prev
              </button>
              <p className="text-sm">
                Page <span className="font-bold">{currentPage}</span> of{" "}
                <span className="font-bold">{totalPages}</span>
              </p>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded disabled:opacity-40"
              >
                Next ➡
              </button>
            </div>
          )}
        </section>

        {/*  Soft Deleted Users */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">🗑️ Soft Deleted Users</h2>
            <input
              type="text"
              placeholder="Search deleted user..."
              className="bg-[#1a1a1a] border border-[#333] px-4 py-2 rounded-md text-sm w-64"
              value={searchDeleted}
              onChange={(e) => setSearchDeleted(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto rounded-lg shadow-lg border border-[#2b2b2b]">
            <table className="min-w-full table-auto bg-[#1a1a1a] text-sm">
              <thead className="bg-[#222222] border-b border-[#333]">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold">Name</th>
                  <th className="text-left px-6 py-3 font-semibold">Email</th>
                  <th className="text-left px-6 py-3 font-semibold">Role</th>
                  <th className="text-left px-6 py-3 font-semibold">Deleted At</th>
                  <th className="text-center px-6 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deletedPagination.map((user) => (
                  <tr key={user.id} className="border-b border-[#2b2b2b] hover:bg-[#2a2a2a] transition">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.deletedAt}</td>
                    <td className="px-6 py-4 text-center">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs">
                        Recover
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredDeleted.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-400">
                      No deleted users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AdminPanel;




/* Unused component - commented out to fix build
const DeletePopup = ({isOpen , uid, setOpen}:{isOpen:boolean , uid:string, setOpen:()=>void}) => {
   
  // useEffect(()=>{  },[])
  const SoftDelete = async ()=>{
      const data = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/${uid}/deleteUserAccount`, {
          headers:{
              'content-type':'application/json'
          }, credentials:'include' ,method:"delete"
      })
  
  if(data.status==200)toast.success("user account is deleted")
  else toast.error("can't delete user account")
setOpen()
  }

  const hardDelete = async()=>{
      const data = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/${uid}/hard`, {
          method:"delete" ,credentials:'include' ,headers:{
              "content-type":"application/json"
          }
      })
      if(data.status==200) toast.success("user deletd")
          else toast.error("user not deletd server error")
      setOpen()
  }

return (
 isOpen && 
<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
<div className="bg-white p-6 rounded-xl w-full max-w-md relative shadow-xl">
  <button className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
 onClick={()=>{setOpen()}} >&times;</button>

  <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>

 
  <div className="flex justify-end gap-3 mt-6">
    <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={SoftDelete}>Delete</button>
    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
    onClick={hardDelete}>Permanent Delete</button>
  </div>
</div>
</div>

)
}
*/


// interface AllUserDataType {
//     name:string, email:string, isLogedIn:boolean, _id:string, role:"admin" | "maneger" | "user"
// }
// interface delPopupType {
//     uid:string | null, open:boolean
// }

// const Allusers = () => {

// const [allUser , setAlluser] = useState<null | AllUserDataType[]>(null)
// const navigate = useNavigate()
// const [delPopup , setDelPopup] = useState<delPopupType>({open:false ,uid:null})

// const GetAllUser = async()=>{
//    try {
//     const data = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/allUsers`, {
//         credentials:"include"
//     })
//     const json = await data.json()
//     if(data.status==403)return navigate("/")
//    setAlluser(json)
//    } catch (error) {
//     console.log("error while get all user data in admin section", error)
//    }
// }


// useEffect(()=>{ 
//     if(userInfo?.role=="user") navigate("/")
//     GetAllUser()
// },[delPopup])

// const LogoutUser = async (userData:AllUserDataType) =>{
// if(!userData.isLogedIn) return
//     try {
//         const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/allUsers`, { method:"DELETE",body:JSON.stringify({userId:userData._id}),
// headers:{ "Content-Type":"application/json"},credentials:"include" })
// if(res.status==200) return await GetAllUser()
//     } catch (error) {
//         console.log("error while logout user", error)
//     }
// }

// const userInfo = useAppSelector((state)=>state?.auth.userInfo)

//   return (
// <div className='min-h-screen w-full bg-stone-100 py-10 px-4'>
//   <div className='bg-white max-w-6xl mx-auto rounded-xl shadow-2xl p-8'>
//     {/* Heading */}
//     <h1 className='text-2xl font-bold text-gray-800 mb-6 border-b pb-2'>User Management</h1>

//     {/* Table */}
//     <div className='overflow-x-auto'>
//       <table className='w-full table-auto border-collapse text-left'>
//         <thead className='bg-gray-100'>
//           <tr>
//             <th className='border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700'>NAME</th>
//             <th className='border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700'>EMAIL</th>
//             <th className='border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700'>STATUS</th>
//             {userInfo?.role !== 'user' && (
//               <th className='border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700'>DELETE</th>
//             )}
//           </tr>
//         </thead>

//         <tbody>
//           {allUser?.length &&
//             allUser.map((user) => (
//               <tr key={user._id} className='even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200'>
//                 <td className='border border-gray-200 px-4 py-3 text-sm text-gray-800'>{user.name}</td>
//                 <td className='border border-gray-200 px-4 py-3 text-sm text-gray-800'>{user.email}</td>
//                 <td className='border border-gray-200 px-4 py-3'>
//                   <button
//                     onClick={() => LogoutUser(user)}
//                     className={`${
//                       user.isLogedIn ? 'bg-green-500' : 'bg-gray-400'
//                     } text-white px-3 py-1 rounded-full text-xs font-semibold hover:opacity-90 transition`}
//                   >
//                     Logout
//                   </button>
//                 </td>
//                 {userInfo?.role !== 'user' && (
//                   <td className='border border-gray-200 px-4 py-3'>
//                     <button
//                       className='bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-600 transition mx-auto block'
//                       onClick={() => setDelPopup({ open: true, uid: user._id })}
//                     >
//                       Delete
//                     </button>
//                     <Toaster />
//                   </td>
//                 )}
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   </div>

//   {delPopup.uid && (
//     <DeletePopup
//       isOpen={delPopup.open}
//       uid={delPopup.uid}
//       setOpen={() => setDelPopup({ open: false, uid: null })}
//     />
//   )}

// {/* deleted user list */}
// {
//     userInfo?.role=="owner" && <DeletedUserList/>
// }
// </div>
  
//   )
// }

// export default Allusers





// const DeletedUserList = () => {
//     const userInfo = useAppSelector((state)=>state?.auth.userInfo)
//     const [allUser , setAlluser] = useState<null | AllUserDataType[]>(null)
// const GetTheDeltedUser = async ()=>{
//    try {
//     const data = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/softDeletedUsers`, {
//       method:"get" ,credentials:"include"
//     }) 
//     const json = await data.json()
//     setAlluser(json)
//     console.log(json)
//    } catch (error) {
//     console.log("error while getiing all soft deleted users",error)
//    }
// }

// useEffect(()=>{
//   GetTheDeltedUser()
// },[])

//   return (
//     <div className='bg-white max-w-6xl mx-auto rounded-xl shadow-2xl p-8'>
//     {/* Heading */}
//     <h1 className='text-2xl font-bold text-gray-800 mb-6 border-b pb-2'>Deleted users</h1>

//     {/* Table */}
//     <div className='overflow-x-auto'>
//       <table className='w-full table-auto border-collapse text-left'>
//         <thead className='bg-gray-100'>
//           <tr>
//             <th className='border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700'>NAME</th>
//             <th className='border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700'>EMAIL</th>
      
//             {userInfo?.role !== 'user' && (
//              <> <th className='border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700'>Recover</th>

//              <th className='border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700'>DELETE</th>
//              </>
//             )}
//           </tr>
//         </thead>

//         <tbody>
//           {allUser?.length &&
//             allUser.map((user) => (
//               <tr key={user._id} className='even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200'>
//                 <td className='border border-gray-200 px-4 py-3 text-sm text-gray-800'>{user.name}</td>
//                 <td className='border border-gray-200 px-4 py-3 text-sm text-gray-800'>{user.email}</td>
               
//                 {userInfo?.role == 'owner' && (
//                   <>
//                   <td className='border border-gray-200 px-4 py-3'>
//                     <button
//                       className='bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-400 transition mx-auto block'
//                       onClick={()=>{}}
//                     >
//                       Recove the User
//                     </button>
//                     <Toaster />
//                   </td><td className='border border-gray-200 px-4 py-3'>
//                     <button
//                       className='bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-600 transition mx-auto block'
//                       onClick={()=>{}}
//                     >
//                       Permanet Delete
//                     </button>
//                     <Toaster />
//                   </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
//   )
// }

