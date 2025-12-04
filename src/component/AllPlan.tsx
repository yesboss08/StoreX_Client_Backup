import React, { useEffect, useState } from 'react';
import {  LogIn } from 'lucide-react';
import { OptionFOrSubScription } from '../constant/RazorpayOptins';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from './Loading';

export default function AllPlan() {
  const [billing, setBilling] = useState('monthly'); 
  const [selected, setSelected] = useState('plan_pro_demo');
 const [isLoading , setIsLoading] = useState<boolean>(false)

  const [ plans , setPlans] = useState<any>([])

  const GetAllPlans = async()=>{
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/razorpay/plans`,{credentials:"include"})
    const json = await res.json()
    setPlans(json)
  }

useEffect(()=>{
    GetAllPlans()
 const script = document.createElement('script')
 const existingCheckOut = document.querySelector('#razorpay')
if(existingCheckOut) return undefined
 script.src= "https://checkout.razorpay.com/v1/checkout.js"
 script.async = true
 script.id = "razorpay"
 document.body.appendChild(script)

  return()=>{
    document.body.removeChild(script)
  }
},[])




//TODO:create a loading state for save from the double click
//create the subscription for a plan 
const CreateNewSubScription = async(planid:string)=>{
  setIsLoading(true)
 try {
   const data = await fetch(`${import.meta.env.VITE_SERVER_URL}/razorpay/createSub/${planid}`, {
    method:"POST",credentials:'include'
   })
  const json = await data.json()
  setIsLoading(false)
  const razorpay = new window.Razorpay({
    key: "rzp_test_RUWjBPx6hUebvc",
    subscription_id:json?.id,name: "StoreX.",
  description:json.notes.planName,
  handler:async (response:any) => {
    setIsLoading(true)
    if(response?.razorpay_payment_id){
  const isSuccess = await handleSUcessPayment(response)
     handleToast(isSuccess)
    }

   },
  theme: { color: "#3399cc" },
  })
  razorpay.open()
 } catch (error) {
  console.log("erroe while creating the subscription",error)
 }
}

const navigate = useNavigate()

const handleSUcessPayment =async(response:any)=>{
  console.log(response)
 const subId = response?.razorpay_subscription_id
 if(!subId) return false
const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/razorpay/verifySubscriptioPayment`,{
  method:"POST", credentials:"include", body:JSON.stringify(response),
   headers: { "Content-Type": "application/json",'razorpay_signature':response.razorpay_signature}
})
if(res.status==201) return true
return false
}


