"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { Logo } from '../_assets/icons';
import { Banner2 } from '../_assets/images';

const RegisterPage = () => {
const [ loading , setLoading ] = useState(false);
const [ name , setName ] = useState("");
  // handle button submit
  const handleSubmitButton = async(e : React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      setTimeout(() => {
        alert(`selamat datang ${ name }`); 
      } , 1500)
    }catch(e : any) {
      alert(e)
    }finally{
      setLoading(false)
    }
  } 
  return (
    <div className='w-screen h-screen flex justify-between '>
      <div className='w-2/5 flex flex-col h-full p-16 '>
        <div className='flex items-center  gap-4'>
          <Image src={Logo} alt='logo' width={120} height={120} />
          <div className="flex-col">
            <p className='font-bold text-3xl text-primary'>Absensi-Ku</p>
            <p className='text-disable font-bold'>Absensi Cepat, Kuliah Lancar! </p>
          </div>
        </div>
        {/* form input  */}
        <form onSubmit={handleSubmitButton} className='mt-16'>
          <div className='mb-3.5'>
            <h1 className='font-bold text-2xl'>Daftar <br /> ke Absensi.ku</h1>
          </div>
          {/* input  */}
          <div className='flex flex-col gap-2 mb-2'>
            <label htmlFor="name" className='font-bold text-primary'>Nama</label>
            <input type="text" placeholder='masukan nama anda ..' value={name } onChange={(e) => setName(e.target.value)}
              className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm" />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="email" className='text-primary font-bold'>Email</label>
            <input type="email" className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm" placeholder='masukan email ' />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="email" className='text-primary font-bold'>Password</label>
            <input type="password" className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm" placeholder='masukan password ' />
          </div>
          <div className="flex flex-col gap-2 ">
            <button className='bg-primary rounded-2xl p-3 mt-5 text-white font-bold cursor-pointer'>
        {
          loading ? "mohon tunggu" : "daftar"
        }
            </button>
          </div>
        </form>
      </div>
      {/* image banner */}
      <Image  src={ Banner2 } alt='signup-banner' className='w-full h-full object-cover'/>
    </div>
  )
}

export default RegisterPage