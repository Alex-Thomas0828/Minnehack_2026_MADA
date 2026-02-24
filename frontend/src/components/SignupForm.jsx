import { useState } from 'react';
import { signUp, signIn } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent, CardHeader, CardTitle
} from "@/components/ui/card"




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
        await signUp(email, password, name, phone);
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4" >
      <div className="w-full max-w-lg">
        <h2 className='text-text-primary text-1xl'>Welcome to...</h2>
        <h1 className="text-text-primary text-6xl font-bold text-center">The MSP Mend.</h1>
        <p className="text-text-primary text-sm pt-2 ml-2 text-center">we connect neighbors to services.</p>
        <h2 className="text-4xl font-bold text-center mb-8 text-black">
        </h2>


        <Card onSubmit={handleSubmit} className="p-6 pt-8 pb-0 bg-background shadow-lg text-text-primary" >
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl text-center mb-4 text-text-muted">
                {isSignup ? 'Let\'s Get Started!' : 'Welcome Back!'}

              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4 ">
              {isSignup && (
                <Input
                  className="text-black placeholder:text-muted"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"

                  required
                />
              )}


              <Input
                className="text-black placeholder:text-muted"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"

                required
              />

              {isSignup && (
                <Input
                  className="text-black placeholder:text-muted"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"

                />
              )}

              <Input
                className="text-black placeholder:text-muted"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"

                required
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full mt-4 mb-0 bg-primary text-white"
              >

                {isSignup ? 'Sign Up' : 'Sign In'}
              </Button>
              <div className="h-8" />

            </CardContent>
          </form>
        </Card>





        <button
          onClick={() => setIsSignup(!isSignup)}
          className="w-full mt-6 py-3 text-muted-foreground font-medium hover:underline cursor-pointer"
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