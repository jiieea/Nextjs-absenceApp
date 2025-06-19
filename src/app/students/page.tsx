"use client"

import { db } from '@/lib/firebaseClient';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import Modal from '../_components/molecule/modal/modal';
import { useRouter } from 'next/navigation';


export const kelasMahasiswa = ["RZ", "RY", "RW", "RU"];

const Attendance = () => {
  const router = useRouter()
  const [grade, setGrade] = useState("");
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState("")
  const [npm, setNpm] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  // format phone number 
  const formatPhoneNumber = (phone: string) => {
    if (phone.startsWith('0')) {
      return '62' + phone.slice(1);
    }
    return phone;
  };

  const handleSubmitData = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const ref = doc(db, 'students', npm);
      const existing = await getDoc(ref);

      if (existing.exists()) {
        setError("Data NPM Sudah Ada");
        return;
      }

      await setDoc(ref, {
        name,
        npm,
        grade,
        phoneNumber: formatPhoneNumber(phone)
      })

      setShowModal(true);
      setName("");
      setGrade("")
      setPhone("");
      setNpm("")

    } catch (e: any) {
      setError(e.message ?? "Gagal menambahkan data baru")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-full h-full'>
      <form className='p-10 max-w-md space-y-4' onSubmit={handleSubmitData}>
        <h1 className='font-semibold g:text-2xl md:text-lg text-disable'>Tambah Data Mahasiswa Baru</h1>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="name" className='font-bold text-primary'>Nama Mahasiswa</label>
          <input type="text" className=' px-4 py-3 border rounded-lg placeholder:text-disable font-normal ' placeholder='Masukan Nama Mahasiswa'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="npm" className='font-bold text-primary'>Nomor Pokok Mahasiswa</label>
          <input type="text" className='px-4 py-3 border rounded-lg placeholder:text-disable font-normal ' placeholder='Masukan nomer induk mahasiswa'
            value={npm}
            onChange={(e) => setNpm(e.target.value)}
          />
          <label htmlFor="class" className='font-bold text-primary'>Kelas</label>
          <select
            id='class'
            name="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm">
            <option value="" disabled>
              Pilih Kelas
            </option>
            {kelasMahasiswa.map((kelas) => (
              <option key={kelas} value={kelas}>
                Kelas {kelas}
              </option>
            ))}
          </select>
          <label htmlFor="phone" className='font-bold text-primary'>Masukan Nomer Hp Mahasiswa</label>
          <input type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='px-4 py-3 border rounded-lg placeholder:text-disable font-normal' placeholder='max 13 digit, diawali dengan 0' />
        </div>
        {
          error && (
            <p className='font-normal text-error'>{ error }</p>
          )
        }
        <button type='submit' className='bg-primary p-2 rounded-lg text-white w-full px-4 py-3 mt-3'>
          {
            loading ? "Mohon Tunnggu" : "Tambah Data"
          }
        </button>
      </form>
      <Modal 
        title='Berhasil'
        content='Berhasil Tambah Data Baru'
        type='success'
        isOpen = {showModal}
        buttonText1='Lanjut'
        buttonType1='primary'
            buttonText2='Tutup'
            buttonType2='secondary'
            onConfirm={() => setShowModal(false)}
            onClose={() => router.push('/attendance')}
      />
    </div>
  )
}

export default Attendance