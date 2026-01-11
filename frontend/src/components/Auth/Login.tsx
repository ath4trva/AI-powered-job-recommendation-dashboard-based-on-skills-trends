// src/components/Auth/Login.tsx
import { useState } from 'react';
import { auth } from '../../firebaseConfig'; 
import { signInAnonymously, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './Login.css';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Hackathon Mode: Quick Guest Login
  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      await signInAnonymously(auth);
      onLogin(); // Trigger parent state update
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Real Email Login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isSignUp ? 'Join JobWiz' : 'Welcome Back'}</h2>
          <p>{isSignUp ? 'Create your profile' : 'Login to dashboard'}</p>
        </div>

        {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
          </button>
        </form>

        <div style={{marginTop: '15px', borderTop: '1px solid #444', paddingTop: '15px'}}>
            <button 
                onClick={handleGuestLogin} 
                className="auth-btn" 
                style={{background: '#444', marginTop: 0}}
                disabled={loading}
            >
                🚀 Continue as Guest (Fast)
            </button>
        </div>

        <p className="toggle-text">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;