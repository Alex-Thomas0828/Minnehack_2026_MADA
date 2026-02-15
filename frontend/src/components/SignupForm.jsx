import { useState } from 'react';
import { signUp, signIn } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isSignup) {
        await signUp(email, password);
        setMessage('Signup successful — check your email to confirm.');
      } else {
        await signIn(email, password);
        setMessage('Login successful!');
      }
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-mend-light-blue flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-bold text-center mb-8 text-mend-white">Welcome to Mend!</h1>
        <h2 className="text-4xl font-bold text-center mb-8 text-mend-white">
          {isSignup ? 'Sign Up' : 'Sign In'}
        </h2>

        <form onSubmit={handleSubmit} className="bg-mend-white rounded-2xl p-8 shadow-sm space-y-4 border-1/2 border-mend-white">
          {isSignup && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full px-6 py-3 rounded-sm bg-[#f4f4f4]  text-[#0b2b36] placeholder:text-gray-500 outline-none"
              required
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-6 py-3 rounded-sm bg-[#f4f4f4] text-[#0b2b36] placeholder:text-gray-500 outline-none"
            required
          />

          {isSignup && (
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="w-full px-6 py-3 rounded-sm bg-[#f4f4f4] text-[#0b2b36] placeholder:text-gray-500 outline-none"
            />
          )}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-6 py-3 rounded-sm bg-[#f4f4f4] text-[#0b2b36] placeholder:text-gray-500 outline-none"
            required
          />

          <div className="h-8" />

          <button
            type="submit"
            className="w-full py-3 bg-mend-light-blue rounded-full text-mend-white font-medium hover:bg-mend-white transition hover:border-2 hover:border-mend-light-blue hover:text-mend-light-blue cursor-pointer shadow-sm"
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <button
          onClick={() => setIsSignup(!isSignup)}
          className="w-full mt-6 py-3 text-mend-black font-medium hover:underline cursor-pointer"
        >
          Or {isSignup ? 'Sign In' : 'Sign Up'}
        </button>

        {message && (
          <p className="mt-4 text-center text-[#0b2b36] font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}