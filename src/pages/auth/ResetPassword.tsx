import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { resetPassword } from '@/services/auth';

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const nav = useNavigate();

  const initial = {
    token: params.get('token') || '',
    email: params.get('email') || '',
    password: '',
    password_confirmation: '',
  };

  const [form, setForm] = useState(initial);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await resetPassword(form);
      setMsg(res.status);
      setErr(null);
      nav('/login');
    } catch (error: any) {
      setErr(error.response?.data?.email || 'Failed to reset password');
      setMsg(null);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Reset Password</h1>
      {msg && <p>{msg}</p>}
      {err && <p>{err}</p>}
      <div>
        <label>Email</label>
        <input name='email' type='email' value={form.email} onChange={onChange} required />
      </div>
      <div>
        <label>New Password</label>
        <input name='password' type='password' value={form.password} onChange={onChange} required />
      </div>
      <div>
        <label>Confirm New Password</label>
        <input name='password_confirmation' type='password' value={form.password_confirmation} onChange={onChange} required />
      </div>
      <button type='submit'>Reset Password</button>
      <p>
        <Link to='/login'>Back to Login</Link>
      </p>
    </form>
  );
}
