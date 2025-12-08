import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import SignUpWithGoolge from "./SignUpWithGoolge"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Container, Card, Button } from '../components/ui';
import { CloudIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface loginDataType {email:string  , password:string }
const Login = () => {
    const [userData , setUserData] = useState<loginDataType>({email:"boss123@gmail.com" , password:"12345"})
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

const handleChange = (val:string , field: keyof loginDataType)=>{
    setUserData((prev)=>{
        return {...prev ,[field]:val }
    })
}

const navigate = useNavigate()
const handleSubmit = async()=>{
  const url = `${import.meta.env.VITE_SERVER_URL}/user/login`
  if(!userData.email || !userData.password ) return
  
  setLoading(true);
  try {
    const res = await fetch(url , {method:"POST", headers:{"Content-Type": "application/json"}, body:JSON.stringify(userData) , credentials:"include"})
    const json = await res.json()
    if(res.status==200) {
      console.log(json)
      navigate("/dashboard")
    }
  } catch (error) {
    console.error('Login error:', error);
  } finally {
    setLoading(false);
  }
}

   const clientId = "392009902415-5b77gar0dptv7ujptbl11nduqei6l6in.apps.googleusercontent.com"
  return (
   <GoogleOAuthProvider clientId={clientId}>
     <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4'>
        <Container size="sm">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <CloudIcon className="h-10 w-10 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">CloudDrive</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h1>
            <p className="text-gray-600 dark:text-gray-300">Sign in to your account to continue</p>
          </div>

          <Card variant="elevated" className="max-w-md mx-auto">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  value={userData.email} 
                  onChange={(e)=>handleChange(e.target.value , "email")} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-primary-500 focus:border-transparent
                           placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={userData.password} 
                    onChange={(e)=>handleChange(e.target.value , "password")}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-primary-500 focus:border-transparent
                             placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400">
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full" 
                loading={loading}
                onClick={handleSubmit}
              >
                Sign In
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
                </div>
              </div>

              <SignUpWithGoolge/>

              <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium">
                  Sign up
                </Link>
              </p>
            </form>
          </Card>
        </Container>
    </div>
   </GoogleOAuthProvider>
  )
}

export default Login