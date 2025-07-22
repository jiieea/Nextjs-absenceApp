import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginWithEmail } from "@/services/authService";
import { setCookie } from "cookies-next";

interface UseLoginResult {
    email: string;
    password: string;
    setPassword: (password: string) => void;
    setEmail: (email: string) => void;
    loading: boolean;
    isLocked: boolean;
    failedAttempts: number;
    handleLogin: (event: React.FormEvent) => Promise<void>;
    lockoutMessage: string;
    error: string;
}

const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes



const useHandleLogin = (): UseLoginResult => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [lockoutTime, setLockoutTime] = useState(0);
    const [lockoutMessage, setLockoutMessage] = useState("");
    const [failedAttempts, setFailedAttempts] = useState(0);

    // locked login after 3 failed attempts
    useEffect(() => {
        if (failedAttempts >= MAX_FAILED_ATTEMPTS && !isLocked) {
            setIsLocked(true);
            setLockoutTime(Date.now() + LOCKOUT_DURATION);
        }

        if (isLocked) {
            const timer = setInterval(() => {
                const remainingTime = lockoutTime - Date.now();
                if (remainingTime <= 0) {
                    // unlock user login
                    setIsLocked(false);
                    setFailedAttempts(0);
                    setLockoutMessage("");
                    clearInterval(timer);
                } else {
                    const remainingMinutes = Math.ceil(remainingTime / 1000 * 60);
                    setLockoutMessage("Terlalu banyak percobaan login. Silakan coba lagi dalam " + remainingMinutes + " menit.");
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [failedAttempts, isLocked, lockoutTime]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (isLocked) {
            toast.error(lockoutMessage)
            return;
        }

        setLoading(true);
        const { success, user, error: authError } = await loginWithEmail.login(email, password);
        setLoading(false);

        if (success && user) {
            try {
                const getToken = await user.getIdToken();
                setCookie('token', getToken, {
                    maxAge: 60 * 60 * 24, // 1 day
                })
                router.push("/dashboard");
                toast.success("Berhasil Login");
            } catch (error) {
                setError("Terjadi kesalahan saat mendapatkan token.");
                toast.error(error instanceof Error ? error.message : "Terjadi kesalahan saat mendapatkan token.");
            }
        } else {
            setError(authError || "Terjadi kesalahan saat login.");
            setFailedAttempts(prev => prev + 1);

        }
    }

    return {
        email,
        password,
        setEmail,
        setPassword,
        loading,
        isLocked,
        failedAttempts,
        handleLogin,
        lockoutMessage,
        error
    };
};

export default useHandleLogin;