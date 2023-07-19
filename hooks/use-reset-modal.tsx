import { create } from "zustand";

type ResetModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useResetModal = create<ResetModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
