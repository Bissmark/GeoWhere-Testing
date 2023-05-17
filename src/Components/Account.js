import { useState, useEffect } from 'react'
import supabase from '../supabaseClient'
import Avatar from '../Avatar'

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true)
        const { user } = session;

        let { data, error, status } = await supabase
          .from('profiles')
          .select(`username, avatar_url`)
          .eq('id', user.id)
          .single()

        if (error && status !== 406) {
          throw error
        } else if (data) {
          setUsername(data.username);
          setAvatarUrl(data.avatar_url);
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
    e.preventDefault()

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
    <div className='profile flex justify-center flex-col my-10 text-center my-5'>
      {loading ? (
        'Saving ...'
      ) : (
        <form className='profileForm' onSubmit={updateProfile}>
          <div>
            <label className='username' htmlFor="username">Hello</label>
            <br />
            <input
              className='text-black text-center'
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='my-8 text-lg'>
              <Avatar
            url={avatar_url}
            size={150}
            onUpload={(url) => {
            setAvatarUrl(url)
            updateProfile({ username, avatar_url: url })
          }}
        />
          </div>
          <div>
            <button className=" bg-yellow-400 hover:bg-orange-700 text-black active:animate-ping text-slate font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={loading}>
              Update profile
            </button>
          </div>
        </form>
      )}
      <button
        type="button"
        onClick={() => supabase.auth.signOut()}
        className="signOut mt-12 bg-yellow-400 hover:bg-orange-700 text-black active:animate-ping text-slate font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Sign Out
      </button>
    </div>
  )
}

export default Account