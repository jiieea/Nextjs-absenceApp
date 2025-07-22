import { db } from "@/lib/firebaseClient";
import { loginWithEmail } from "@/services/authService";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";

interface UseRegisterResult {
    email: string;
    password: string;
    name: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setName: (name: string) => void;
    loading: boolean;
    error: string;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    handleRegister: (event: React.FormEvent) => Promise<void>;
}

const useHandleRegister = (): UseRegisterResult => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // check if the name exist , if exist , update error state
        const fetchData = await getDocs(collection(db, 'users'));
        const userName = Array.from(new Set(fetchData.docs.map((user) => user.data().name)));
        const userEmail = Array.from(new Set(fetchData.docs.map((user) => user.data().email)));
        for (const uEmail of userEmail) {
            if (email === uEmail) {
                setError("Email Sudah Ada");
                setLoading(false);
                return;
            }
        }
        for (const uName of userName) {
            if (name === uName) {
                setError("Nama Sudah Ada");
                setLoading(false);
                return;
            }
        }


        const { success, error } = await loginWithEmail.register(email, password, name);
        if (success) {
            try {
                setShowModal(true);
                setEmail("");
                setPassword("");
                setName("");
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }

        } else {
            setError(error || "Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
        }
    };

    return {
        email,
        password,
        name,
        setEmail,
        setPassword,
        setName,
        loading,
        error,
        showModal,
        setShowModal,
        handleRegister
    };
}

export default useHandleRegister;
