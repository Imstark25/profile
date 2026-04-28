import { create } from 'zustand'

interface PortfolioStore {
  // Theme
  theme: 'dark' | 'light'
  toggleTheme: () => void

  // Cursor
  cursorVariant: 'default' | 'text' | 'button' | 'hidden'
  setCursorVariant: (v: PortfolioStore['cursorVariant']) => void
  cursorPos: { x: number; y: number }
  setCursorPos: (pos: { x: number; y: number }) => void

  // Scroll
  scrollProgress: number
  setScrollProgress: (p: number) => void
  activeSection: string
  setActiveSection: (s: string) => void

  // Modal
  demoModal: { open: boolean; project: string; link: string }
  openModal: (project: string, link: string) => void
  closeModal: () => void

  // 3D
  isWebGL: boolean
  setIsWebGL: (v: boolean) => void
}

export const useStore = create<PortfolioStore>((set) => ({
  theme: 'dark',
  toggleTheme: () =>
    set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

  cursorVariant: 'default',
  setCursorVariant: (cursorVariant) => set({ cursorVariant }),
  cursorPos: { x: 0, y: 0 },
  setCursorPos: (cursorPos) => set({ cursorPos }),

  scrollProgress: 0,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  activeSection: 'home',
  setActiveSection: (activeSection) => set({ activeSection }),

  demoModal: { open: false, project: '', link: '' },
  openModal: (project, link) =>
    set({ demoModal: { open: true, project, link } }),
  closeModal: () =>
    set({ demoModal: { open: false, project: '', link: '' } }),

  isWebGL: true,
  setIsWebGL: (isWebGL) => set({ isWebGL }),
}))
