/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { Logo } from '../_assets/icons';
import { Banner2 } from '../_assets/images';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '@/lib/firebaseClient';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import Modal from '../_components/molecule/modal/modal';
import { useRouter } from 'next/navigation';
import Loader from '../_components/molecule/Loader';
import { errorMsg } from '@/lib/errorMsg';


const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false)


  // handle button submit
  const handleSubmitButton = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // check if the name exist , if exist , update error state
    const fetchData = await getDocs(collection(db, 'users'));
    const userName = Array.from(new Set(fetchData.docs.map((user) => user.data().name)));
    console.log(userName)
    for (const uName of userName) {
      if (name === uName) {
        setError("Nama Sudah Ada")
        setLoading(false)
        return;
      }

    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await updateProfile(userCredential.user, {
        displayName: name
      });
      const userDocRef = doc(db, `users`, uid);
      // Create or update the user document in Firestore
      // with the user's UID, name, email, and role

      await setDoc(userDocRef, {
        name,
        email,
        role: 'guru',
        createdAt: new Date().toISOString(), // Store the creation date
        updatedAt: new Date().toISOString() // Store the last update date
      });
      setShowModal(true);
      setName('');
      setEmail('');
      setPassword('');
    } catch (e: any) {
      const err = errorMsg(e.message);
      if (err && err[1])
        setError(err[1])
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div className='w-screen h-screen flex justify-between '>
        <div className='md:w-2/5 md:flex md:flex-col md:h-full md:p-16 gap-16 md:gap-1  lg:space-y-4 2xl:space-y-6 w-screen h-screen '>
          <div className='md:flex md:items-center  md:gap-5 md:w-xs  grid place-items-center gap-1'>
            <Image src={Logo} alt='logo' width={100} className='lg:w-28 md:w-20 
            ' />
            <div className="flex-col">
              <p className='font-bold lg:text-3xl text-primary  md:text-2xl text-[1.5em]'>Absensi-Ku</p>
              <p className='text-disable font-bold  md:block hidden'>Absensi Cepat, Kuliah Lancar! </p>
            </div>
          </div>
          {/* form input  */}
          <form onSubmit={handleSubmitButton} className='md:mt-16 mt-3 p-3'>
            <div className='xl:mb-3.5 md:mb-1'>
              <h1 className='font-bold lg:text-2xl text-pseudo-disable md:text-base hidden  md:block'>Daftar <br /> ke Absensi.ku</h1>
            </div>
            {/* input  */}
            <div className='flex flex-col gap-4 mb-3 '>
              <label htmlFor="name" className='font-bold text-normal text-primary'>Nama</label>
              <input
                type="text"
                placeholder='masukan nama anda ..'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="lg:border px-4 py-3 border  border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm
                md:px-3 md:py-2
                " />
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="email" className='lg: text-normal text-primary font-bold '>Email</label>
              <input
                type="email"
                className="lg:border px-5 py-3  border md:px-3 md:py-2 w-full border-disable rounded-lg 
                 placeholder:text-disable placeholder:font-light text-sm  "
                placeholder='masukan email  '
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="password" className='text-primary font-bold text-normal'>Password</label>
              <input
                type="password"
                className="border px-4 py-3 w-full   md:px-3 md:py-2
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
                className='bg-primary rounded-2xl p-3 mt-5 text-white font-bold cursor-pointer   md:px-3 md:py-2'
                type='submit'>
                {
                  loading ? (
                    <Loader />
                  ) : (
                    "Daftar"
                  )
                }
              </button>
            </div>
            <h3 className=' mt-3 ' >sudah punya akun ? <Link href="/login" className='text-primary font-bold'>login</Link></h3>
          </form>
        </div>
        {/* image banner */}
        <Image src={Banner2}
          alt='signup-banner'
          width={1500}
          className='hidden md:block md:h-full md:object-cover md:w-2/3 
             xl:h-full xl:object-cover xl:w-2/3 2xl:h-full 2xl:object-cover 2xl:w-2/3'/>
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
        onConfirm={() => router.push('/login')}
      />
    </>
  )
}

export default RegisterPage