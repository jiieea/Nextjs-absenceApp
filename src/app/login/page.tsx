"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Logo } from '../_assets/icons'
import { Banner1 } from '../_assets/images'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const LoginPage = () => {
    const [ email , setEmail ] = useState("");
    const [ password , setPassword] = useState("");
    const [ loading , setLoading] = useState(false);
 
    const handleLogin = async( event  : React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
      
        }catch{

        }
    }
  return (
    <div className='w-screen h-screen flex justify-between '>
      <div className='w-2/5 flex flex-col h-full p-16 gap-16'>
        <div className='flex items-center  gap-4'>
          <Image src={Logo} alt='logo' width={120} height={120} />
          <div className="flex-col">
            <p className='font-bold text-3xl text-primary'>Absensi-Ku</p>
            <p className='text-disable font-bold'>Absensi Cepat, Kuliah Lancar! </p>
          </div>
        </div>
        {/* form input  */}
        <form className='mt-16' onSubmit={handleLogin}>
          <div className='mb-3.5'>
            <h1 className='font-bold text-2xl text-pseudo-disable'>Masuk <br /> ke Absensi.ku</h1>
          </div>
          {/* input  */}
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="email" className='text-primary font-bold'>Email</label>
            <input 
                type="email"
                className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm" placeholder='masukan email  ' 
                value={ email } 
                onChange={ (e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="email" className='text-primary font-bold'>Password</label>
            <input type="password" className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm" placeholder='masukan password ' />
          </div>
          <div className="flex flex-col gap-2 ">
            <button className='bg-primary rounded-2xl p-3 mt-5 text-white font-bold  cursor-pointer' type='submit'>
              masuk
            </button>
          </div>
          <h3 className=' mt-3 ' >belum punya akun  ? <Link href="/register" className='text-primary font-bold'>Daftar sekarang</Link></h3>
        </form>
      </div>
      {/* image banner */}
      <Image src={Banner1
} alt='signup-banner' width={1300} className='h-full object-cover' />
    </div>
  )
}

export default LoginPage