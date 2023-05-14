<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/store/'
import IconDocument from '@/components/icons/Document.vue'
import Modal from '@/components/Modal.vue'
import Pagination from '@/components/Pagination.vue'
import Filter from '@/components/Filter.vue'

/* store */
const store = useDataStore()
onMounted(() => {
  store.optimizeData()
})

/* Modal */
const modalIsOpen = ref(false)
let modalData = reactive({})
function handleModalShowing(data) {
  modalData = data
  modalIsOpen.value = !modalIsOpen.value
}

/* Pagination */
const perPage = ref(10)
const currentPage = ref(1)
const totalItem = ref(store.data.length)
const totalPages = computed(
  () => Math.floor(totalItem.value / perPage.value) + 1
)
function onPageChange(page) {
  currentPage.value = page
}
function onPerPageChange(count) {
  perPage.value = count
}

const filteredItems = computed(() => {
  let result = store.filteredData.slice(
    (currentPage.value - 1) * perPage.value,
    currentPage.value * perPage.value
  )
  return result
})
</script>

<template>
  <div class="flex flex-col">
    <div class="mx-auto md:basis-11/12">
      <Filter />
      <!-- Table -->
      <div
        class="relative overflow-x-auto rounded-lg border-2 border-gray-800 shadow-[-5px_5px_rgba(44,62,80,1)]"
      >
        <table
          class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        >
          <thead
            class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">ID</th>
              <th scope="col" class="px-6 py-3">Source</th>
              <th scope="col" class="px-6 py-3">Owner</th>
              <th scope="col" class="px-6 py-3">Amount</th>
              <th scope="col" class="px-6 py-3">Probability</th>
              <th scope="col" class="px-6 py-3">Created Date</th>
              <th scope="col" class="px-6 py-3">Stage</th>
              <th scope="col" class="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody v-if="filteredItems.length > 0">
            <tr
              class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              v-for="(item, index) in filteredItems"
              :key="index"
            >
              <td class="px-6 py-4">{{ (index += 1) }} - {{ item.id }}</td>

              <th
                scope="row"
                class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {{ item.partner }}
              </th>
              <td class="px-6 py-4">
                {{ item.firstname }}
              </td>

              <td class="px-6 py-4">
                {{ item.amount }}
              </td>
              <td class="px-6 py-4">
                {{ item.probability }}
              </td>
              <td class="px-6 py-4">
                {{ item.date }}
              </td>
              <td class="px-6 py-4">
                {{ item.stage }}
              </td>
              <td class="px-6 py-4">
                <IconDocument
                  class="cursor-pointer rounded-full p-1 text-4xl transition hover:bg-stone-400/25"
                  @click="handleModalShowing(item)"
                />
              </td>
            </tr>
          </tbody>
          <template v-else>
            <p class="p-4 text-center">Data Not Fount</p>
          </template>
        </table>
      </div>
      <!-- Pagination -->
      <Pagination
        :total-pages="totalPages"
        :total="totalItem"
        :per-page="perPage"
        :current-page="currentPage"
        @pagechanged="onPageChange"
        @perpagechanged="onPerPageChange"
      />
    </div>
    <!-- Modal -->
    <Modal
      :data="modalData"
      :openStatus="modalIsOpen"
      @closeModal="modalIsOpen = !modalIsOpen"
    />
  </div>
</template>

<style scoped></style>
