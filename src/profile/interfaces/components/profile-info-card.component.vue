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
