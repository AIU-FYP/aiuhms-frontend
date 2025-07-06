<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
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
    'total_active': number,
    'total_inactive': number,
    'total_graduated': number,
    'total_terminated': number
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

const dashboardItems = computed(() => [
  {
    title: "Main Dashboard",
    maintenanceStats: [
      {
        subTitle: "Total Hostels",
        icon: "mdi-office-building",
        totalNum: stats.value?.hostel_statistics.total_hostels ?? 0
      },
      {
        subTitle: "Total Rooms",
        icon: "mdi-door",
        totalNum: stats.value?.hostel_statistics.total_rooms ?? 0
      }
      ,
      {
        subTitle: "Available Beds",
        icon: "mdi-bed-outline",
        totalNum: stats.value?.occupancy_statistics.available_beds ?? 0
      },
      {
        subTitle: "Occupied Beds",
        icon: "mdi-bed",
        totalNum: stats.value?.occupancy_statistics.occupied_beds ?? 0
      },
      {
        subTitle: "Maintenance Requests",
        icon: "mdi-tools",
        totalNum: stats.value?.request_statistics.maintenance_requests ?? 0
      },
      {
        subTitle: "Change Room Requests",
        icon: "mdi-swap-horizontal",
        totalNum: stats.value?.request_statistics.change_room_requests ?? 0
      },
      {
        subTitle: "Male Students",
        icon: "mdi-account-check",
        totalNum: stats.value?.student_statistics.male_students ?? 0
      },
      {
        subTitle: "Female Students",
        icon: "mdi-gender-female",
        totalNum: stats.value?.student_statistics.female_students ?? 0
      },
      {
        subTitle: "Active Students ",
        icon: "mdi-account-check",
        totalNum: stats.value?.student_statistics.total_active ?? 0
      },
      {
        subTitle: "Inactive Students ",
        icon: "mdi-account-off",
        totalNum: stats.value?.student_statistics.total_inactive ?? 0
      },
      {
        subTitle: "Graduated Students ",
        icon: "mdi-school",
        totalNum: stats.value?.student_statistics.total_graduated ?? 0
      },
      {
        subTitle: "Terminated Students ",
        icon: "mdi-account-remove",
        totalNum: stats.value?.student_statistics.total_terminated ?? 0
      },
    ],
  },
])

const isFetching = ref(true);

const fetchStats = async () => {
  try {
    const {data} = await api.get('/hostels/stats/')
    stats.value = data
    isFetching.value = false
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  fetchStats();
})

</script>

<template>
  <div class="dashboard-layout">
    <div class="dashboard-container">
      <aside class="navigation-panel">
        <AdminSidebar/>
      </aside>

      <loader v-if="isLoading"/>

      <main class="content-area" v-else>
        <section class="info-content">
          <div class="welcome-wrapper">
            <h2>Welcome back</h2>
          </div>
          <div class="image-wrapper">
            <img src="../public/images/login.webp" alt="welcome-image"/>
          </div>
        </section>

        <section v-if="isFetching" class="loading-indicator">
          <Loader/>
        </section>

        <section
            v-else
            v-for="item in dashboardItems"
            :key="item.title"
            class="analysis-wrapper"
        >
          <div class="stat-wrapper">
            <div
                v-for="(stat, index) in item.maintenanceStats"
                :key="index"
                class="stat-item"
            >
              <div class="stat-box">
                <h3 class="analysis-title">
                  <UIcon :name="stat.icon" class="stat-icon"/>
                  {{ stat.subTitle }}
                </h3>
                <h3 class="analysis-num">{{ stat.totalNum }}</h3>
              </div>
              <div class=""></div>
            </div>
          </div>
        </section>
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

.info-content {
  display: flex;
  justify-content: space-between;
  padding: 0;
  border: 2px solid var(--primary-color);
  border-radius: 1rem;
}

@media (max-width: 1200px) {
  .info-content {
    display: block;
  }
}

.info-content div {
  margin: 1rem;
}

.welcome-wrapper h2 {
  font-size: 1.5rem;
  color: var(--primary-color);
}

.info-content .image-wrapper {
  width: 120px;
  height: 120px;
}

.analysis-wrapper {
  margin-bottom: 2rem;
}

.stat-wrapper {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.stat-item {
  flex: 1 1 20%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: var(--text-hover-color);
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0 1rem 1rem 0 !important;
}

.stat-item .stat-box {
  flex: 5;
  padding: 1rem 0.5rem;
}

.stat-item .analysis-num {
  flex: 1;
  font-size: 1.5rem;
  color: var(--primary-color);
  padding: 0;
  border-radius: 0;
  align-items: center;
}

.stat-item .stat-number > span {
  display: flex;
  margin: 0;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--text-light-color);
}

.analysis-title {
  font-size: 1rem;
  color: var(--primary-color);
  margin: 0;
  padding: 0;
  text-transform: capitalize;
  text-align: center;
}

@media (max-width: 768px) {
  .content-area {
    padding: 1rem;
  }

  .stat-wrapper {
    flex-direction: column;
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

