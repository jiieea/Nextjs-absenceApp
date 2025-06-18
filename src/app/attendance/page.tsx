"use client"
import React, { useState } from 'react'
import { kelasMahasiswa } from '../students/page';


const AttendancePage = () => {
  const [grades, setGrades] = useState<string[]>([]);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<string[]>([]);
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
            <option value="" className='text-primary font-medium text-xs'>Pilih Kelas</option>
            {
              kelasMahasiswa.map((grade) => (
                <option value={grade} key={grade}>
                  kelas {grade}
                </option>
              ))
            }
          </select>
          <label htmlFor="class" className='font-bold text-primary '> Nama Mahasiswa</label>
          <select name="class" id="class" className='border 
          rounded-lg border-zinc-500 p-2 w-2xs  placeholder: font-normal '
            required
          >
            <option value="" className='text-primary font-medium text-xs'>Pilih Mahasiswa</option>
            {
              filteredStudents.map((std) => (
                <option value={std} key={std}>
                  kelas {std}
                </option>
              ))
            }
          </select>
          <label htmlFor="input-kehadiran" className='text-primary font-bold'>Input Kehadiran</label>
          <select value="" className='border rounded-lg p-2 w-2xs placeholder: font-normal'>
            <option value="" >
              Status Kehadiran
            </option>
            {['Hadir', 'Sakit', 'Ijin Keperluan Pribadi', 'Alpha'].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <button className='border rounded-lg bg-primary text-white p-2 w-2/2  ' type='submit'>Simpan Kehadiran</button>
      </form>
    </div>
  )
}

export default AttendancePage