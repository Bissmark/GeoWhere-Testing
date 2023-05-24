import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import Avatar from './Avatar'

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [score, setScore] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true)
        const { user } = session;

        let { data, error, status } = await supabase
          .from('profiles')
          .select(`username, avatar_url, score`)
          .eq('id', user.id)
          .single()

        if (error && status !== 406) {
          throw error 
        } else if (data) {
          setUsername(data.username);
          setAvatarUrl(data.avatar_url);
          setScore(data.score);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [session])
  

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)

      const updates = {
        id: session.user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='justify-center my-10 text-center'>
      {loading ? (
        'Saving ...'
      ) : (
        <form className='w-full max-w-3xl m-auto' onSubmit={updateProfile}>
          <div>
            <label className='text-yellow-500 text-sm font-bold mb-2 mr-2' htmlFor="username">
              Email
            </label>
            <input
              className='text-black text-center rounded-lg mr-5'
              type="text"
              value={session.user.email || ''}
              disabled
            />
            <label className='text-yellow-500 text-sm font-bold mb-2 mt-5 mr-2' htmlFor="username">
              Username
            </label>
            <input
              className='text-black text-center rounded-lg'
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className='mt-5'>
              <label className='text-yellow-500 text-sm font-bold mb-2 mr-2' htmlFor="username">
                Highscore after 5 rounds
              </label>
              <input
                className='text-black text-center rounded-lg'
                type="text"
                value={score}
                disabled
              />  
            </div>
          </div>
          <div className='my-8 items-center'>
              <Avatar
            url={avatar_url}
            onUpload={(url) => {
            setAvatarUrl(url)
            updateProfile({ username, avatar_url: url })
          }}
        />
          </div>
          <div>
            <button className=" bg-yellow-400 hover:bg-orange-700 text-black active:animate-ping font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5" disabled={loading}>
              Update profile
            </button>
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
              disabled={loading}
              className="bg-yellow-400 hover:bg-orange-700 text-black active:animate-ping text-slate font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Out
            </button>
          </div>
          
        </form>
      )}
      
    </div>
  )
}

export default Account