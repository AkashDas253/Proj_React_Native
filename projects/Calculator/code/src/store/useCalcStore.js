import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { processCalculation } from '../utils/mathLogic';

export const useCalcStore = create(
  persist(
    (set, get) => ({
      input: '',
      result: '',
      history: [],

      addToInput: (val) => {
        const { input, result } = get();
        const isOperator = ['+', '−', '×', '÷', '^', '%'].includes(val);
        
        if (result && !isOperator) {
          set({ input: val, result: '' });
        } else if (result && isOperator) {
          set({ input: result + val, result: '' });
        } else {
          set({ input: input + val });
        }
      },

      backspace: () => set((state) => ({ 
        input: state.input.slice(0, -1),
        result: '' 
      })),

      clear: () => set({ input: '', result: '' }),

      calculate: () => {
        const { input, history } = get();
        const finalResult = processCalculation(input);

        if (finalResult !== 'Error') {
          set({ 
            result: finalResult,
            history: [{ expression: input, result: finalResult }, ...history].slice(0, 20)
          });
        } else {
          set({ result: 'Error' });
        }
      },

      restoreHistory: (item) => set({ input: item.expression, result: item.result }),
      
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'calculator-storage', 
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ history: state.history }), 
    }
  )
);