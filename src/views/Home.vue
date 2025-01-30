<script setup lang="ts">
import { onMounted } from "vue";
import { useLocalStore } from "../stores/localDataStore";
import EntryForm from "../components/EntryForm.vue";
import History from "../components/History.vue";

interface Expense {
  id: number;
  desc: string;
  amount: number | null;
  category: string;
}

const localStore = useLocalStore();
onMounted(() => {
  const data: string | null = localStorage.getItem("expenses");

  if (data) {
    const allExpenses: Expense[] = [...JSON.parse(data)];
    localStore.setExpenses(allExpenses);
    localStore.idTracker = allExpenses[allExpenses.length - 1]?.id;
  }
});
</script>

<template>
  <div
    class="w-full gap-y-[20px] flex-col flex justify-center items-center pt-[90px] pb-[90px] px-[20px]"
  >
    <EntryForm />
    <History />
  </div>
</template>
