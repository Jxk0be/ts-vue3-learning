<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useLocalStore } from "../stores/localDataStore";

interface Expense {
  id: number;
  desc: string;
  amount: number | null;
  category: string;
}

type categoryTypes =
  | "food"
  | "entertainment"
  | "phone"
  | "gas"
  | "car_insurance"
  | "video_game"
  | "investment"
  | "other"
  | "";

const categoryVal = ref<categoryTypes>("");
const descVal = ref<string>("");
const amountVal = ref<number | null>(null);
const inputKey = ref(0);

const localStore = useLocalStore();
onMounted(() => {
  const data: string | null = localStorage.getItem("expenses");

  if (data) {
    const allExpenses: Expense[] = [...JSON.parse(data)];
    localStore.setExpenses(allExpenses);
  }
});

const clearFields = (): void => {
  categoryVal.value = "";
  descVal.value = "";
  amountVal.value = null;
  inputKey.value += 1;
};

const submitEntry = (e: MouseEvent): void => {
  e.preventDefault();

  if (!categoryVal.value || !descVal.value || !amountVal.value) return;

  const newExpense: Expense = {
    id: localStore.idTracker,
    desc: descVal.value,
    amount: amountVal.value,
    category: categoryVal.value,
  };

  localStore.pushExpense(newExpense);
  localStorage.setItem("expenses", JSON.stringify(localStore.expenses));

  clearFields();
};
</script>
<template>
  <div
    class="w-full flex justify-center items-center pt-[90px] pb-[90px] px-[20px]"
  >
    <div class="bg-white p-8 rounded-lg shadow-md md:w-[600px] w-80">
      <h2 class="text-2xl font-semibold text-center mb-6">Expense Entry</h2>
      <form>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Description</label
          >
          <input
            v-model="descVal"
            type="text"
            required
            class="w-full p-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Category</label
          >
          <select
            v-model="categoryVal"
            required
            class="w-full p-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="phone">Phone</option>
            <option value="gas">Gas</option>
            <option value="car_insurance">Car Insurance</option>
            <option value="video_game">Video Game</option>
            <option value="investment">Investment</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Amount (USD)</label
          >
          <input
            v-model="amountVal"
            :key="inputKey"
            type="number"
            step="0.01"
            required
            class="w-full p-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          @click="submitEntry"
          type="submit"
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
