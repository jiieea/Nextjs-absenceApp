"use client"

import { db } from '@/lib/firebaseClient';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Loader from '../_components/molecule/Loader';
import { Button } from '@/components/ui/button';
import { Skeleton } from '../_components/molecule/skeleton/Skeleton';
import { TableDemo } from '../_components/organisms/Table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

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
  const [selectedDate, setSelectedDate] = useState("");
  const [grades, setGrades] = useState<string[]>([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState<AttendanceStudent[]>([]);
  const [error, setError] = useState("");

  const handleGradeChanges = (newVal: string) => {
    setSelectedGrade(newVal)
  }

  // get today in WIB
  const getTimeInWib = () => {
    const now = new Date();
    const offSetInMs = 7 * 60 * 60 * 1000; // UTC+7l
    const wibDate = new Date(now.getTime() + offSetInMs);
    return wibDate.toISOString().split('T')[0];
  }

  const today = getTimeInWib();
  // fetch data students
  // Add dependency array `[]` to useEffect to prevent infinite loop
  useEffect(() => {
    const handleFetchStudentsData = async () => {
      const fetchData = await getDocs(collection(db, 'students'));
      const uniqueGrades = Array.from(new Set(fetchData.docs.map((std) => std.data().grade)));
      setGrades(uniqueGrades.sort());
    };
    handleFetchStudentsData();
  }, []); // <--- ADDED EMPTY DEPENDENCY ARRAY HERE

  const handleFetchAttendance = async () => {
    if (!selectedDate || !selectedGrade) {
      toast.error("Pilih tanggal dan kelas terlebih dahulu."); // More specific error
      return;
    }

    setLoading(true);
    setDataLoaded(false);
    setError(""); // Clear previous errors

    try {
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
        }
        // No else here, if not found, it's just not added to results
      }

      setAttendance(attendanceResults);
      setLoading(false);
      setDataLoaded(true);

      // Add a check here if attendanceResults is empty and set an error
      if (attendanceResults.length === 0) {
        setError("Tidak ada data kehadiran untuk tanggal dan kelas yang dipilih.");
      }

    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Gagal menampilkan data kehadiran.");
      setLoading(false); // Ensure loading is reset on error
      setDataLoaded(false); // Ensure dataLoaded is false on error
    }
  };

  return (
    <div className='p-10 max-w-2xl space-y-7'>
      <h1 className="text-pseudo-disable text-2xl">Rekap Kehadiran Siswa</h1>
      <div className="flex flex-col md:flex-row gap-3.5 mt-4 space-y">
        {/* date input */}
        <div className="flex flex-col space-y-2">
          <Label>Pilih Tanggal</Label>
          <input type="date" placeholder='pilih tanggal'
            className='border-1 border-secondary  rounded-xl border-opacity-25 p-1.5 placeholder: font-light  w-40 '
            max={today}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label>Pilih Kelas</Label>
          <Select value={selectedGrade} onValueChange={handleGradeChanges} disabled={!selectedDate}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih Kelas" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Pilih Kelas</SelectLabel>
                {
                  grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-40 flex flex-col space-y-2">
          <Button variant='outline' onClick={handleFetchAttendance}
            className='px-3 py-2 w-full mt-5'
            // Disable if date or grade not selected, or if loading
          >{
              loading ? (
                <Loader />
              ) : (
                "Tampilkan"
              )
            }</Button>
        </div>
      </div>
      {
        dataLoaded && (
          <>
            {
              attendance.length === 0 && !loading ? ( // Check if loading is false here too
                <p className='text-error font-normal '>{error}</p> // More informative message
              ) : loading ? (
                <Skeleton />
              ) : (
                <TableDemo
                  attendance={attendance}
                />
              )
            }
          </>
        )
      }
      <Toaster  richColors position='top-center'/>
    </div>
  );
};

export default Dashboard;