"use client"

import React, { useState } from 'react'

const kelasMahasiswa = ["RZ", "RY", "RW", "RU"];

const Attendance = () => {
  const [grade, setGrade] = useState("");
  const [name, setName] = useState("")
  const [npm, setNpm] = useState("")

  const handleSubmitData = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Berhasil tambah data ${name} dengan npm ${npm}`)
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
          <input type="number" className='px-4 py-3 border rounded-lg placeholder:text-disable font-normal' placeholder='max 13 digit, diawali dengan 0' />
        </div>
        <button type='submit' className='bg-primary p-2 rounded-lg text-white w-full px-4 py-3 mt-3'>Simpan Data</button>
      </form>
    </div>
  )
}

export default Attendance