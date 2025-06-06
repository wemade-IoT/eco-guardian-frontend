<script setup lang="ts">
import { ref } from 'vue';
import ProfileEditInfoDialog from './profile-edit-info-dialog.component.vue';


interface UserData {
  name: string;
  lastName: string;
  email: string;
  photoUrl: string;
}


const userData = ref<UserData>({
  name: 'Nicolas',
  lastName: 'Esteban',
  email: 'puerkito77@gmail.com',
  photoUrl: 'https://avatars.githubusercontent.com/u/129230632?v=4'
});


const showEditDialog = ref(false);


const openEditDialog = () => {
  showEditDialog.value = true;
};


const handleSaveUserData = (updatedData: UserData) => {
  userData.value = { ...updatedData };
};
</script>

<template>
  <div class="mt-10 items-center justify-center flex flex-col gap-4">
    <div class="widget-card bg-gray-100 border-[#A4D39A] rounded p-4 md:p-6 flex flex-col">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex flex-col w-full md:w-auto">
          <div class="flex flex-col gap-2">
            <div class="flex items-center">
              <h3 class="text-[16px] font-semibold mb-1 text-gray-700">User: nekolas999</h3>
              <i class="pi pi-pencil ml-2 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors" @click="openEditDialog"></i>
            </div>
            <p class="text-[21px] font-normal mb-1 text-black">Profile:</p>
          </div>
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
            <div class="flex flex-col gap-4">
              <p class="text-sm text-gray-500">Name: {{ userData.name }}</p>
              <p class="text-sm text-gray-500">Email: {{ userData.email }}</p>
              <p class="text-sm text-gray-500">User Account Type: </p>
            </div>
            <div class="flex flex-col gap-4">
              <p class="text-sm text-gray-500">Last Name: {{ userData.lastName }}</p>
              <button
                  class="cursor-pointer bg-[#A4D39A] flex flex-row items-center gap-2 h-6 rounded-md overflow-hidden px-3">
                <p class="text-sm text-gray-700 inline">Manage Subscription</p>
              </button>
              <button
                  class="cursor-pointer bg-white flex flex-row items-center gap-2 h-5 w-36 rounded-md overflow-hidden px-4">
                <p class="text-sm text-gray-500 text-center">Domestic</p>
              </button>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center md:justify-end mt-4 md:mt-0">
          <figure class="cursor-pointer w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden">
            <img :src="userData.photoUrl" alt="profile_photo" class="size-full object-cover" />
          </figure>
        </div>
      </div>
    </div>

    <!-- Profile Edit Dialog -->
    <ProfileEditInfoDialog
      v-model:visible="showEditDialog"
      :userData="userData"
      @save="handleSaveUserData"
    />
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

@media (max-width: 640px) {
  .widget-card {
    max-width: 100%;
  }
}
</style>