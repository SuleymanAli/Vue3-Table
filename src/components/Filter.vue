<script setup>
import IconFilter from '@/components/icons/Filter.vue'
import IconRefresh from '@/components/icons/Refresh.vue'
import { useDataStore } from '@/store/'

/* store */
const store = useDataStore()
// store.$reset()
</script>

<template>
  <!-- Filter -->
  <div class="item-center mb-7 flex">
    <div class="flex flex-grow items-center space-x-5">
      <p class="cursor-pointer self-center text-2xl">
        <IconFilter />
      </p>
      <span class="block cursor-pointer p-2 shadow-[-4px_4px_rgba(44,62,80,1)]">
        Partner
      </span>
      <span class="block cursor-pointer p-2 shadow-[-4px_4px_rgba(44,62,80,1)]">
        Stage
      </span>
      <span
        class="block cursor-pointer p-2 shadow-[-4px_4px_rgba(44,62,80,1)]"
        @click="store.orderby('amount')"
      >
        Propabilibily
      </span>
      <span
        class="block cursor-pointer rounded-full bg-slate-300/60 p-1 text-3xl transition hover:bg-slate-300"
        @click="store.$reset()"
      >
        <IconRefresh />
      </span>
    </div>
    <div>
      <input
        type="text"
        placeholder="Search..."
        class="rounded border-2 border-black bg-green px-3 py-2 text-xl text-white placeholder:text-white"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
