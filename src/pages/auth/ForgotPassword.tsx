import React, { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('⚠️Under construction⚠️');
  };

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img className='mx-auto h-10 w-auto' src='https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600' alt='Your Company' />
        <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Forgot Password</h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
        <div className='bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12'>
          <form className='space-y-6' method='POST' onSubmit={onSubmit}>
            <div>
              <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                Email address
              </label>
              <div className='mt-2'>
                <input id='email' name='email' type='email' autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} required className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6' />
              </div>
            </div>

            <div>
              {err && (
                <p className='my-2 text-sm text-red-600' id='email-error'>
                  {err}
                </p>
              )}
              <button type='submit' className='flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'>
                Send Reset Link
              </button>
            </div>
          </form>
        </div>

        <p className='mt-10 text-center text-sm text-gray-500'>
          <a href='/login' className='font-semibold leading-6 text-sky-600 hover:text-sky-500'>
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}
