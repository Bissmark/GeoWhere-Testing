import { useState } from 'react'
import supabase from '../supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
      
      <div className="login w-full max-w-xs my-5">
        {loading ? (
          'Sending magic link...'
        ) : (
          <form className="bg-slate-400 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input 
              id="email"
              className="inputField shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Your email Please"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="mt-5 bg-yellow-400 hover:bg-orange-700 active:animate-ping text-slate font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
              Login
            </button>
          </form>
        )}
        <p className="text-center text-gray-500 text-xs">When you submit, you'll receive an email confirmation so no need for a password.</p>
      </div>
  )
}