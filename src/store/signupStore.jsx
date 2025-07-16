import { create } from 'zustand';

export const useSignupStore = create((set) => ({
    username: '',
    age: '',
    email: '',
    userClass: '',
    board: '',
    language: '',
    phone: '',
    password: '',

    errors: {},

    // setters
    setUsername: (username) => set({ username }),
    setAge: (age) => set({ age }),
    setEmail: (email) => set({ email }),
    setUserClass: (userClass) => set({ userClass }),
    setBoard: (board) => set({ board }),
    setLanguage: (language) => set({ language }),
    setPhone: (phone) => set({ phone }),
    setPassword: (password) => set({ password }),

    setErrors: (errors) => set({ errors })
}));
