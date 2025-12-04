import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import { PathTypes } from '../../DirectoryData'

interface FileDetailsPropsType {
  path: PathTypes[]
  type: 'file' | 'folder'
  size: number // bytes
  createdAt: Date | string
  name: string
  parentName: string
}


const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const kb = 1024
  const mb = kb * 1024
  const gb = mb * 1024
  if (bytes < kb) return `${bytes} B`
  if (bytes < mb) return `${(bytes / kb).toFixed(2)} KB`
  if (bytes < gb) return `${(bytes / mb).toFixed(2)} MB`
  return `${(bytes / gb).toFixed(2)} GB`
}

const FileInfo: React.FC<FileDetailsPropsType> = ({ path, size, type, name, parentName, createdAt }) => {
  const currentPath = useMemo(() => {
    if (!path || path.length === 0) return `/${name}`
    const parts = path.slice(1).map((p) => p.name)
    return `/${parts.join('/')}/${parentName}/${name}`
  }, [path, parentName, name])

  return (
    <div
      role="dialog"
      aria-label={`Details for ${name}`}
      className="w-[17.6rem] rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-800/90 text-slate-100 shadow-[0_12px_30px_rgba(2,6,23,0.8)] p-4 border border-slate-700 absolute bottom-20 hover:opacity-100 opacity-0 "
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-none p-1 rounded-full bg-slate-700/60">
         
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7.5C3 6.11929 4.11929 5 5.5 5H13.5L18.5 10V18.5C18.5 19.8807 17.3807 21 16 21H5.5C4.11929 21 3 19.8807 3 18.5V7.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 5V10H18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>


        <div className="flex-1">
          <h2 className="text-base font-semibold leading-tight">Details</h2>
          <p className="text-xs text-slate-400 truncate max-w-full">{name}</p>
        </div>
      </div>


      {/* Separator */}
      <div className="h-px bg-slate-700/60 mb-3 rounded" />


      {/* Details grid */}
      <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-sm">
        <div className="text-slate-400 text-[0.78rem]">Path</div>
        <div className="font-medium  whitespace-normal text-start break-words max-w-[11rem] text-[0.86rem]" title={currentPath}>{currentPath}</div>


        <div className="text-slate-400 text-[0.78rem]">Type</div>
        <div className="font-medium text-right capitalize text-[0.86rem]">{type}</div>


        <div className="text-slate-400 text-[0.78rem]">Size</div>
        <div className="font-medium text-right text-[0.86rem]">{formatSize(size)}</div>


        <div className="text-slate-400 text-[0.78rem]">Created</div>
        <div className="font-medium text-right text-[0.86rem]">{dayjs(createdAt).format('MMMM D, YYYY h:mm A')}</div>
      </div>


      {/* Footer action / small hint */}
      <div className="mt-3 pt-3 border-t border-slate-700/60">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="truncate">Location</span>
          <span className="font-medium truncate max-w-[9rem] text-right text-slate-200">{parentName}</span>
        </div>
      </div>
    </div>
  )
}

export default FileInfo
