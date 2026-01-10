'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image as ImageIcon, Film, CheckCircle, AlertCircle } from 'lucide-react'

interface UploadFile {
  file: File
  preview?: string
  status: 'pending' | 'uploading' | 'success' | 'error'
  progress: number
  error?: string
  id: string
}

interface MediaUploaderProps {
  onUploadComplete?: (files: any[]) => void
  acceptedTypes?: string[]
  maxSize?: number // MB
  folder?: string
}

const MediaUploader: React.FC<MediaUploaderProps> = ({
  onUploadComplete,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm'],
  maxSize = 100, // 100MB
  folder = 'uploads'
}) => {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadFile[] = acceptedFiles.map(file => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      status: 'pending',
      progress: 0,
      id: Math.random().toString(36).substr(2, 9)
    }))
    
    setFiles(prev => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxSize * 1024 * 1024
  })

  const removeFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id)
      if (file?.preview) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter(f => f.id !== id)
    })
  }

  const uploadFile = async (uploadFile: UploadFile): Promise<any> => {
    const formData = new FormData()
    formData.append('file', uploadFile.file)
    formData.append('folder', folder)

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100
          setFiles(prev =>
            prev.map(f =>
              f.id === uploadFile.id ? { ...f, progress, status: 'uploading' } : f
            )
          )
        }
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          setFiles(prev =>
            prev.map(f =>
              f.id === uploadFile.id ? { ...f, status: 'success', progress: 100 } : f
            )
          )
          resolve(response)
        } else {
          const error = `Upload failed: ${xhr.statusText}`
          setFiles(prev =>
            prev.map(f =>
              f.id === uploadFile.id ? { ...f, status: 'error', error } : f
            )
          )
          reject(new Error(error))
        }
      }

      xhr.onerror = () => {
        const error = 'Network error during upload'
        setFiles(prev =>
          prev.map(f =>
            f.id === uploadFile.id ? { ...f, status: 'error', error } : f
          )
        )
        reject(new Error(error))
      }

      xhr.open('POST', '/api/media/upload')
      xhr.send(formData)
    })
  }

  const handleUploadAll = async () => {
    setUploading(true)
    const pendingFiles = files.filter(f => f.status === 'pending')
    
    try {
      const results = await Promise.allSettled(
        pendingFiles.map(f => uploadFile(f))
      )
      
      const successfulUploads = results
        .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
        .map(r => r.value)
      
      if (onUploadComplete && successfulUploads.length > 0) {
        onUploadComplete(successfulUploads)
      }
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const clearCompleted = () => {
    setFiles(prev => {
      prev.forEach(f => {
        if (f.preview) URL.revokeObjectURL(f.preview)
      })
      return prev.filter(f => f.status === 'pending' || f.status === 'uploading')
    })
  }

  const pendingCount = files.filter(f => f.status === 'pending').length
  const successCount = files.filter(f => f.status === 'success').length
  const errorCount = files.filter(f => f.status === 'error').length

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
          }
        `}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {isDragActive ? 'Solte os arquivos aqui' : 'Arraste arquivos ou clique para selecionar'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Imagens (JPG, PNG, WebP, GIF) ou vídeos (MP4, WebM) até {maxSize}MB
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Arquivos ({files.length})
            </h3>
            <div className="flex gap-2">
              {successCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Limpar concluídos
                </button>
              )}
              {pendingCount > 0 && (
                <button
                  onClick={handleUploadAll}
                  disabled={uploading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Enviando...' : `Enviar ${pendingCount} arquivo${pendingCount > 1 ? 's' : ''}`}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {files.map((uploadFile) => (
              <div
                key={uploadFile.id}
                className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                {/* Preview */}
                <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  {uploadFile.preview ? (
                    <img src={uploadFile.preview} alt="" className="w-full h-full object-cover" />
                  ) : uploadFile.file.type.startsWith('video/') ? (
                    <Film className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {uploadFile.file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  
                  {/* Progress */}
                  {uploadFile.status === 'uploading' && (
                    <div className="mt-1">
                      <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 transition-all duration-300"
                          style={{ width: `${uploadFile.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Error */}
                  {uploadFile.status === 'error' && uploadFile.error && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      {uploadFile.error}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div className="flex-shrink-0">
                  {uploadFile.status === 'success' && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {uploadFile.status === 'error' && (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  {(uploadFile.status === 'pending' || uploadFile.status === 'uploading') && (
                    <button
                      onClick={() => removeFile(uploadFile.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          {(successCount > 0 || errorCount > 0) && (
            <div className="flex gap-4 text-sm">
              {successCount > 0 && (
                <span className="text-green-600 dark:text-green-400">
                  ✓ {successCount} enviado{successCount > 1 ? 's' : ''}
                </span>
              )}
              {errorCount > 0 && (
                <span className="text-red-600 dark:text-red-400">
                  ✗ {errorCount} erro{errorCount > 1 ? 's' : ''}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MediaUploader
