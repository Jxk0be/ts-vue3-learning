import { defineStore } from "pinia";

interface Expense {
  id: number;
  desc: string;
  amount: number;
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
    incrementId(): void {
      this.idTracker++;
    },
    setExpenses(allExpenses: any): void {
      if (allExpenses.length > 1) this.expenses = [...allExpenses];
      else this.expenses.push(allExpenses);
    },
    // setNavStatus(status) {
    //   this.isMobileMenuOpen = status;
    // },
  },
  // computed() will update reactively
  getters: {},
});
