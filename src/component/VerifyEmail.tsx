import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
type PageType = "generate" | "otp"
const VerifyEmail = () => {
    const [page , setPage] = useState<PageType>("generate")

  return (
    <div className='w-full mx-auto min-h-screen bg-black flex font-'>
      {page=='otp' ? <OtpField /> :<SendOtp setField={(val)=>setPage(val)}/> }
    </div>
  )
}

export default VerifyEmail

interface PropsTypes {
  setField:(val:PageType)=>void
}

const SendOtp:FunctionComponent<PropsTypes> = ({setField})=>{

const GenerateOtp = async ()=>{
    await fetch(`${import.meta.env.VITE_SERVER_URL}/user/generateOtp`,{
        credentials:'include' , method:"POST"
    })
    setField('otp')
}

return(
    <div className='bg-gray-50 w-96  rounded-2xl m-auto flex flex-col items-center gap-3'>
    <img src="/messageBox.jpg" className='h-16 rounded-2xl mt-2' alt="" />
    <h2 className='text-[22px] font-bold'>Send verfication code</h2>
    <p className='text-center text-md'>We have just sent an email with a new verification code to <b>rathSanantakumar@gmail.com</b></p>
    
    <div className='w-[90%] my-3'>
        <button className='bg-blue-500 w-full py-2 rounded-2xl' onClick={GenerateOtp}>GET OTP</button>
    </div>
            </div>
)
}

interface TimerType {min:number , sec:number}

const OtpField = ()=>{

  const navigate = useNavigate()
const inputArr:string[] = Array.from({length:4}).fill(" ") as string[]
const [otp , setOtp] = useState<string[]>(inputArr)
const inputRef = useRef<HTMLInputElement[]>([])
const [timer, setTimer ]= useState<TimerType>({min:5 , sec:0})
const [SendOtpStatus , setStatus] = useState<boolean>(true)

const handleTimer = ()=>{
  if(timer.sec<1 && timer.min<=0) return setStatus(false)
if(timer.sec>0){
 setTimer({min:timer.min , sec:timer.sec-1})
}else{
 setTimer({min:timer.min-1 , sec:59})
} 
}

useEffect(()=>{
  if(timer.min>=0 && timer.sec>=0){
  const  intevalId = setInterval(()=>{handleTimer()},1000)
    return ()=> clearInterval(intevalId)
  }
},[timer])

useEffect(()=>{
 inputRef.current[0].focus()
},[])



const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement> ,index:number)=>{

  if(Number(e.key)>=0 || Number(e.key) <=9){
const newArr = [...otp]
newArr[index] = e.key
setOtp(newArr) 
const focusIndex = index==3 ? 3: index+1
inputRef.current[focusIndex].focus()
  }

if(e.key=="ArrowRight"){
 const focusOn = index < 3 ? index +1 :3
 inputRef.current[focusOn].focus()
}
if(e.key=="ArrowLeft"){
 const focusOn =index > 0 ? index -1 : 0
 inputRef.current[focusOn].focus()
}
if(e.key=='Backspace'){
const newArr = [...otp]
newArr[index] = ""
setOtp(newArr)
const focusOn =index > 0 ? index -1 : 0
 inputRef.current[focusOn].focus()
}

}

const CheeckOtp = async()=>{
  if(!SendOtpStatus) return
const userOtp =otp.join("")
try {
  await fetch(`${import.meta.env.VITE_SERVER_URL}/user/varifyOtp`, {
    method:"POST" , body:JSON.stringify({userOtp}), credentials:'include',headers:{'Content-Type': 'application/json'}
  })
} catch (error) {
  console.log("error while cheeck opt", error)
}
navigate('/')
}

    return(
        <div className='bg-gray-50 w-96 p-3  rounded-2xl m-auto flex flex-col items-center gap-3'>
        <h1 className='text-[22px] font-bold'>Email Verifiaction</h1>
        <p className='text-center'>Please enter the 4 digit verification code that was sent to your email</p>
  
        <div className='w-full flex gap-5 justify-center font-semibold'>
          {
            otp.map((val,i)=>(
                <input  value={val} key={i} ref={(currentRef)=>{
                  if(currentRef)   inputRef.current[i] =currentRef
              }} type="text" className='w-10 h-10 border-black border-[1px] rounded-xl text-xl text-center'  onKeyDown={(e)=>handleKeyPress(e,i)} />
            ))
          }
        </div>

        <button className={`w-[90%] py-2 ${SendOtpStatus ?"bg-blue-600" :"bg-blue-300"} text-white font-semibold rounded-2xl`}
       onClick={CheeckOtp} >Continue</button>
        <span>didn't get <b className={`${SendOtpStatus ?"text-blue-300":"text-blue-500"} cursor-pointer`}>resend</b></span>
        <span className='text-lg font-semibold'>{timer.min} : {timer.sec}</span>
       </div>
    )
}