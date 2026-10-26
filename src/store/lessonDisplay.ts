import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { normalizeLessonDisplay, type LessonDisplay } from '../logic/lessonDisplay';
interface State { mode: LessonDisplay; setMode: (mode: LessonDisplay) => void; }
interface Saved { mode: LessonDisplay; }
export const useLessonDisplay = create<State>()(persist<State, [], [], Saved>((set) => ({
  mode: 'full', setMode: (mode) => set({ mode: normalizeLessonDisplay(mode) }),
}), {
  name: 'lesson-display-v1', version: 1, storage: createJSONStorage(() => AsyncStorage),
  partialize: (state) => ({ mode: state.mode }),
  merge: (saved, current) => ({ ...current, mode: normalizeLessonDisplay((saved as { mode?: unknown } | null)?.mode) }),
}));
