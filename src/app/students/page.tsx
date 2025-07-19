"use client"

import { db } from '@/lib/firebaseClient';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import Modal from '../_components/molecule/modal/modal';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
const kelasMahasiswa = ["RZ", "RY", "RW", "RU"];
const Attendance = () => {
  const router = useRouter()
  const [grade, setGrade] = useState("");
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState("")
  const [npm, setNpm] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");

  const handleValueChanges = (newValue: string) => {
    setGrade(newValue);
  }

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

      // check if npm is already in the database
      if (existing.exists()) {
        setError("Data NPM Sudah Ada");
        toast.error("Data NPM Sudah Ada");
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
      toast.success("Berhasil Tambah Mahasiwa")
    } catch {
      if (!npm && !grade && !name) {
        setError("Data Harus Diisi")
      }
    } finally {
      setLoading(false);

    }
  }

  return (
    <div className='w-full h-full'>
      <form className='md:p-10 max-w-md space-y-4 absolute right-1 md:relative p-2'   onSubmit={handleSubmitData}>
        <h1 className='font-semibold g:text-2xl md:text-lg text-disable'>Tambah Data Mahasiswa Baru</h1>
        <div className="flex flex-col gap-3 space-y-3 w-full">
          <Label htmlFor="name" className='text-primary font-semibold '>Nama Mahasiswa</Label>
          <Input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            id="name"
            className='px-4 py-3 border border-accent-foreground'
            placeholder="Masukan nama mahasiswa" />
          <Label htmlFor="npm"
            className='text-primary font-semibold'>NPM </Label>
          <Input
            type="number"
             className='px-4 py-3 border border-accent-foreground'
            value={npm}
            onChange={(event) => setNpm(event.target.value)}
            id="npm"
            placeholder="Masukan NPM Mahasiswa" />
          <Label htmlFor='kelas'
            className='text-primary font-semibold'>Kelas</Label>
          <Select value={grade} onValueChange={handleValueChanges}>
            <SelectTrigger className="w-[350px]  px-4 py-3 border border-accent-foreground" >
              <SelectValue placeholder="Pilih Kelas " />
            </SelectTrigger>
            <SelectContent>
              {
                kelasMahasiswa?.map((cls) => (
                  <SelectItem value={cls} key={cls}>{cls}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
          <Label htmlFor='phone' className='font-semibold text-primary'>
            Nomor Hp
          </Label>
          <Input
            type='number'
            placeholder='Awali dengan angka 0'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
             className='px-4 py-3 border border-accent-foreground'
          />
        </div>
        {
          error && (
            <p className='font-semibold text-error'>{error}</p>
          )
        }
        <Button type='submit' className='bg-primary p-2 rounded-lg text-white w-full px-4 py-3 mt-3'>
          {
            loading ? "Mohon Tunggu" : "Tambah Data"
          }
        </Button>

      </form>
      <Toaster richColors position='top-center' />
      <Modal
        title='Berhasil'
        content='Berhasil Tambah Data Baru'
        type='success'
        isOpen={showModal}
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