"use client"
import React, { useEffect, useState } from 'react'
import { kelasMahasiswa } from '../students/page';
import { collection, doc, getDocs, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';
import Modal from '../_components/molecule/modal/modal';


interface StudentData {
  npm: string,
  name: string,
  phone: string,
  grade: string
}
const AttendancePage = () => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<StudentData[]>
    ([]);
  const [status, setStatus] = useState('')
  const [selectedId, setSelectedId] = useState(' ');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);



  // get time today
  const getCurrentTime = () => {
    const dateNow = new Date();
    const offSetInMs = 7 * 60 * 60 * 1000;
    const wibDate = new Date(dateNow.getTime() + offSetInMs);
    return wibDate.toISOString().split('T')[0];
  }

  const formatDate = getCurrentTime();

  useEffect(() => {
    const getData = async () => {
      const snapShot = await getDocs(collection(db, 'students'));
      const data = snapShot.docs.map((data) => data.data() as StudentData);
      setStudents(data);
    };
    getData();
  })

  useEffect(() => {
    if (selectedGrade) {
      const filteredGrade = students.filter((std) => std.grade === selectedGrade);
      setFilteredStudents(filteredGrade);
    } else {
      setFilteredStudents([])
    }
  },
    [selectedGrade, students]
  )

  // handel submit button
  const handleSubmitButton = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const student = students.find((std) => std.npm === selectedId);
    if (!student) {
      setError('mahasiswa tidak ditemukan');
      setLoading(false)
      return;
    }

    // const phone = student.phone.startsWith('0') ? + "62" + student.phone.slice(1) : student.phone
    try {
      const attendanceRef = doc(db, 'attendance', `${selectedId}_${formatDate}`);

      await setDoc(attendanceRef, {
        ...student,
        status,
        date: formatDate,
        timeStamp: Timestamp.now()
      });

      setShowModal(true);
      setSelectedGrade("")
      setSelectedId("");
      setStatus('')
      setLoading(false)
    } catch (error: any) {
      setError(error.message ?? "Gagal menyimpan kehadiran")
    }
  }

  return (
    <div className="w-full h-full">
      <form action="" className='p-10 max-w-md space-y-6' onSubmit={ handleSubmitButton }>
        <h2 className='text-pseudo-disable font-semibold lg:text-2xl md:text-lg'>Input Kehadiran Mahasiswa</h2>
        {/* pilih kelas mahasiswa */}
        <div className="max-w-2/5 flex flex-col gap-4 ">
          <label htmlFor="class" className='font-bold text-primary '> Kelas</label>
          <select name="class" id="class" className='border 
          rounded-lg border-zinc-500 p-2 w-2xs placeholder: font-normal '
            required
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
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
            value={selectedId}
            disabled={!selectedGrade} // disable ketika tidak kelas atau kelast belum dipilih
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <option value="" className='text-primary font-medium text-xs'>
              {
                !selectedGrade ? "Pilih Kelas Dulu " : "Pilih Nama Mahasiswa"
              }
            </option>
            {
              filteredStudents.map((std) => (
                <option value={std.npm} key={std.npm}>
                  {std.name} - {std.npm}
                </option>
              ))
            }
          </select>
          <label htmlFor="input-kehadiran" className='text-primary font-bold'>Input Kehadiran</label>
          <select value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='border rounded-lg p-2 w-2xs placeholder: font-normal'
            disabled={!selectedGrade}
          >
            <option value="" >
              {
                !selectedGrade ? "Pilih Nama Mahasiswa Dulu" : "Pilih Status Kehadiran"
              }
            </option>
            {['Hadir', 'Sakit', 'Ijin Keperluan Pribadi', 'Alpha'].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        {
          error &&  (
            <p className='text-error font-normal'>{error}</p>
          )
        }
        <button className='border rounded-lg bg-primary cursor-pointer text-white p-2 w-2/2  ' type='submit'>{
          loading ? "Sedang meyimpan" : "Simpan Kehadiran"
        }</button>
      </form>

      <Modal
        title="Sukses"
        content="Kehadiran berhasil disimpan. Notifikasi telah dikirim ke orang tua siswa."
        type="success"
        isOpen={showModal}
        buttonText1="OK"
        buttonType1="primary"
        onConfirm={() => setShowModal(false)}
      />
    </div>
  )
}

export default AttendancePage