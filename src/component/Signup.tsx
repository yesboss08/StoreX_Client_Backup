
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface signupDataType {name:string,email:string  , password:string }


const Signup = () => {
const navigate = useNavigate()
    const [userData , setUserData] = useState<signupDataType>({email:"sanat@gmail.com" , password:"12345",name:"sanat"})

const handleChange = (val:string , field: keyof signupDataType)=>{
    setUserData((prev)=>{
        return {...prev ,[field]:val }
    })
}
const url = `${import.meta.env.VITE_SERVER_URL}/user/signup`
//const url = `http://[2405:201:a00b:8ed:2037:509f:dc59:4dba]:5173/user/signup`
const handleSubmit = async ()=>{

  if(!userData.email || !userData.password || !userData.name) return
    const data =await fetch(url , { method:'POST', headers: { "Content-Type": "application/json"},
      body:JSON.stringify(userData)
    })
    const json = await data.json()
if(data.status==201){
  console.log(json)
navigate('/login')
}
}

  return (
    <div className='w-full h-[100vh] flex bg-black items-center '>
        <div className="w-6/12 mx-auto items-center py-4 flex flex-col gap-5 bg-sky-500 justify-center">
        <input type="text" value={userData.name} onChange={(e)=>handleChange(e.target.value , "name")} className="w-40" />
        <input type="text" value={userData.email} onChange={(e)=>handleChange(e.target.value , "email")} className="w-40" />
        <input type="password" className="w-40" value={userData.password} onChange={(e)=>handleChange(e.target.value , "password")}/>
        <button className="bg-violet-400 px-2 py-1 rounded-xl"
        onClick={handleSubmit}
        >Signup</button>
        </div>    
    </div>
  )
}


export default Signup