const handleToast = (isSucess:boolean)=>{
  setIsLoading(false)
if(isSucess){
   toast.success("payment completed ✅")
}else{
toast.success("payment failed ❌🌹")
}
      navigate("/")
}


  return (
    <div
      className="min-h-screen flex items-start justify-center bg-gray-900 py-12 px-4 md:px-6"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}
    >
   {isLoading &&  <Loading message={"wait for the Pyament Conformaition"}/>}
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="flex  flex-wrap md:flex-row items-center justify-center mb-6">
             <header className="w-full max-w-7xl md:px-6 flex justify-between items-center md:mb-5 mb-8 z-10">
        <h1 className="text-3xl font-bold text-white tracking-wider">StoreX.</h1>
        <div className="flex items-center space-x-4">
          <button className="text-white/80 hover:text-white transition duration-200 text-lg font-medium flex items-center"  >
            <LogIn className="w-5 h-5 mr-2" />
            Login
          </button>
    
        </div>
      </header>
          <div className=" text-center md:text-left ">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>
              Store your life. Securely
            </h1>
            <p className="text-slate-300 mt-2">Choose plan that fits to needs</p>
          </div>
        </div>

        {/* Centered toggle */}
        <div className="flex justify-center mb-10">
          <div className="relative inline-flex items-center bg-gray-800/60 rounded-full p-1 shadow-lg">
            <span className={`px-4 py-2 text-sm rounded-full transition-all ${billing === 'monthly' ? 'bg-white text-gray-900' : 'text-slate-300'}`}>
              Monthly
            </span>

            <button
              aria-label="Toggle billing"
              onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
              className={`mx-3 relative inline-flex h-9 w-20 flex-shrink-0 items-center rounded-full transition-colors ${billing === 'yearly' ? 'bg-amber-400' : 'bg-gray-600'}`}
            >
              <span
                className={`inline-block h-7 w-7 transform rounded-full bg-white shadow transition-transform ${billing === 'yearly' ? 'translate-x-10' : 'translate-x-0'}`}
              />
            </button>

            <span className={`px-4 py-2 text-sm rounded-full transition-all ${billing === 'yearly' ? 'bg-white text-gray-900' : 'text-slate-300'}`}>
              Yearly
            </span>
            <span className="text-xs ml-4 text-slate-400">Save 20% on yearly</span>
          </div>
        </div>

        {/* Pricing cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            if(plan.period!=billing) return null
           // const price = billing === 'monthly' ? monthly : yearly;
            const period = billing === 'monthly' ? 'month' : 'year';
            const isSelected = selected === plan.plan_id
            return (
              <article
                key={plan.plan_id}
                role="button"
                tabIndex={0}
                onClick={() => !plan.userPerchased && setSelected(plan.plan_id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelected(plan.id); }}
                className={`relative rounded-2xl p-6 md:p-8 shadow-2xl border cursor-pointer flex flex-col justify-between transition-transform focus:outline-none focus:ring-4 ${
                  isSelected
                    ? 'scale-105 ring-amber-400/30 bg-gradient-to-b from-amber-700/30 via-amber-600/20 to-amber-400/10 border-amber-400/40'
                    : 'bg-white/5 border-slate-700/30 hover:translate-y-[-4px]'
                }`}
              >
                {plan.userPerchased && (
                  <div className="absolute top-3 right-3 bg-green-500 text-slate-900 px-3 py-1 rounded-full text-xs font-semibold">Plan Purchased </div>
                )}

                <div>
                  <h3 className={`text-2xl font-bold ${isSelected ? 'text-amber-300' : 'text-white'}`} style={{ fontFamily: "'Poppins', sans-serif" }}>{plan.name}</h3>
                  <p className={`mt-2 text-sm ${isSelected ? 'text-amber-100' : 'text-slate-300'}`}>
                    {plan.name === 'Pro'
                      ? 'Enhanced features for power users'
                      : plan.name === 'Premium'
                      ? 'Ultimate for professionals'
                      : 'Perfect for individual users'}
                  </p>

                  <div className="mt-6 flex flex-col justify-center items-start gap-1">
                    <div>
                      <div className={`text-4xl md:text-5xl font-extrabold leading-none ${isSelected ? 'text-amber-200' : 'text-white'}`}>
                        {plan.price}
                      </div>
                      <div className={`text-sm ${isSelected ? 'text-amber-100' : 'text-slate-400'}`}>RS/{period}</div>
                    </div>

                    <div className="text-center w-full">
                      {plan.userPerchased ? <div
                        className='rounded-full px-6 py-2 text-md font-semibold select-none  bg-green-400 text-gray-900'
                        
                      >
                        Already Purchased
                      </div> : <div
                        className={`rounded-full px-6 py-2 text-md font-semibold select-none ${isSelected ? 'bg-amber-500 text-slate-900 shadow-lg text-center' : 'bg-white/90 text-gray-900'}`}
                        onClick={()=>CreateNewSubScription(plan.plan_id)}
                      >
                        Get started
                      </div>}
                    </div>
                  </div>

                  <div className={`mt-4 flex items-center gap-2 text-slate-200 ${isSelected ? 'text-amber-100' : ''}`}>
                    <div className="text-xs text-slate-400">Storage</div>
                    <div className={`font-semibold ${isSelected ? 'text-amber-50' : 'text-white'}`}>{plan.storage}</div>
                  </div>
                </div>

                <ul className={`mt-5 space-y-3 ${isSelected ? 'text-amber-100' : 'text-slate-200'}`}>
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className={`h-5 w-5 flex-shrink-0 ${isSelected ? 'text-amber-300' : 'text-emerald-400'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l7.879-7.879a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 text-xs text-slate-400">Billed {billing === 'monthly' ? 'monthly' : 'annually'}</div>
              </article>
            );
          })}
        </section>

        <p className="mt-8 text-center text-sm text-slate-400">Your data is always protected. All tiers feature military-grade AES-256 encryption, authenticated uploads, and continuous 24/7 security monitoring.</p>
      </div>
    </div>
  );
}