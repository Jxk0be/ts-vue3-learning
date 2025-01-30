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
      this.idTracker += 1;
      this.expenses.push(newExpense);
    },
    setExpenses(allExpenses: Expense[]): void {
      this.expenses = [...allExpenses];
    },
    // setNavStatus(status) {
    //   this.isMobileMenuOpen = status;
    // },
  },
  // computed() will update reactively
  getters: {},
});
