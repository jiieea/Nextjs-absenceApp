"use client"
import React, { useState } from 'react'

const AttendancePage = () => {
  const [grades, setGrades] = useState<string[]>([]);
  return (
    <div className="w-full h-full">
      <form action="" className='p-10 max-w-md space-y-6'>
        <h2 className='text-pseudo-disable font-semibold lg:text-2xl md:text-lg'>Input Kehadiran Mahasiswa</h2>
        {/* pilih kelas mahasiswa */}
        <div className="max-w-2/5 flex flex-col gap-4 ">
        <label htmlFor="class" className='font-bold text-primary '> Kelas</label>
          <select name="class" id="class" className='border 
          rounded-lg border-zinc-500 p-2 w-2xs  placeholder: font-normal '
          required
          >
            <option value="" className='text-disable font-medium'>Pilih Kelas</option>
            {
              grades.map((grade) => (
                <option value={grade} key={grade}>
                  kelas {grade}
                </option>
              ))
            }
          </select>
          <label htmlFor="name"className='text-primary font-bold'>Nama</label>
          <select name="name" id="name" className='border rounded-lg p-2 w-2xs placeholder: font-medium' >

            <option value="" className='text-disable'>Pilih Nama</option>
          </select>
          
          
          </div>

      </form>
    </div>
  )
}

export default AttendancePage