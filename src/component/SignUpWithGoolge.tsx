import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const SignUpWithGoolge = () => {

const navigate = useNavigate()

    const CreateAcc = async (token:string)=>{
try {
    const data = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/gooleOauth`, {
        method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({token}), credentials:'include'
    })
    if(data.status==200){
        navigate("/")
    }
} catch (error) {
    console.log("error while doing google auth", error) 
 }
}

  return (
    <GoogleLogin
    onSuccess={res => {
if(res?.credential) CreateAcc(res.credential);
    }}
    onError={() => {
      console.log('Login Failed');
    }}
    useOneTap
  />
  )
}

export default SignUpWithGoolge