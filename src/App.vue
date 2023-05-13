<script setup>
import Table from './components/Table.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />
  <div class="container-full my-10">
    <Table />
  </div>
  <!-- Tasks -->
  <div class="mx-5 my-4">
    <ul class="text-black">
      <li>- Modal</li>
      <li>- Pagination +</li>
      <li>- Search</li>
      <li>- Filter V1</li>
      <li>- Pinia</li>
      <li>- TypeScript</li>
    </ul>
  </div>
  <Footer />
</template>

<style scoped></style>
