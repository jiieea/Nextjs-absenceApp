import { auth, db } from "@/lib/firebaseClient";
import { deleteCookie } from "cookies-next";
import { UserCredential, AuthError, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
interface AuthResult {
  success: boolean;
  user?: UserCredential['user'];
  error?: string
}

const getErrorMessage = (error: AuthError): string => {
  if (error && typeof error.code === "string") {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'Email tidak terdaftar.';
      case 'auth/wrong-password':
        return 'Password salah.';
      case 'auth/invalid-email':
        return 'Format email tidak valid.';
      case 'auth/user-disabled':
        return 'Akun pengguna dinonaktifkan.';
      case 'auth/too-many-requests':
        return 'Terlalu banyak percobaan login. Coba lagi nanti.';
      default:
        return 'Terjadi kesalahan saat login. Mohon coba lagi.';
    }
  }
  return 'Terjadi kesalahan yang tidak diketahui.';
};


export const loginWithEmail = {
  async login(email: string, password: string): Promise<AuthResult> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        success: true,
        user: userCredential.user
      }
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error as AuthError)
      }
    }
  },
  async register(email: string, password: string, name: string): Promise<AuthResult> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name
      });
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        email,
        name,
        role: 'guru',
        createdAt: new Date().toISOString()
      })
      return {
        success: true,
        user: userCredential.user
      }
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error as AuthError)
      }
    }
  },
  //  TODO : handle Logout
  async logout(): Promise<{success : boolean , error ?: string}> {
    try {
      await signOut(auth);
      deleteCookie('token', { path: '/' });
      return {
        success: true,
      }
    } catch {
      return {
        success: false,
        error: 'Gagal logout. Silakan coba lagi.'
      }
    }

  }
}