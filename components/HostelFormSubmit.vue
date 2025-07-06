<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useNuxtApp} from "#app";
import AdminSidebar from "~/components/AdminSidebar.vue";

definePageMeta({
  middleware: 'auth',
});

let {$axios} = useNuxtApp()

const api = $axios
const isLoading = ref(false);

interface HostelStats {
  student_statistics: {
    male_students: number;
    female_students: number;
    total_students: number;
  };
  occupancy_statistics: {
    total_capacity: number;
    occupied_beds: number;
    available_beds: number;
    occupancy_rate: number;
  };
  request_statistics: {
    maintenance_requests: number;
    change_room_requests: number;
    total_requests: number;
  };
  hostel_statistics: {
    total_hostels: number,
    total_rooms: number,
  }
}

const stats = ref<HostelStats | null>(null)

const isFetching = ref(true);

const fetchStats = async () => {
  try {
    const { data } = await api.get('/hostels/stats/')
    stats.value = data
    isFetching.value = false
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  fetchStats();
})

definePageMeta({
  middleware: 'auth',
});

</script>

<template>
  <div class="dashboard-layout">
    <div class="dashboard-container">
      <aside class="navigation-panel">
        <AdminSidebar />
      </aside>
      <loader v-if="isLoading" />
      <main class="content-area" v-else>
        <HostelForm />
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: block;
}

.dashboard-container {
  display: flex;
  flex-wrap: nowrap;
  padding: 0;
  border-top: 3px solid var(--text-hover-color);
  border-bottom: 3px solid var(--text-hover-color);
  width: 100%;
  margin: 0 auto;
}

.navigation-panel {
  flex: 2;
  background-color: var(--primary-color);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-area {
  flex: 6;
  margin: 1rem;
}

@media (max-width: 1200px) {
  .dashboard-layout {
    display: block;
  }

  .navigation-panel {
    min-height: 30vh;
  }
}

.info-content div {
  margin: 1rem;
}

.welcome-wrapper h2 {
  font-size: 1.5rem;
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .content-area {
    padding: 1rem;
  }
}

@media (max-width: 1200px) {
  .dashboard-container {
    display: block;
  }
}

@media (max-width: 768px) {
  .navigation-panel {
    flex-basis: 100%;
  }

  .content-area {
    padding: 1rem;
  }
}
</style>
