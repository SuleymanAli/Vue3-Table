<script setup>
const emit = defineEmits(['closeModal'])
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: {},
  },
  openStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
})
</script>

<template>
  <transition name="fade">
    <div
      v-if="openStatus"
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed left-1/2 top-1/2 z-50 flex h-full max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
    >
      <div class="relative z-10 m-auto max-h-full w-full max-w-2xl">
        <!-- Modal content -->
        <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <div class="space-y-6 p-6">
            <div>
              <div class="flex-auto justify-center p-3 leading-6">
                <h2 class="py-4 text-2xl font-bold">User Information</h2>
                <div class="my-2 flex justify-between">
                  <p>ID:</p>
                  <p class="text-md px-8 text-gray-500">
                    {{ props.data.id }}
                  </p>
                </div>
                <hr />
                <div class="my-2 flex justify-between">
                  <p class="capitalize">Name:</p>
                  <p class="text-md px-8 text-gray-500">
                    {{ props.data.firstname }}
                  </p>
                </div>
                <hr />
                <div class="my-2 flex justify-between">
                  <p class="capitalize">Email:</p>
                  <p class="text-md px-8 text-gray-500">
                    {{ props.data.email }}
                  </p>
                </div>
                <hr />
                <div class="my-2 flex justify-between">
                  <p class="capitalize">Partner:</p>
                  <p class="text-md px-8 text-gray-500">
                    {{ props.data.partner }}
                  </p>
                </div>
                <hr />
                <div class="my-2 flex justify-between">
                  <p class="capitalize">Organization ID:</p>
                  <p class="text-md px-8 text-gray-500">
                    {{ props.data.organizationID }}
                  </p>
                </div>
                <hr />
                <div class="my-2 flex justify-between">
                  <p class="capitalize">Creation Time:</p>
                  <p class="text-md px-8 text-gray-500">
                    {{ props.data.date }}
                  </p>
                </div>
                <hr />
                <div class="my-2 flex justify-between">
                  <p class="capitalize">Update Time:</p>
                  <p class="text-md px-8 text-gray-500">
                    {{ props.data.updatedDate }}
                  </p>
                </div>
                <hr />
              </div>
              <div class="mt-2 space-x-4 p-3 text-center md:block">
                <button
                  @click="$emit('closeModal')"
                  class="mb-2 rounded-md border-2 border-black bg-primary px-5 py-2 text-sm font-medium tracking-wider text-black shadow-sm transition hover:bg-gray-100 hover:shadow-md md:mb-0"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        @click="$emit('closeModal')"
        class="absolute inset-0 z-0 bg-black opacity-10"
      ></div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-out;
}
</style>
