<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useNuxtApp} from '#app'
let {$axios} = useNuxtApp()
const api = $axios()

const isLoading = ref(false);
const router = useRouter();

async function navigateToPage(url: string) {
  isLoading.value = true;
  try {
    setTimeout(async () => {
      await router.push(url);
      isLoading.value = false;
    }, 2000);
  } catch (error) {
    console.error('Navigation error:', error);
    isLoading.value = false;
  }
}

const visibleButtonIndex = ref<number | null>(null);

const navigationButtons = [
  {
    name: "Student",
    icon: "ph-student",
    links: [
      {text: "Register Student", url: "/student-registration-form"},
      {text: "Manage Student", url: "/student-registration-dashboard"},
    ],
  },
  {
    name: "Maintenance",
    icon: "wpf-maintenance",
    links: [
      {text: "Maintenance Form", url: "/maintenance-room-form"},
      {text: "Manage Maintenance", url: "/maintenance-room-dashboard"},
    ],
  },
  {
    name: "Change Room",
    icon: "bx-building",
    links: [
      {text: "Change Room Form", url: "/change-room-form"},
      {text: "Manage Room Changes", url: "/change-room-dashboard"},
    ],
  },
  {
    name: "Hostels",
    icon: "bx-building",
    links: [
      {text: "Add new Hostel", url: "/new-hostel-form"},
      {text: "Manage Rooms", url: "/room-dashboard"},
    ],
  },
];

function toggleLinkVisibility(index: number) {
  visibleButtonIndex.value = visibleButtonIndex.value === index ? null : index;
}

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
      },
      {
        subTitle: "Available Beds",
        icon: "mdi-bed-outline",
        totalNum: stats.value?.occupancy_statistics.available_beds ?? 0
      },
      {
        subTitle: "Occupied Beds",
        icon: "fa-bed",
        totalNum: stats.value?.occupancy_statistics.occupied_beds ?? 0
      },
      {
        subTitle: "Male Students",
        icon: "fa-male",
        totalNum: stats.value?.student_statistics.male_students ?? 0
      },
      {
        subTitle: "Female Students",
        icon: "fa-female",
        totalNum: stats.value?.student_statistics.female_students ?? 0
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
    ],
  },
])

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


</script>

<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-container">
      <aside class="dashboard-sidebar">
        <div v-for="(button, index) in navigationButtons" :key="index">
          <div class="button-wrapper">
            <button
                @click="toggleLinkVisibility(index)"
                :aria-expanded="visibleButtonIndex === index"
                class="sidebar-btn"
            >
              <UIcon
                  :name="button.icon"
              />
              {{ button.name }}
            </button>
          </div>
          <ul v-if="visibleButtonIndex === index">
            <li v-for="(link, linkIndex) in button.links" :key="linkIndex">
              <a @click.prevent="navigateToPage(link.url)" style="cursor: pointer">{{ link.text }}</a>
            </li>
          </ul>
        </div>
      </aside>

      <main class="content-area">

        <section class="info-content">
          <div class="welcome-wrapper">
            <h2>Welcome back </h2>
          </div>
          <div class="image-wrapper">
            <img src="/images/login.webp" alt="welcome-image">
          </div>
        </section>

        <div v-if="isFetching" class="loading-indicator">
          <Loader/>
        </div>
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
                <h4>{{ stat.subTitle }}</h4>
                <span class="stat-icon">
              <UIcon :name="stat.icon" />
            </span>
              </div>
              <div class="stat-number">
                <span>{{ stat.totalNum }}</span>
              </div>
            </div>
          </div>
        </section>

      </main>

    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  display: block;
  background-color: var(--primary-color);
}

.dashboard-container {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  padding: 0;
  border-top: 3px solid var(--text-hover-color);
  border-bottom: 3px solid var(--text-hover-color);
  width: 100%;
  margin: 0 auto;
}

.dashboard-sidebar {
  flex: 2;
  background-color: var(--primary-color);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-area{
  flex: 6;
}

@media (max-width: 1200px) {
  .dashboard-wrapper {
    display: block;
  }

  .dashboard-container{
    flex-direction: column;
  }

  .dashboard-sidebar {
    min-height: 30vh;
  }
}


.button-wrapper {
  padding: .5rem;
  background-color: transparent;
}

.button-wrapper:hover {
  background-color: var(--primary-hover-color);
}

.sidebar-btn {
  font-size: 1rem;
  color: var(--text-light-color);
  margin-bottom: 0.5rem;
  text-align: start;
  border-radius: .5rem;
  transition: 0.3s ease-in-out;
}

.sidebar-btn:hover {
  color: var(--text-hover-color);
}

.dashboard-sidebar ul li {
  list-style: none;
  margin: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  text-align: start;
  text-transform: capitalize;
  font-weight: normal;
  color: var(--text-hover-color);
  background-color: transparent;
}

.dashboard-sidebar li:hover {
  color: var(--text-hover-color);
  background-color: var(--primary-hover-color);
  transition: .3s ease-in-out;
}

.content-area {
  flex: 10;
  padding: 2rem;
  background-color: #eeeeee;
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

.stat-item .stat-number {
  padding: 1rem 0.5rem;
  flex: 2;
  border-radius: 0 1rem 1rem 0;
  background-color: var(--primary-color);
}

.stat-item .stat-number > span {
  display: flex;
  margin: 2rem 0;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--text-light-color);
}

.stat-item h4 {
  font-size: 1.1rem;
  color: var(--primary-color);
}

.stat-icon {
  font-size: 2rem;
  color: var(--primary-color);
  margin: 0.5rem 0;
}

@media (max-width: 768px) {
  .dashboard-sidebar {
    flex-basis: 100%;
  }

  .content-area {
    padding: 1rem;
  }

  .stat-wrapper {
    flex-direction: column;
  }
}
</style>

