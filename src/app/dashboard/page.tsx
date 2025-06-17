"use client"

import React, { useState } from 'react'

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [ grades , setGrades ] = useState<string[]>([])
  // get today in WIB
  const getTimeInWib = () => {
    const now = new Date();
    const offSetInMs = 7 * 60 * 60 * 1000; // UTC+7l
    const wibDate = new Date(now.getTime() + offSetInMs);
    return wibDate.toISOString().split('T')[0];
  }


  // fetch data strudents
  const handleFetchStudentsData =async () => {
    if(!grades) return;
  }
  const today = getTimeInWib();
  return (
    <div className='p-10 max-w-2xl space-y-7'>
      <h1 className="text-pseudo-disable text-2xl">Rekap Kehadiran Siswa</h1>
      <div className="flex flex-col md:flex-row gap-3.5 mt-4">
        {/* date input */}
        <input type="date" placeholder='pilih tanggal'
          className='border rounded-lg border-zinc-500 p-2 placeholder: font-light w-40 '
          max={today}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <select className='border rounded-lg border-zinc-500 p-2 placeholder: font-light w-40'>
          <option className='text-disable' value="">Pilih Kelas
          </option>
          {
            grades.map((grade) => (
              <option value={ grade } key={grade}>
                { grade }
              </option>
            ))
          }
        </select>

        <div className="w-40">
          <button className='bg-primary p-2 rounded-lg text-white w-full px-4 py-3'>Tampilkan</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard