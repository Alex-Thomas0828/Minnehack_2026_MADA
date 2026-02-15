import { useState } from 'react';
import { signUp } from '../lib/auth';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signUp(email, password);
      setMessage('Signup successful — check your email to confirm.');
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Create Account</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
