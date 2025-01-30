import { defineStore } from "pinia";

interface Expense {
  id: number;
  desc: string;
  amount: number | null;
  category: string;
}

export const useLocalStore = defineStore("localData", {
  state: () => ({
    expenses: [] as Expense[],
    idTracker: 0 as number,
  }),
  // Functions/methods
  actions: {
    pushExpense(newExpense: Expense): void {
      this.expenses.push(newExpense);
    },
    setExpenses(allExpenses: Expense[]): void {
      this.expenses = [...allExpenses];
    },
    incrementId(): void {
      this.idTracker += 1;
    },
  },
  // computed() will update reactively
  getters: {},
});
