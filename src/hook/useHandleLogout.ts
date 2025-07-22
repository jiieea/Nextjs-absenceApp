import { loginWithEmail } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


interface UseLogoutResult {
    showLogoutModal: boolean,
    handleShowLogoutModal: () => void,
    handleCloseLogoutModal: () => void,
    confirmLogout: () => Promise<void>
}
const useHandleLogout = (): UseLogoutResult => {
    const router = useRouter();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleShowLogoutModal = () => {
        setShowLogoutModal(true)
    }

    const handleCloseLogoutModal = () => {
        setShowLogoutModal(false);
    }


    // function logout
    const confirmLogout = async () => {
        // close mdal immedltly
        handleCloseLogoutModal()
        try {
            const { success, error } = await loginWithEmail.logout();
            if (success && !error) {
                toast.success("Berhasil Logout");
                router.push('/login');
            } else {
                toast.error("Gagal logout")
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error("gagal logout")
            }
        }
    }


    return {
        confirmLogout,
        showLogoutModal,
        handleCloseLogoutModal,
        handleShowLogoutModal
    };
};


export default useHandleLogout;