<template>
  <nav class="flex -space-x-px" aria-label="Pagination">
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
</template>

<script>
import IconLeft from '@/components/icons/Left.vue'
import IconRight from '@/components/icons/Right.vue'

export default {
  name: 'Pagination',
  components: {
    IconLeft,
    IconRight,
  },
  props: {
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
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1
      }

      return this.currentPage - 1
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      )
    },
    pages() {
      const range = []

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        })
      }

      return range
    },
    isInFirstPage() {
      return this.currentPage === 1
    },
    isInLastPage() {
      return this.currentPage === this.totalPages
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1)
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1)
    },
    onClickPage(page) {
      this.$emit('pagechanged', page)
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1)
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages)
    },
    isPageActive(page) {
      return this.currentPage === page
    },
  },
}
</script>
