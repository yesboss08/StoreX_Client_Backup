
import DirectoryData from "./DirectoryData"

const App = () => {
return(
   <>
    <DirectoryData/>
   </>
)
}

export default App


// interface PopupType {
//   data:any, closePopup:()=>void
// }

// const PopupComp:PopupType=(data , closePopup)=>{
// console.log(data.open)
//   return(
//     <div className={`w-20 h-20 bg-sky-400 absolute ${data.open && "hidden" }`}>
//       <h1>{data.message}</h1>
//       <button>Close</button>
//     </div>
//   )
// }