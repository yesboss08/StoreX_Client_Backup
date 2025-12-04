import { useParams } from "react-router-dom"


const FileCard = () => {
  const {filename} = useParams()

  
  
  return (
    <div className='w-full bg-violet-500 h-80'>fileData</div>
  )
}

export default FileCard
