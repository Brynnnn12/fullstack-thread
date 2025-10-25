import { create } from 'zustand';

type UiState = {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
};

// Ini adalah store untuk mengontrol UI (bukan data)
export const useUiStore = create<UiState>((set) => ({
  isSidebarOpen: false, // Default-nya tertutup
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));