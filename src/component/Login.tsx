import { useState } from "react"
import { useNavigate } from "react-router-dom"
import SignUpWithGoolge from "./SignUpWithGoolge"
import { GoogleOAuthProvider } from '@react-oauth/google';

interface loginDataType {email:string  , password:string }
const Login = () => {

    const [userData , setUserData] = useState<loginDataType>({email:"boss123@gmail.com" , password:"12345"})

const handleChange = (val:string , field: keyof loginDataType)=>{
    setUserData((prev)=>{
        return {...prev ,[field]:val }
    })
}

const navigate = useNavigate()
const handleSubmit = async()=>{
  const url = `${import.meta.env.VITE_SERVER_URL}/user/login`
  if(!userData.email || !userData.password ) return
    const res = await fetch(url , {method:"POST", headers:{"Content-Type": "application/json"}, body:JSON.stringify(userData) , credentials:"include"})
    const json = await res.json()
    if(res.status==200) {
      console.log(json)
      navigate("/")
    }
}
   const clientId = "392009902415-5b77gar0dptv7ujptbl11nduqei6l6in.apps.googleusercontent.com"
  return (
   <GoogleOAuthProvider clientId={clientId}>
     <div className='w-full h-[100vh] flex bg-black items-center '>
        <div className="w-6/12 mx-auto items-center py-4 flex flex-col gap-5 bg-blue-600 justify-center">
        <input type="text" value={userData.email} onChange={(e)=>handleChange(e.target.value , "email")} className="w-40" />
        <input type="text" className="w-40" value={userData.password} onChange={(e)=>handleChange(e.target.value , "password")}/>

        <SignUpWithGoolge/>
        <button className="bg-orange-400 px-2 py-1 rounded-xl"  onClick={handleSubmit}>Login</button>
        </div>    
    </div>
   </GoogleOAuthProvider>
  )
}

export default Login