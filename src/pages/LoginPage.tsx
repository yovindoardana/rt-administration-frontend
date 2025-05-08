import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [err, setErr] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form);
      nav('/');
    } catch (error: any) {
      setErr(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className='flex min-h-full flex-1'>
      <div className='flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <img className='h-10 w-auto' src='https://tailwindui.com/plus-assets/img/logos/mark.svg?color=sky&shade=500' alt='Your Company' />
            <h2 className='mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900'>Masuk ke akun Anda</h2>
            <p className='mt-2 text-sm leading-6 text-gray-500'>
              Belum punya akun?{' '}
              <a href='/register' className='font-semibold text-sky-600 hover:text-sky-500'>
                Daftar sekarang!
              </a>
            </p>
          </div>

          <div className='mt-10'>
            <div>
              <form onSubmit={onSubmit} method='POST' className='space-y-6'>
                <div>
                  <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                    Email
                  </label>
                  <div className='mt-2'>
                    <input id='email' name='email' type='email' autoComplete='email' value={form.email} onChange={onChange} required className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6' />
                  </div>
                </div>

                <div>
                  <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                    Password
                  </label>
                  <div className='mt-2'>
                    <input id='password' name='password' type='password' autoComplete='current-password' value={form.password} onChange={onChange} required className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6' />
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <input id='remember-me' name='remember' type='checkbox' checked={form.remember} onChange={onChange} className='h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600' />
                    <label htmlFor='remember-me' className='ml-3 block text-sm leading-6 text-gray-700'>
                      Remember me
                    </label>
                  </div>

                  <div className='text-sm leading-6'>
                    <a href='/forgot-password' className='font-semibold text-sky-600 hover:text-sky-500'>
                      Lupa password?
                    </a>
                  </div>
                </div>
                <div>
                  {err && (
                    <p className='my-2 text-sm text-red-600' id='email-error'>
                      {err}
                    </p>
                  )}
                  <button type='submit' className='flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'>
                    Masuk
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='relative hidden w-0 flex-1 lg:block'>
        <img className='absolute inset-0 h-full w-full object-cover' src='https://images.unsplash.com/photo-1513880989635-6eb491ce7f5b?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' />
      </div>
    </div>
  );
}
