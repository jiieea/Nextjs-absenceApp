"use client"

import { usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import {DialogModal} from '../../../_components/DialogModal';
import { AttendanceIcon, DashboardIcon, LogoutIcon, RegisterIcon } from "../../../_assets/icons"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { FaAlignJustify } from "react-icons/fa"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import { deleteCookie } from 'cookies-next';
import { toast } from 'sonner';



export function SidebarMobile() {
    const pathname = usePathname();
    const router = useRouter();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutModal = () => {
        setShowLogoutModal(true);
    }



    // handle user logout
    const handleLogout = async() => {
        try {
            await signOut(auth);
            deleteCookie('token' , {path: '/'});
            router.push('/login');
            toast.success('Berhasil Logout');
        } catch (error : any) {
            toast.error('Logout gagal' , error);
        }
    }
    const itemsMenu = [
        {
            category: 'Administrasi',
            items: [
                {
                    name: 'Beranda',
                    href: '/dashboard',
                    icon: DashboardIcon,
                    type: 'link',
                    function: () => { },
                },
                {
                    name: 'Kehadiran',
                    href: '/attendance',
                    icon: AttendanceIcon,
                    type: 'link',
                    function: () => { },
                },
                {
                    name: 'Pendaftaran Siswa',
                    href: '/students',
                    icon: RegisterIcon,
                    type: 'link',
                    function: () => { },
                },
            ],
        },
        {
            category: 'Akun',
            items: [
                {
                    name: 'Keluar',
                    href: '',
                    icon: LogoutIcon,
                    type: 'button',
                    function: handleLogoutModal,
                },
            ],
        },
    ]
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden absolute left-1"><FaAlignJustify /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:w-[350px] bg-white ">
                <SheetHeader>
                </SheetHeader>
                <div className="flex flex-col gap-y-5">
                    {itemsMenu.map((item) => (
                        <div className="flex flex-col transition-colors" key={item.category}>

                            <p className="text-tertiary text-lg font-semibold px-5">{item.category}</p>
                            {item.items.map((menu) =>
                                menu.type === 'button' ? (
                                    <DialogModal  key={menu.name}  handleLogout={ handleLogout }/>
                                ) : (
                                    <Link
                                        href={menu.href}
                                        className={`${pathname === menu.href ? 'bg-primary border rounded-2xl text-sidebar-accent ' : ''
                                            } flex items-center hover:bg-sidebar-accent transition  px-3 py-2 gap-5 border rounded-2xl  text-lg mt-1 mb-1 ms-2 mr-2 hover:text-sidebar-primary`}
                                        key={menu.name}>
                                        {menu.icon && (
                                            <Image src={menu.icon} alt={menu.name} className="w-6 h-6 text-sidebar-primary" />
                                        )}
                                        <p>{menu.name}</p>
                                    </Link>
                                ),
                            )}
                        </div>
                    ))}
                </div>
                <SheetFooter>
                    <Button type="submit" className='bg-red-500 font-semibold' onClick={handleLogout}>Keluar</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
                    
        </Sheet>
    )
}



