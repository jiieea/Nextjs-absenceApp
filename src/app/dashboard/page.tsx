"use client"

import { db } from '@/lib/firebaseClient';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

interface Students {
  npm: string,
  name: string,
  grade: string
}

interface AttendanceStudent {
  name: string,
  npm: string,
  grade: string,
  status: string,
  date: string
}
const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [grades, setGrades] = useState<string[]>([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false)
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState<AttendanceStudent[]>([]);


  // get today in WIB
  const getTimeInWib = () => {
    const now = new Date();
    const offSetInMs = 7 * 60 * 60 * 1000; // UTC+7l
    const wibDate = new Date(now.getTime() + offSetInMs);
    return wibDate.toISOString().split('T')[0];
  }


  // fetch data students
  const handleFetchStudentsData = async () => {
    const fetchData = await getDocs(collection(db, 'students'));
    const uniqueGrades = Array.from(new Set(fetchData.docs.map((std) => std.data().grade)))
    setGrades(uniqueGrades.sort());
  };
  handleFetchStudentsData();


  const today = getTimeInWib();

  const handleFetchAttendance = async () => {
    if (!selectedDate || !selectedGrade) return;

    setLoading(true);
    setDataLoaded(false);
    const snapshot = await getDocs(collection(db, 'students'));
    const filteredStudents = snapshot.docs
      .map((doc) => doc.data() as Students)
      .filter((student) => student.grade === selectedGrade);

    const attendanceResults: AttendanceStudent[] = [];

    for (const student of filteredStudents) {
      const attendanceDoc = await getDoc(
        doc(db, 'attendance', `${student.npm}_${selectedDate}`),
      );
      if (attendanceDoc.exists()) {
        attendanceResults.push(attendanceDoc.data() as AttendanceStudent);
      } else {
        setAttendance([]);
      }
    }

    setAttendance(attendanceResults);
    setLoading(false);
    setDataLoaded(true);
  };
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

        <select
          id='class'
          value={selectedGrade}
          disabled={!selectedDate}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className='border rounded-lg border-zinc-500 p-2 placeholder: font-light w-40'>
          <option className='text-disable' value="">{
            !selectedDate ? "Pilih Tanggal dulu" : "Pilih Kelas"
          }
          </option>
          {
            grades.map((grade) => (
              <option value={grade} key={grade}>
                {grade}
              </option>
            ))
          }
        </select>

        <div className="w-40">
          <button className='bg-primary p-2 rounded-lg text-white w-full px-4 py-3'
            onClick={handleFetchAttendance}
            disabled={!selectedDate || !selectedGrade || loading}
          >{
              loading ? "sedang memuat" : 'tampilkan'
            }</button>
        </div>


      </div>
      {
        dataLoaded && (
          <>
            {
              attendance.length === 0 ? (
                <p className='text-error font-normal '>data tidak ada </p>
              ) : (
                <table className="w-full mt-6 border text-left">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="p-2">Nama</th>
                      <th className="p-2">Nomor Pokok</th>
                      <th className="p-2">Kelas</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map((a) => (
                      <tr key={a.npm}>
                        <td className="p-2 border">{a.name}</td>
                        <td className="p-2 border">{a.npm}</td>
                        <td className="p-2 border">{a.grade}</td>
                        <td className="p-2 border">
                          <p className=
                          {
                            a.status === "Sakit" || a.status === "Alpha" ? "text-error p-2 border-black "
                            : a.status === "Ijin Keperluan Pribadi" ?
                              "text-warning border-black " :
                              "text-success border-black "
                          }
                          >{a.status}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            }
          </>
        )
      }
    </div>
  )
}

export default Dashboard