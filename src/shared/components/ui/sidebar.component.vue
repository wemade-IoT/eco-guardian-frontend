<template>
  <aside class="bg-[#ebebeb] min-w-[100px] max-w-[100px] p-3">
    <div class="flex flex-col items-center justify-between h-full">
      <figure class="w-14 h-14 mx-auto">
        <img src="/logo.svg" alt="Logo" class="size-full" />
      </figure> 
      <ul class="flex flex-col gap-1">
        <li role="button" class="cursor-pointer flex items-center justify-center bg-gray-300/50 w-14 h-14 rounded-md group 
        hover:bg-slate-700 transition-all duration-300 ease-in-out">
          <i class="pi pi-home text-[18px] text-gray-500 group-hover:text-slate-50"></i>
        </li>
        <li role="button" class="cursor-pointer flex items-center justify-center bg-gray-300/50 w-14 h-14 rounded-md group 
        hover:bg-slate-700 transition-all duration-300 ease-in-out">
          <i class="pi pi-chart-bar text-[20px] text-gray-500 group-hover:text-slate-50"></i>
        </li>
        <li role="button" class="cursor-pointer flex items-center justify-center bg-gray-300/50 w-14 h-14 rounded-md group 
        hover:bg-slate-700 transition-all duration-300 ease-in-out">
          <i class="pi pi-clock text-[20px] text-gray-500 group-hover:text-slate-50"></i>
        </li>
        <li role="button" class="cursor-pointer flex items-center justify-center bg-gray-300/50 w-14 h-14 rounded-md group 
        hover:bg-slate-700 transition-all duration-300 ease-in-out">
          <i class="pi pi-calendar text-[20px] text-gray-500 group-hover:text-slate-50"></i>
        </li>
        <li role="button" class="cursor-pointer flex items-center justify-center bg-gray-300/50 w-14 h-14 rounded-md group 
        hover:bg-slate-700 transition-all duration-300 ease-in-out">
          <i class="pi pi-comment text-[20px] text-gray-500 group-hover:text-slate-50"></i>
        </li>
      </ul>
      <figure class="w-13 h-13 mx-auto rounded-full overflow-hidden">
        <img src="https://avatars.githubusercontent.com/u/129230632?v=4" alt="hotman_photo" class="size-full" />
      </figure>
    </div>
  </aside>
</template>

<script setup lang="ts">

</script>

<style scoped></style>