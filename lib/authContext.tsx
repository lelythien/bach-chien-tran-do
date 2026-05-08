'use client'

import {
  createContext, useContext, useEffect, useState, ReactNode
} from 'react'
import {
  User, onAuthStateChanged,
  signInWithPopup, signOut as firebaseSignOut
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db, googleProvider } from '@/lib/firebase'
import { UserRole } from '@/lib/types/user.types'
import toast from 'react-hot-toast'

// ─── Types ────────────────────────────────────────────────────
interface AuthContextType {
  user:              User | null
  role:              UserRole | null
  isAdmin:           boolean
  loading:           boolean
  loginWithGoogle:   () => Promise<void>
  logout:            () => Promise<void>
}

// ─── Context ──────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType>({
  user:            null,
  role:            null,
  isAdmin:         false,
  loading:         true,
  loginWithGoogle: async () => {},
  logout:          async () => {},
})

// ─── Provider ─────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<User | null>(null)
  const [role,    setRole]    = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch role from Firestore
  const fetchRole = async (uid: string): Promise<UserRole> => {
    try {
      const snap = await getDoc(doc(db, 'users', uid))
      if (snap.exists()) {
        return (snap.data().role as UserRole) ?? 'user'
      }
    } catch (err) {
      console.error('[Auth] fetchRole error:', err)
    }
    return 'user'
  }

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        const userRole = await fetchRole(firebaseUser.uid)
        setRole(userRole)
      } else {
        setRole(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // ── Google Login ──
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const u = result.user

      // Upsert user document in Firestore (role is NOT set here — only admin can set role)
      await setDoc(
        doc(db, 'users', u.uid),
        {
          uid:       u.uid,
          name:      u.displayName ?? '',
          email:     u.email ?? '',
          avatar:    u.photoURL ?? '',
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      )

      // Set createdAt only on first login
      const snap = await getDoc(doc(db, 'users', u.uid))
      if (!snap.data()?.createdAt) {
        await setDoc(
          doc(db, 'users', u.uid),
          { createdAt: serverTimestamp(), role: 'user' },
          { merge: true }
        )
      }

      // Fetch and set role
      const userRole = await fetchRole(u.uid)
      setRole(userRole)

      toast.success(`Chào mừng, ${u.displayName}! ⚔`, {
        style: {
          background: '#F4EBCF',
          color: '#3B2A1E',
          border: '1px solid #C9A36A',
          fontFamily: 'Georgia, serif',
        },
      })
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        toast.error('Đăng nhập thất bại. Vui lòng thử lại.')
        console.error('[Auth] Login error:', err)
      }
    }
  }

  // ── Logout ──
  const logout = async () => {
    try {
      await firebaseSignOut(auth)
      setRole(null)
      toast('Đã đăng xuất.', {
        icon: '👋',
        style: {
          background: '#F4EBCF',
          color: '#3B2A1E',
          border: '1px solid #C9A36A',
        },
      })
    } catch (err) {
      console.error('[Auth] Logout error:', err)
    }
  }

  return (
    <AuthContext.Provider value={{
      user, role, isAdmin: role === 'admin', loading, loginWithGoogle, logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────
export function useAuth() {
  return useContext(AuthContext)
}
