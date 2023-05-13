<template>
  <div class="my-10 flex items-center justify-end space-x-6">
    <div>
      <label for="dropdown">Rows Per Page:</label>
      <select id="dropdown" :value="props.perPage" @change="onChangeRawCount">
        <option>10</option>
        <option>20</option>
        <option>30</option>
      </select>
    </div>
    <nav
      class="flex -space-x-px"
      aria-label="Pagination"
      v-if="pages.length > 1"
    >
      <button
        type="button"
        aria-current="page"
        class="relative inline-flex cursor-pointer items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
      >
        <IconLeft />
        <IconLeft />
      </button>
      <button
        type="button"
        class="relative inline-flex cursor-pointer items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
      >
        <IconLeft />
      </button>
      <span
        class="relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
        @click.prevent="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{
          'z-10 bg-secondary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary':
            isPageActive(page.name),
        }"
        :aria-label="`Go to page number ${page.name}`"
        v-for="(page, index) in pages"
        :key="index"
      >
        {{ page.name }}
      </span>

      <button
        type="button"
        class="relative inline-flex cursor-pointer items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        @click="onClickNextPage"
        :disabled="isInLastPage"
      >
        <IconRight />
      </button>

      <button
        type="button"
        class="relative hidden cursor-pointer items-center rounded-r-md px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
        @click="onClickLastPage"
        :disabled="isInLastPage"
      >
        <IconRight />
        <IconRight />
      </button>
    </nav>
  </div>
</template>

<script setup>
import IconLeft from '@/components/icons/Left.vue'
import IconRight from '@/components/icons/Right.vue'
import { computed, onUpdated } from 'vue'
const emit = defineEmits(['pagechanged', 'perpagechanged'])

/* props */
const props = defineProps({
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 3,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
})

/* computed */
const startPage = computed(() => {
  if (props.currentPage === 1) {
    return 1
  }

  if (props.currentPage === props.totalPages) {
    return props.totalPages - props.maxVisibleButtons + 1
  }

  return props.currentPage - 1
})

const endPage = computed(() => {
  return Math.min(
    startPage.value + props.maxVisibleButtons - 1,
    props.totalPages
  )
})

const pages = computed(() => {
  const range = []

  for (let i = startPage.value; i <= endPage.value; i += 1) {
    if (i != 0) {
      range.push({
        name: i,
        isDisabled: i === props.currentPage,
      })
    }
  }

  return range
})

const isInFirstPage = computed(() => {
  return props.currentPage === 1
})

const isInLastPage = computed(() => {
  return props.currentPage === props.totalPages
})

/* Functions */
function onClickFirstPage() {
  emit('pagechanged', 1)
}
function onClickPreviousPage() {
  console.log(props.currentPage)
  emit('pagechanged', props.currentPage - 1)
}
function onClickPage(page) {
  emit('pagechanged', page)
}
function onClickNextPage() {
  emit('pagechanged', props.currentPage + 1)
}
function onClickLastPage() {
  emit('pagechanged', props.totalPages)
}
function isPageActive(page) {
  return props.currentPage === page
}
function onChangeRawCount(event) {
  const count = event.target.value
  emit('perpagechanged', +count)
}
</script>
