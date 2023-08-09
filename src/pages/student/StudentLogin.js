import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../features/auth/authApi'
import learningportal from '../../assets/image/learningportal.svg'
import Error from '../../ui/Error'

const StudentLogin = () => {
  const navigate = useNavigate()
  const [login, { data, isLoading, error: responseError }] = useLoginMutation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (data?.accessToken && data?.user) {
      navigate('/videos')
    }
    if (responseError?.data) {
      setError(responseError.data)
    }
  }, [data, responseError, navigate])

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    login({ email, password })
  }

  return (
    <section className='py-6 bg-primary h-screen grid place-items-center'>
      <div className='mx-auto max-w-md px-5 lg:px-0'>
        <div>
          <img className='h-12 mx-auto' src={learningportal} alt='logo' />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-slate-100'>
            Sign in to Student Account
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleLogin}>
          <input type='hidden' name='remember' value='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='login-input rounded-t-md'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='login-input rounded-b-md'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className='flex items-center justify-end'>
            <div className='text-sm'>
              <Link
                to='/registration'
                className='font-medium text-violet-600 hover:text-violet-500'
              >
                Create New Account
              </Link>
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
            >
              Sign in
            </button>
          </div>

          {error && <Error>{error}</Error>}
        </form>
      </div>
    </section>
  )
}

export default StudentLogin
