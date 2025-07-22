"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Logo } from '../_assets/icons'
import { Banner1 } from '../_assets/images'
import Loader from '../_components/molecule/Loader'
import { Toaster } from '@/components/ui/sonner'
import useHandleLogin from '@/hook/useHandleLogin'

const LoginPage = () => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    loading,
    isLocked,
    handleLogin,
    lockoutMessage,
    error,
    failedAttempts, 
  }= useHandleLogin();

  return (
    <div className='w-screen h-screen flex justify-between '>
      <div className='md:w-2/6 md:flex md:flex-col md:h-full md:p-16 gap-16 md:gap-1  lg:space-y-4 2xl:space-y-6 w-full space-y-4 mt-5 md:mt-5 '>
        <div className='md:flex  gap-1 md:w-xs grid place-items-center md:gap-5'>
          <Image src={Logo} alt='logo' width={100} className='lg:w-28 md:w-20 w-24' />
          <div className="flex-col">
            <p className='font-bold lg:text-3xl text-primary  md:text-lg sm:text-[1rem] text-[1.2em]'>Absensi-Ku</p>
            <p className=' md:text-disable md:font-bold md:block hidden md:text-[1rem]'>Absensi Cepat, Kuliah Lancar! </p>
          </div>
        </div>
        {/* form input  */}
        <form onSubmit={handleLogin} className=' mt-2 2xl:mt-16  '>
          <div className='xl:mb-3.5 md:mb-1'>
            <h1 className='font-bold lg:text-2xl mt-2 text-pseudo-disable md:mt-1 md:block hidden '>Masuk <br /> ke Absensi.ku</h1>
          </div>
          {/* input  */}
          <div className="flex flex-col gap-2 mb-3 md:p-0 p-3">
            <label htmlFor="email" className='lg: text-normal text-primary font-bold '>Email</label>
            <input
              type="email"
              className="lg:border px-4 py-3 md:py-2  md:px-3 w-full border-disable rounded-lg  border
             placeholder:text-disable placeholder:font-light text-sm "
              placeholder='masukan email  '
              disabled={isLocked}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mb-3 md:p-0 p-3">
            <label htmlFor="email" className='text-primary font-bold text-normal'>Password</label>
            <input
              type="password"
              className="border px-4 py-3 w-full   md:px-3 md:py-2
             border-disable rounded-lg placeholder:text-disable 
             placeholder:font-light text-sm md:p-2"
              placeholder='masukan password '
              value={password}
              disabled={isLocked}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {error && <p className="text-error text-sm ">{error}</p>}
          {isLocked && (
            <p className="text-error text-sm">{lockoutMessage}</p>
          )}
          {/* button  */}
          <div className="flex flex-col gap-2 ">
            <button
              className={
                failedAttempts >= 3 ? " cursor-not-allowed bg-primary rounded-2xl lg:py-3 lg:px-4  lg:mt-5 text-white font-bold  md:mt-0.5 md:py-3 md:px-2"
                  : 'bg-primary md:rounded-md lg:py-3 lg:px-4  lg:mt-5 text-white font-bold  md:mt-0.5 md:py-3 md:px-2 cursor-pointer  py-3  m-2  md:m-0 rounded-2xl '
              }
              type='submit'
            >
              {
                loading ? (
                  <Loader />
                ) : (
                  "Masuk"
                )
              }
            </button>
          </div>
          <h3 className=' mt-3 p-3 ' >Belum Punya Akun ? <Link href="/register" className='text-primary font-bold'>daftar</Link></h3>
        </form>
        <Toaster richColors position='top-center' />
      </div>
      {/* image banner */}
      <Image
        src={Banner1}
        alt='signup-banner'
        width={1500}
        className='hidden md:block md:h-full md:object-cover md:w-2/3 
             xl:h-full xl:object-cover xl:w-2/3 2xl:h-full 2xl:object-cover 2xl:w-2/3'
      />
    </div>
  )
}

export default LoginPage