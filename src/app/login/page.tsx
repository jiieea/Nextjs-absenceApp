"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Logo } from '../_assets/icons'
import { Banner1 } from '../_assets/images'
import {  signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebaseClient'
import {  setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'


const LoginPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")
  
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const getToken = await userCredential.user.getIdToken();

      setCookie('token', getToken, {
        maxAge: 60 * 60 * 24,
      })

      router.push("/dashboard");
    } catch (e: any) {
      setError(e.message ?? "gagal login")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='w-screen h-screen flex justify-between '>
      <div className='w-2/5  flex flex-col h-full p-16 gap-16 md:gap-2' >
        <div className='flex items-center  gap-4'>
          <Image src={Logo} alt='logo' width={120} height={120} />
          <div className="flex-col">
            <p className='font-bold text-3xl text-primary'>Absensi-Ku</p>
            <p className='text-disable font-bold'>Absensi Cepat, Kuliah Lancar! </p>
          </div>
        </div>
        {/* form input  */}
        <form className='mt-16 md:mt-5' onSubmit={handleLogin}>
          <div className='mb-3.5'>
            <h1 className='font-bold text-2xl text-pseudo-disable md:text-base'>Masuk <br /> ke Absensi.ku</h1>
          </div>
          {/* input  */}
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="email" className='text-primary font-bold'>Email</label>
            <input
              type="email"
              className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm" placeholder='masukan email  '
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="email" className='text-primary font-bold'>Password</label>
            <input 
            type="password" 
            className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm"
             placeholder='masukan password  '
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             />
          </div>
          <div className="flex flex-col gap-2 ">
            <p className='text-error'>{error}</p>
            <button className='bg-primary rounded-2xl p-3 mt-5 text-white font-bold  cursor-pointer' type='submit'>
              {
                loading ? "Mohon tunggu.." : "Masuk"
              }
            </button>
          </div>
          <h3 className=' mt-3 ' >belum punya akun  ? <Link href="/register" className='text-primary font-bold'>Daftar sekarang</Link></h3>
        </form>
      </div>
      {/* image banner */}
      <Image src={Banner1
      } alt='signup-banner' width={1300} className='h-full object-cover md:w-2/3' />
    </div>
  )
}

export default LoginPage