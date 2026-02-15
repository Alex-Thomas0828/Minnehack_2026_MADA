import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

export default function AuthPage() {
  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h1>Welcome</h1>
      <SignupForm />
      <hr />
      <LoginForm />
    </div>
  );
}
