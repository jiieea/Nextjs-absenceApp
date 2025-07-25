"use client"
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';
import Modal from '../_components/molecule/modal/modal';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

interface StudentData {
  grade : string,
  name : string,
  npm : string,
  phoneNumber : string
}

const statusKehadiran = ['Hadir', 'Sakit', 'Ijin Keperluan Pribadi', 'Alpha']
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


  const kelasMahasiswa = ["RZ", "RY", "RW", "RU"]

  //handle state changes
  const handleSelectedGradeChanges = (newState: string) => {
    setSelectedGrade(newState)
  }

  const handleSelectedIdChanges = (newValue: string) => {
    setSelectedId(newValue)
  }

  const HandleStatusChanges = (newStats: string) => {
    setStatus(newStats)
  }
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
  },[])

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


const student = students.find((student ) => student.npm === selectedId);

const phone = student?.phoneNumber.startsWith('0') ? "+62" + student.phoneNumber.slice(1) : student?.phoneNumber;

if(!student) {
  toast.error("Mahasiswa Tidak Ada")
  return;
}

    try {
      const attendanceRef = doc(db, 'attendance', `${selectedId}_${formatDate}`);

      await setDoc(attendanceRef, {
        ...student,
        status,
        date: formatDate,
        timeStamp: Timestamp.now()
      });

      // fetch endpoint sen-whatsapp
      await fetch("/api/send-whatsapp" , {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },body : JSON.stringify({
          phone,
          name :  student.name,
          grade : student.grade,
          date : formatDate,
          status : status
        })
      });


      setShowModal(true);
      setSelectedGrade("")
      setSelectedId("");
      setStatus('')
      setLoading(false)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Gagal menyimpan kehadiran")
    }
  }

  return (
    <div className="w-full h-full">
      <form action="" className='md:p-10 max-w-md md:space-y-6  absolute right-1 md:relative p-3  space-y-8 mt-3 md:mt-0' onSubmit={handleSubmitButton}>
        <h2 className='text-pseudo-disable font-semibold lg:text-2xl md:text-lg'>Input Kehadiran Mahasiswa</h2>
        {/* pilih kelas mahasiswa */}
        <div className="max-w-2/5 flex flex-col gap-4 ">
          <Label htmlFor="grade"
            className='text-primary font-semibold'>
            Pilih Kelas</Label>
          <Select value={selectedGrade} onValueChange={handleSelectedGradeChanges} required>
            <SelectTrigger className="w-[350px]">
              <SelectValue placeholder="Kelas"  />
            </SelectTrigger>
            <SelectContent> 
              {
                kelasMahasiswa?.map((cls) => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
          <Label className='font-semibold text-primary'>Nama Mahasiswa</Label>
          <Select value={selectedId} onValueChange={handleSelectedIdChanges} disabled={!selectedGrade}>
            <SelectTrigger className="w-[350px]">
              <SelectValue placeholder="Pilih Mahasiswa" />
            </SelectTrigger>
            <SelectContent>
              {
                filteredStudents?.map((std) => (
                  <SelectItem key={std.npm} value={std.npm}>{std.name}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
          <Label htmlFor="input-kehadiran" className='text-primary font-bold'>Input Kehadiran</Label>
          <Select
            disabled={ !selectedId  || !selectedGrade}
            value={status}
            onValueChange={HandleStatusChanges}>
            <SelectTrigger className="w-[350px]">
              <SelectValue placeholder="Input Kehadiran" />
            </SelectTrigger>
            <SelectContent>
              {
                statusKehadiran?.map((stats) => (
                  <SelectItem value={stats} key={stats}>{stats}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
        {
          error && (
            <p className='text-error font-normal'>{error}</p>
          )
        }
        <button className='border rounded-lg bg-primary cursor-pointer text-white p-2 w-2/2  ' type='submit'>{
          loading ? "Sedang meyimpan" : "Simpan Kehadiran"
        }</button>
      </form>
        <Toaster  position='top-center' richColors/>
      <Modal
        title="Sukses"
        content="Kehadiran berhasil disimpan. Notifikasi telah terkirim ke Whatsapp."
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