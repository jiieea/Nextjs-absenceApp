/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Logo } from '../_assets/icons'
import { Banner1 } from '../_assets/images'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebaseClient'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import Loader from '../_components/molecule/Loader'
import { errorMsg } from '@/lib/errorMsg'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'

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
      toast.success("Berhasil Login")
    } catch (e: any) {
      const err = errorMsg(e.message);
      if(err && err[1])
        setError(err[1])
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='w-screen h-screen flex justify-between '>
    <div className='w-2/6 flex flex-col h-full p-16 gap-16 md:gap-2 '>
      <div className='flex items-center  gap-4 md:w-xs'>
        <Image src={Logo} alt='logo' className='lg:w-28 md:w-20' />
        <div className="flex-col">
          <p className='font-bold lg:text-3xl text-primary  md:text-2xl'>Absensi-Ku</p>
          <p className='text-disable font-bold '>Absensi Cepat, Kuliah Lancar! </p>
        </div>
      </div>
      {/* form input  */}
      <form onSubmit={handleLogin} className='mt-16 '>
        <div className='xl:mb-3.5 md:mb-1'>
          <h1 className='font-bold lg:text-2xl mt-3 text-pseudo-disable md:text-base '>Daftar <br /> ke Absensi.ku</h1>
        </div>
        {/* input  */}
        <div className="flex flex-col gap-2 mb-3">
          <label htmlFor="email" className='lg: text-normal text-primary font-bold '>Email</label>
          <input
            type="email"
            className="lg:border px-5 py-3 md:px-3 w-full border-disable rounded-lg 
             placeholder:text-disable placeholder:font-light text-sm "
            placeholder='masukan email  '
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label htmlFor="email" className='text-primary font-bold text-normal'>Password</label>
          <input
            type="password"
            className="border px-4 py-3 w-full
             border-disable rounded-lg placeholder:text-disable 
             placeholder:font-light text-sm md:p-2"
            placeholder='masukan password '
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error && <p className="text-error text-sm">{error}</p>}
        <div className="flex flex-col gap-2 ">
          <button
            className='bg-primary rounded-2xl p-3 mt-5 text-white font-bold cursor-pointer'
            type='submit'>
            {
              loading ? (
                <Loader />
              ) : (
                "Masuk"
              )
            }
          </button>
        </div>
        <h3 className=' mt-3 ' >Belum Punya Akun ? <Link href="/register" className='text-primary font-bold'>daftar</Link></h3>
      </form>
<Toaster richColors position='top-center'/>
    </div>
    {/* image banner */}
    <Image src={Banner1 } alt='signup-banner' width={1500} className='h-full object-cover md:w-2/3' />
  </div>
  )
}

export default LoginPage