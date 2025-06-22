'use client';
import { AttendanceIcon, DashboardIcon, LogoutIcon, RegisterIcon } from '@/app/_assets/icons';
import { auth } from '@/lib/firebaseClient';
import { deleteCookie } from 'cookies-next';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Modal from '../modal/modal';
import Image from 'next/image';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      deleteCookie('token', { path: '/' });
      handleCloseLogoutModal();
      router.push('/login');
      toast.success("Berhasil Logout")
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleShowLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const itemsMenu = [
    {
      category: 'Administrasi',
      items: [
        {
          name: 'Beranda',
          href: '/dashboard',
          icon: DashboardIcon,
          type: 'link',
          function: () => {},
        },
        {
          name: 'Kehadiran',
          href: '/attendance',
          icon: AttendanceIcon,
          type: 'link',
          function: () => {},
        },
        {
          name: 'Pendaftaran Siswa',
          href: '/students',
          icon: RegisterIcon,
          type: 'link',
          function: () => {},
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
          function: handleShowLogoutModal,
        },
      ],
    },
  ];

  return (
    <>
      <div className="h-screen w-64 font-normal  fixed py-8 top-20 
      bg-sidebar
      left-0 flex flex-col gap-10 overflow-y-auto">
        {itemsMenu.map((item) => (
          <div className="flex flex-col transition-colors" key={item.category}>
            <p className="text-tertiary text-lg font-semibold px-5">{item.category}</p>
            {item.items.map((menu) =>
              menu.type === 'button' ? (
                <button
                  onClick={menu.function}
                  className={`${
                    pathname === menu.href ? 'bg-amber-200' : ''
                  } flex items-center transition-colors px-5 py-3 gap-3 text-tertiary text-lg`}
                  key={menu.name}>
                  {menu.icon && (
                    <Image src={menu.icon} alt={menu.name} className="w-6 h-6 text-tertiary" />
                  )}
                  <p className='cursor-pointer'>{menu.name}</p>
                </button>
              ) : (
                <Link
                  href={menu.href}
                  className={`${
                    pathname === menu.href ? 'bg-primary border rounded-2xl text-sidebar-accent ' : ''
                  } flex items-center hover:bg-sidebar-accent  px-3 py-2 gap-5 border rounded-2xl text-tertiary text-lg mt-1 mb-1 ms-2 mr-2`}
                  key={menu.name}>
                  {menu.icon && (
                    <Image src={menu.icon} alt={menu.name} className="w-6 h-6 text-tertiary" />
                  )}
                  <p>{menu.name}</p>
                </Link>
              ),
            )}
          </div>
        ))}
      </div>
      <Modal
        title="Konfirmasi Keluar"
        content="Apakah Anda yakin ingin keluar?"
        type="warning"
        isOpen={showLogoutModal}
        buttonText1="Ya"
        buttonType1="primary"
        buttonText2="Tidak"
        buttonType2="secondary"
        onConfirm={handleLogout}
        onClose={() => setShowLogoutModal(false)}
      />
      <Toaster richColors position='top-center'/>
    </>
  );
}

export default Sidebar;
