<script setup lang="ts">

</script>

<template>
  <div class="mt-10 items-center justify-center flex flex-col gap-4">
    <div class="widget-card bg-gray-100 border-[#fffff] rounded p-4 md:p-6 flex flex-col">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex flex-col w-full md:w-auto">
          <div class="flex flex-col gap-2">
            <p class="text-[21px] font-normal mb-1 text-black">Actual Subscription:</p>
          </div>
          <div class="flex items-start gap-4 flex-wrap">
            <div class="flex flex-col gap-4">
              <p class="text-sm text-gray-500">Plan: Domestic Basic</p>
              <p class="text-sm text-gray-500">Current number of Plants: 2/4</p>
              <p class="text-sm text-gray-500">Status: Active</p>
              <p class="text-sm text-gray-500">Your plan ends on: 9/09/2025</p>
              <p class="text-sm text-gray-500">Automatic Renewal (Recommend): Yes</p>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center w-full md:w-auto">
          <div class="widget-card-upgrade bg-white border-[#A4D39A] rounded p-4 md:p-6 flex flex-col gap-2 w-full md:w-auto">
            <p class="text-[18px] font-normal mb-1 text-black">Domestic Pro:</p>
            <p class="text-sm text-gray-500">Price: $$</p>
            <div>
              <ul class="list-disc pl-5">
                <li class="text-sm text-gray-500">
                  All features from <br>your current plan
                </li>
                <li class="text-sm text-gray-500">
                  Up to 8 Plants
                </li>
                <li class="text-sm text-gray-500">
                  5 extra tips from <br> our specialists
                </li>
              </ul>
            </div>
            <button
                class="cursor-pointer bg-[#A4D39A] flex flex-row items-center justify-center gap-2 h-8 rounded-md overflow-hidden px-3 mt-2">
              <p class="text-sm text-gray-700 inline">Upgrade now</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.widget-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  border-width: 1px;
}

.widget-card-upgrade {
  border-width: 1px;
  max-width: 250px;
}

@media (max-width: 768px) {
  .widget-card {
    max-width: 100%;
  }

  .widget-card-upgrade {
    max-width: 100%;
  }
}
</style>