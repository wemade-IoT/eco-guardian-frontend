<template>
  <div class="main-dashboard-container">
    <div v-if="isEnterprise || isDomestic" class="dashboard-container">
      
          <div class="dashboard-column flex flex-col gap-2">
            <div class="line-chart">
                      <lines-chart></lines-chart>
            </div>
            <div class = "widgets">        
              <widgets-container></widgets-container>
            </div>
          </div>
        <!--  <div v-if="isEnterprise">
            <devices-list></devices-list>
          </div> -->
        <div class="list-container">
          <plants-list></plants-list>
        </div>
        <div class="flex flex-col gap-2 h-full justify-around">
          <div class="tips-carousel-container">
            <tips-carousel></tips-carousel>
          </div>
          <div class="alerts-list-container">
            <alerts-list></alerts-list>
          </div>
        </div>
    </div>

    <div v-else class="grid grid-cols-3 gap-2 h-max py-3" style="background-color: pink;">
      <tips-carousel></tips-carousel>
      <tips-carousel></tips-carousel>
      <tips-carousel></tips-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../../iam/interfaces/store/auth-store.ts';
import AlertsList from '../../../monitoring/interfaces/alerts-list.component.vue';
import LinesChart from '../../../analytics/interfaces/components/line-chart.component.vue';

import TipsCarousel from '../../../crm/interfaces/components/tips-carousel.component.vue';
import WidgetsContainer from '../components/widgets-container.component.vue';
import PlantsList from '../../../monitoring/interfaces/components/plants-list.component.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
console.log('Dashboard component loaded with role:', authStore.role);
const isEnterprise = authStore.role === 'Business' || authStore.role === 'Admin';
const isDomestic = authStore.role === 'Domestic';


// TODO: revisar el login al parecer no se actualiza o no captura el role en base al token
// aplicamos reinicio forzado del dashboard para que se actualice el role
onMounted(() => {
  if (authStore.role === 'Specialist') {
    router.push('/consulting');
  }


  if (!localStorage.getItem('reloaded')) {
    localStorage.setItem('reloaded', 'true');
    window.location.reload();
  }
});
</script>
<style>

.dashboard-container {
  display: flex;
  gap: 1rem;
  height: 100%;
  width: 100%;
}


.main-dashboard-container {
  height: 100%;
  overflow-y: hidden;
}

.list-container {
  width: 30%;
  height: 100%;
  overflow-y: auto;
}

.tips-carousel-container {
  width: 100%;
}

.alerts-list-container {
  width: 100%;
}

.dashboard-column {
  width: 40%;
}


@media (max-width: 1024px) {

  .dashboard-container {
    flex-direction: column;
    overflow-y: auto;
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: #9CA3AF transparent; /* Firefox */
  }

  .dashboard-column {
    width: 100%;
    max-height: none;
  }

}

</style>