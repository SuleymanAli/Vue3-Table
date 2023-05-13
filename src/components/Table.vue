<script setup>
import { computed, onMounted, ref } from 'vue'
import IconDocument from '@/components/icons/Document.vue'
import IconFilter from '@/components/icons/Filter.vue'
import Modal from '@/components/Modal.vue'
import IconRefresh from '@/components/icons/Refresh.vue'
import Pagination from '@/components/Pagination.vue'
import { useDataStore } from '@/store/'
const store = useDataStore()

/* store */
// store.$reset()

/* Utilities */
function formatDate(date) {
  let time = new Date(date).toLocaleString()

  return time.split(', ')[0].split(':').join('-').replace(/[\/]+/gim, '-')
}

/* Modal */
const modalIsOpen = ref(false)
function handleModalShowing(id) {
  modalIsOpen.value = !modalIsOpen.value
}

/* Pagination */
const perPage = ref(20)
const currentPage = ref(1)
const totalItem = ref(store.data.length)
const totalPages = computed(() => {
  return Math.floor(totalItem.value / perPage.value) + 1
})

function onPageChange(page) {
  currentPage.value = page
}
function onPerPageChange(count) {
  perPage.value = count
}

const filteredItems = computed(() => {
  let result = store.data.slice(
    (currentPage.value - 1) * perPage.value,
    currentPage.value * perPage.value
  )
  return result
})
</script>

<template>
  <div class="flex flex-col">
    <div class="mx-auto md:basis-11/12">
      <!-- Filter -->
      <div class="item-center mb-7 flex">
        <div class="flex flex-grow items-center space-x-5">
          <p class="cursor-pointer self-center text-2xl">
            <IconFilter />
          </p>
          <span
            class="block cursor-pointer p-2 shadow-[-4px_4px_rgba(44,62,80,1)]"
            >Partner</span
          >
          <span
            class="block cursor-pointer p-2 shadow-[-4px_4px_rgba(44,62,80,1)]"
            >Stage</span
          >
          <span
            class="block cursor-pointer p-2 shadow-[-4px_4px_rgba(44,62,80,1)]"
            >Propabilibily</span
          >
          <span
            class="block cursor-pointer rounded-full bg-slate-400/60 p-1 text-3xl"
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
          <tbody>
            <tr
              class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              v-for="(item, index) in filteredItems"
              :key="index"
            >
              <td class="px-6 py-4">{{ (index += 1) }} - {{ item.id }}</td>
              <template v-if="item.partner === 'HUBSPOT'">
                <th
                  scope="row"
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {{ item.partner }}
                </th>
                <td class="px-6 py-4">
                  {{ item.info.hubspotDeal.hubspot_owner_id.firstname }}
                </td>

                <td class="px-6 py-4">
                  {{ item.info.hubspotDeal.amount }}
                </td>
                <td class="px-6 py-4">
                  {{ item.info.hubspotDeal.hs_deal_stage_probability }}
                </td>
                <td class="px-6 py-4">
                  {{ formatDate(item.info.hubspotDeal.createdate) }}
                </td>
                <td class="px-6 py-4">
                  {{ item.info.hubspotDeal.dealstage.value }}
                </td>
                <td class="px-6 py-4">
                  <IconDocument
                    class="cursor-pointer rounded-full p-1 text-4xl transition hover:bg-stone-400/25"
                    @click="handleModalShowing(item.id)"
                  />
                </td>
              </template>
              <template v-if="item.partner === 'SALESFORCE'">
                <th
                  scope="row"
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {{ item.partner }}
                </th>
                <td class="px-6 py-4">
                  {{ item.info.salesforceOpportunity.Owner.Name }}
                </td>

                <td class="px-6 py-4">
                  {{ item.info.salesforceOpportunity.Opportunity.Amount }}
                </td>
                <td class="px-6 py-4">
                  {{ item.info.salesforceOpportunity.Opportunity.Probability }}
                </td>
                <td class="px-6 py-4">
                  {{
                    formatDate(
                      item.info.salesforceOpportunity.Opportunity.CreatedDate
                    )
                  }}
                </td>
                <td class="px-6 py-4">
                  {{ item.info.salesforceOpportunity.Opportunity.StageName }}
                </td>
                <td class="px-6 py-4">
                  <IconDocument
                    class="cursor-pointer rounded-full p-1 text-4xl transition hover:bg-stone-400/25"
                    @click="handleModalShowing(item.id)"
                  />
                </td>
              </template>
            </tr>
          </tbody>
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
    <Modal :openStatus="modalIsOpen" @closeModal="modalIsOpen = !modalIsOpen" />
  </div>
</template>

<style scoped></style>
