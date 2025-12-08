
export const OptionFOrSubScription = ({subId,description}: {subId: string, description: string})=>{
   const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    subscription_id: subId,
    name: "StoreX. Pro Plan",
    description: description,
    handler: function (response:any) {
      console.log("Payment success:", response);
    },
    theme: { color: "#3399cc" },
  };
  return options
}