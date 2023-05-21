import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'


export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <img
      className='h-72 mx-auto md:h-max'
        src={avatarUrl ? avatarUrl : `https://place-hold.it/${size}x${size}`}
        alt={avatarUrl ? 'Avatar' : 'No image'}
      />
      {uploading ? (
        'Uploading...'
      ) : (
        <div className='mt-5'>
          <label className="bg-yellow-400 hover:bg-orange-700 text-black active:animate-ping font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" htmlFor="single">
            Upload an avatar
          </label>

            <input
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
              className="hidden"
            />
        </div>
      )}
    </div>
  )
}