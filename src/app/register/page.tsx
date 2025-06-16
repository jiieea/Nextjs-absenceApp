"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { Logo } from '../_assets/icons';
import { Banner2 } from '../_assets/images';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '@/lib/firebaseClient';
import { doc, setDoc } from 'firebase/firestore';
import Modal from '../_components/molecule/modal/modal';
import { useRouter } from 'next/navigation';



const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [ error , setError ] = useState('');
  const [ showModal , setShowModal ] = useState(false)
   // handle button submit
  const handleSubmitButton = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const userCredential =await createUserWithEmailAndPassword(auth , email , password);
      const uid = userCredential.user.uid;

      await updateProfile(userCredential.user , {
        displayName: name
      })

      await setDoc(doc(db , 'users' , uid) , {
        name ,
        email ,
        role : 'guru'
      });
      setShowModal(true);
      setName('');
      setEmail('');
      setPassword('');
    }catch(e : any){
      setError(e.message  ?? 'registrasi gagal ')
    }finally {
      setLoading(false)
     
    }
  }
  return (
   <>
     <div className='w-screen h-screen flex justify-between '>
      <div className='w-2/3 flex flex-col h-full p-16 gap-16'>
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
            <h1 className='font-bold text-2xl text-pseudo-disable'>Daftar <br /> ke Absensi.ku</h1>
          </div>
          {/* input  */}
          <div className='flex flex-col gap-2 mb-2'>
            <label htmlFor="name" className='font-bold text-primary'>Nama</label>
            <input type="text" placeholder='masukan nama anda ..' value={name} onChange={(e) => setName(e.target.value)}
              className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm" />
          </div>
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
            <input type="password" className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm" placeholder='masukan password '  
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {error && <p className="text-error text-sm">{error}</p>}
          <div className="flex flex-col gap-2 ">
            <button className='bg-primary rounded-2xl p-3 mt-5 text-white font-bold cursor-pointer' type='submit'>
              {
                loading ? "mohon tunggu" : "daftar"
              }
            </button>
          </div>
          <h3 className=' mt-3 ' >sudah punya akun ? <Link href="/login" className='text-primary font-bold'>login</Link></h3>
        </form>
      </div>
      {/* image banner */}
      <Image src={Banner2} alt='signup-banner' width={1300} className='h-full object-cover' />
    </div>

    <Modal 
    title='Sukses'
    content='Berhasil daftar'
    type='success'
    isOpen={showModal}
    buttonText1='Masuk'
    buttonType1='primary'
    buttonText2='Tutup'
    buttonType2='secondary'
    onClose={() => setShowModal(false)}
    onConfirm={() => router.push('/login') }
    />
   </>
  )
}

export default RegisterPage