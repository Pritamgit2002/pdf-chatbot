'use client'

import { useState, useRef, DragEvent } from 'react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'
import { UploadCloud } from 'lucide-react'
import { Button } from './ui/button'

export const FileUploadInput = () => {
  const [files, setFiles] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

 const handleClickRemove = (name: string) => () => {
  setFiles((prev) => prev.filter((file) => file.name !== name))
}


  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <div
        className={cn(
          'border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer',
          isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        )}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Input
          type="file"
          ref={inputRef}
          className="hidden"
          onChange={handleInputChange}
          multiple
        />

        <UploadCloud className="w-10 h-10 text-blue-500 mb-4" />
        <p className="text-gray-600 text-sm">
          Drag & drop files here or <span className="text-blue-600 underline">click to upload</span>
        </p>
        <p className="text-gray-400 text-xs mt-1">You can upload multiple files</p>
      </div>

      {files.length > 0 && (
        <div className=" rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-800 mb-2">Selected Files:</h3>
          <ul className=" text-sm text-gray-600 space-y-1 max-h-48 overflow-y-auto">
            {files.map((file, idx) => (
                <div className=' w-full flex items-center justify-between p-2 gap-2 border-2 border-gray-300 rounded-xl' key={idx}>
                    <li key={idx} className="truncate">{file.name}</li>
                    <Button className=' cursor-pointer text-red-500 font-medium' onClick={handleClickRemove(file.name)}>X</Button>
                </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
