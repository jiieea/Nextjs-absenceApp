import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface AttendanceStudent {
    name: string,
    npm: string,
    grade: string,
    status: string,
    date: string
}
export function TableDemo({ attendance }: { attendance: AttendanceStudent[] }): React.JSX.Element {
    return (
        <div className='overflow-x-scroll  md:overflow-x-hidden'>
            <Table >
            <TableHeader>
                <TableRow>
                    <TableHead  className='w-[50px] md:w-[100px]'>Nama</TableHead>
                    <TableHead >NPM</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead >Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {attendance.map((std) => (
                    <TableRow key={std.npm}>
                        <TableCell className="font-medium  truncate">{std.name}</TableCell>
                        <TableCell>{std.npm}</TableCell>
                        <TableCell>{std.grade}</TableCell>
                        <TableCell className={
                            std.status === "Sakit" || std.status === "Alpha" ? "text-error p-2 border-black font-base "
                            : std.status === "Ijin Keperluan Pribadi" ?
                              "text-warning font-base " :
                              "text-success font-base "
                          }
                        >{std.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>

        </Table>
        </div>
    )
}



