
import { create } from 'zustand';

interface AddPromptModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useAddPromptModal = create<AddPromptModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
