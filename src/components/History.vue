<script setup lang="ts">
import { computed, ref } from "vue";
import { useLocalStore } from "../stores/localDataStore";

interface Expense {
  id: number;
  desc: string;
  amount: number | null;
  category: string;
}
const localStore = useLocalStore();
const amountVisible = ref<number>(10);

const visibleExpenses = computed<Expense[]>(() => {
  return localStore.expenses.slice().reverse().slice(0, amountVisible.value);
});

const loadMore = (): void => {
  amountVisible.value += 10;
};

const deleteExpense = (index: number): void => {
  index = localStore.expenses.length - 1 - index;
  localStore.expenses.splice(index, 1);
  localStore.resetExpenses();
  localStorage.setItem("expenses", JSON.stringify(localStore.expenses));
};
</script>

<template>
  <div
    class="bg-white flex justify-center items-center flex-col p-8 rounded-lg shadow-md md:w-[600px] w-80"
  >
    <h1 class="text-2xl font-semibold text-center mb-6">Expense History</h1>
    <div class="w-full flex flex-col gap-y-[3px] justify-center items-center">
      <div
        v-if="visibleExpenses.length > 0"
        v-for="(exp, index) in visibleExpenses"
        :key="index"
        class="w-full bg-gradient-to-r from-green-700 via-green-800 to-green-900 text-white rounded-lg p-[24px] flex justify-between items-center hover:shadow-lg transform transition-all duration-300 ease-in-out relative"
      >
        <!-- Delete button (X) -->
        <button
          @click="deleteExpense(index)"
          class="absolute top-2 right-2 text-white font-bold text-lg"
        >
          X
        </button>

        <div class="flex flex-col">
          <h2 class="text-lg font-medium text-white capitalize">
            {{ exp.category }}
          </h2>
          <p class="text-sm text-white capitalize">{{ exp.desc }}</p>
        </div>
        <div class="flex flex-col items-end">
          <h1 class="text-xl font-semibold text-white">
            ${{ exp.amount?.toFixed(2) }}
          </h1>
          <p class="text-xs text-white">Amount</p>
        </div>
      </div>
      <h1 v-else>No expenses added yet, get started above!</h1>
    </div>
    <button
      class="p-3 mt-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      v-if="visibleExpenses.length < localStore.expenses.length"
      @click="loadMore"
    >
      Load More
    </button>
  </div>
</template>
