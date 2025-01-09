<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import Popup from '~/components/RoomPopup.vue'
import {useNuxtApp} from "#app";

let {$axios} = useNuxtApp()

interface Hostel {
  id: number
  date: string
  name: string
  gender: string
  email: string
  extend?: boolean | string
}

const columns = [
  {key: 'gender', label: 'Gender', sortable: true},
  {key: 'date', label: 'Date', sortable: true},
  {key: 'name', label: 'Block Name', sortable: true},
  {key: 'extend', label: 'View', sortable: false,},
]

const hostels = ref<Hostel[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);
const q = ref('');

const api = $axios()

const fetchData = async () => {

  isLoading.value = true

  try {
    const response = await api.get("/hostels/");
    hostels.value = response.data.map((hostel: Hostel) => ({
      ...hostel,
      date: new Date().toLocaleDateString(),
    }));
    totalItems.value = response.data.length;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false
  }
}

const isPopupVisible = ref(false);
const currentHostel = ref({});

onMounted(fetchData)

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
      {text: "Add new Building", url: "/new-hostel-form"},
      {text: "Manage Rooms", url: "/room-dashboard"},
    ],
  },
];

function toggleLinkVisibility(index: number) {
  visibleButtonIndex.value = visibleButtonIndex.value === index ? null : index;
}

const isLoading = ref(false);
const router = useRouter();

async function navigateToPage(url: string) {
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

definePageMeta({
  middleware: 'auth',
});

const openPopup = (row: Hostel) => {
  currentHostel.value = row;
  isPopupVisible.value = true;
};

const filteredRows = computed(() => {
  if (!q.value) {
    return hostels.value;
  }

  return hostels.value.filter((hostel) => {
    return Object.values(hostel).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredRows.value.slice(start, end);
});

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};

onMounted(fetchData)

</script>

<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-container">

      <aside class="navigation-sidebar">
        <div v-for="(button, index) in navigationButtons" :key="index">
          <div class="navigation-button-wrapper">
            <button
                @click="toggleLinkVisibility(index)"
                :aria-expanded="visibleButtonIndex === index"
                class="navigation-button"
            >
              <UIcon :name="button.icon" />
              {{ button.name }}
            </button>
          </div>
          <ul v-if="visibleButtonIndex === index" class="navigation-links">
            <li v-for="(link, linkIndex) in button.links" :key="linkIndex" class="navigation-link-item">
              <a @click.prevent="navigateToPage(link.url)" class="navigation-link">{{ link.text }}</a>
            </li>
          </ul>
        </div>
      </aside>

      <main class="content-section" v-if="isLoading">
        <Loader />
      </main>

      <main class="content-section" v-else>
        <div class="content-wrapper">

          <div class="content-body">

            <div class="header-section">
              <div class="search-bar">
                <UInput v-model="q" placeholder="Filter hostels..." />
              </div>
            </div>

            <UTable :columns="columns" :rows="paginatedRows">
              <template #extend-data="{ row }">
                <a @click="openPopup(row)" class="view-button">View</a>
                <Popup
                    :show="isPopupVisible"
                    @update:show="isPopupVisible = $event"
                    :hostel="currentHostel"
                />
              </template>
            </UTable>
            <hr class="section-divider" />
            <div class="pagination-controls">
              <button
                  :disabled="currentPage === 1"
                  @click="handlePageChange(currentPage - 1)"
                  class="pagination-button"
              >
                <UIcon name="mdi-arrow-left" />
              </button>
              <span class="pagination-info">Page {{ currentPage }} of {{ Math.ceil(totalItems / pageSize) }}</span>
              <button
                  :disabled="currentPage >= Math.ceil(totalItems / pageSize)"
                  @click="handlePageChange(currentPage + 1)"
                  class="pagination-button"
              >
                <UIcon name="mdi-arrow-right" />
              </button>
            </div>
          </div>
        </div>
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
  padding: 0;
  border-top: 3px solid var(--text-hover-color);
  border-bottom: 3px solid var(--text-hover-color);
  width: 100%;
  margin: 0 auto;
}

.navigation-sidebar {
  flex: 2;
  background-color: var(--primary-color);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-section {
  flex: 6;
  padding: 50px;
  background-color: #eeeeee;
}

@media (max-width: 1200px) {
  .dashboard-container {
    display: block;
  }

  .navigation-sidebar {
    min-height: 30vh;
  }
}

.navigation-button-wrapper {
  padding: .5rem;
  background-color: transparent;
}

.navigation-button-wrapper:hover {
  background-color: var(--primary-hover-color);
}

.navigation-button {
  font-size: 1rem;
  color: var(--text-light-color);
  margin-bottom: 0.5rem;
  text-align: start;
  border-radius: .5rem;
  transition: 0.3s ease-in-out;
}

.navigation-button:hover {
  color: var(--text-hover-color);
}

.navigation-links {
  padding: 0;
  margin: 0;
  list-style: none;
}

.navigation-link-item {
  margin: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  text-align: start;
  text-transform: capitalize;
  font-weight: normal;
  color: var(--text-hover-color);
  background-color: transparent;
}

.navigation-link-item:hover {
  color: var(--text-hover-color);
  background-color: var(--primary-hover-color);
  transition: .3s ease-in-out;
}

.navigation-link {
  text-decoration: none;
  color: inherit;
}

.header-section {
  display: inline-flex;
  flex-wrap: wrap;
  margin: 0.5rem;
  align-items: center;
}

.search-bar {
  padding: 1rem;
}

.view-button {
  padding: .5rem;
  border-radius: .5rem 0;
  color: var(--text-hover-color);
  background-color: var(--primary-hover-color);
  cursor: pointer;
}

.view-button:hover {
  color: var(--text-light-color);
  background-color: var(--primary-color);
  transition: .3s ease-in-out;
}

.section-divider {
  border-bottom: 2px solid var(--primary-hover-color);
  margin: 1rem 0;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.pagination-info {
  padding: .5rem 1rem;
  border-radius: .5rem;
  transition: 0.3s ease-in-out;
}

.pagination-button {
  padding: .5rem;
  border-radius: .5rem;
  color: var(--text-light-color);
  background-color: var(--primary-color);
  transition: 0.3s ease-in-out;
}

@media (max-width: 768px) {
  .navigation-sidebar {
    flex-basis: 100%;
  }

  .content-section {
    padding: 1rem;
  }
}
</style>

