<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useLocalStore } from "../stores/localDataStore";

interface Expense {
  id: number;
  desc: string;
  amount: number;
  category: string;
}

const categoryValue = ref<string | null>(null);
const localStore = useLocalStore();
onMounted(() => {
  localStorage.setItem(
    "expenses",
    JSON.stringify([
      {
        id: 1,
        desc: "McDonald's food bill",
        amount: 23.95,
        category: "food",
      },
      {
        id: 2,
        desc: "Freddy's food bill",
        amount: 49.95,
        category: "food",
      },
    ])
  );
  const data: string | null = localStorage.getItem("expenses");
  if (data) {
    const testing: Expense[] = JSON.parse(data);
    localStore.setExpenses(testing);
    console.log("Local Store:", localStore.expenses);
  } else console.log("It did not exist");
});
</script>
<template>
  <div class="w-full flex justify-center items-center pt-[90px] px-[20px]">
    <div class="bg-white p-8 rounded-lg shadow-md w-80">
      <h2 class="text-2xl font-semibold text-center mb-6">Expense Entry</h2>
      <form>
        <!-- Description Field -->
        <div class="mb-4">
          <label
            for="description"
            class="block text-sm font-medium text-gray-700 mb-2"
            >Description</label
          >
          <input
            type="text"
            id="description"
            name="description"
            required
            class="w-full p-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <!-- Category Dropdown -->
        <div class="mb-4">
          <label
            for="category"
            class="block text-sm font-medium text-gray-700 mb-2"
            >Category</label
          >
          <select
            v-model="categoryValue"
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
        <!-- Amount Field -->
        <div class="mb-6">
          <label
            for="amount"
            class="block text-sm font-medium text-gray-700 mb-2"
            >Amount (USD)</label
          >
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            required
            class="w-full p-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
