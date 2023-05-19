import { useState } from "react";
import { supabase } from '../supabaseClient'
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const Signup = async (event) => {
        event.preventDefault();

    setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });
        if (error) {
            alert(error.error_description || error.message)
        } else {
            alert('User created successfully');
            navigate('/');
        }
        setLoading(false);
    };

    return (
        <div className="mt-5">
            <p className="text-3xl font-bold underline text-center text-yellow-400 mb-5">Sign up to our great website</p>
            <div className="m-auto max-w-xs">
                <form className="bg-slate-400 rounded-lg flex flex-col items-center" onSubmit={Signup}>
                    <label className="block text-gray-700 text-sm font-bold mb-2 mt-5" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        className="p-4 border rounded-lg text-gray-700"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="block text-gray-700 text-sm font-bold mb-2 mt-5" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        className="p-4 border rounded-lg text-gray-700"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="bg-yellow-400 p-4 mt-5 rounded-lg mb-5" disabled={loading}>
                        {loading ? <span>Loading...</span> : <span>Sign up!</span>}
                    </button>
                </form>
            </div>
        </div>
    )
}