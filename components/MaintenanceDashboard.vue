<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import Popup from '~/components/StudentMaintenanceRoomPopup.vue'
import {useNuxtApp} from "#app";

let {$axios} = useNuxtApp()

interface StudentRequest {
  id: number
  date: string
  name: string
  studentIdNumber: string
  roomNumber: string
  whatsappNumber: string
  emailAddress: string
  gender: string
  request: string
  status: string
  extend?: boolean | string
}

const columns = [
  {key: 'student', label: 'Name', sortable: true},
  {key: 'room_number', label: 'Room No', sortable: true},
  {key: 'gender', label: 'Gender', sortable: true},
  {key: 'status', label: 'Status', sortable: true},
  {key: 'extend', label: 'View', sortable: false,}
]

const isLoading = ref(false);
const requests = ref<StudentRequest[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const q = ref('');

onMounted(() => {
  fetchData();
});

definePageMeta({
  middleware: 'auth',
});

const api = $axios()
const fetchData = async () => {

  isLoading.value = true;
  try {
    const response = await api.get("/maintenance-requests/");
    requests.value = response.data.map((request: StudentRequest) => ({
      ...request,
      date: new Date().toLocaleDateString(),
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }

}
const isPopupVisible = ref(false);
const currentRequest = ref({});

onMounted(fetchData)

definePageMeta({
  middleware: 'auth',
});

const openPopup = (row: StudentRequest) => {
  currentRequest.value = row;
  isPopupVisible.value = true;
};

onMounted(fetchData)

const selectedFilter = ref('Pending');

const filterOptions = [
  {value: 'Pending', label: 'Pending'},
  {value: 'ppk_done', label: 'Accepted'},
  {value: 'rejected', label: 'Rejected'},
];

const filteredRows = computed(() => {
  let result = requests.value;

  if (selectedFilter.value) {
    result = result.filter(request => request.status === selectedFilter.value);
  }

  if (q.value) {
    result = result.filter(request => {
      return Object.values(request).some(value =>
          String(value).toLowerCase().includes(q.value.toLowerCase())
      );
    });
  }

  return result;
});

const totalItems = computed(() => filteredRows.value.length);
const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredRows.value.slice(start, end);
});

const handlePageChange = (newPage: number) => {
  if (newPage > 0 && newPage <= Math.ceil(totalItems.value / pageSize.value)) {
    currentPage.value = newPage;
  }
};




</script>

<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-container">
      <aside class="navigation-panel">
        <AdminSidebar/>
      </aside>

      <Loader v-if="isLoading"/>

      <main class="content-area" v-else>
        <div class="content-wrapper">
          <div class="content-body">
            <div class="header-section">

              <div class="filter-wrapper">
                <input v-model="q" placeholder="Filter students..." class="filter-box"/>
              </div>

              <div class="filter-dropdown">
                <select class="filter-box" v-model="selectedFilter" @click="filteredRows">
                  <option value="" disabled selected>Filter students...</option>
                  <option v-for="option in filterOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>


            </div>

            <UTable :columns="columns" :rows="paginatedRows">
              <template #extend-data="{ row }">
                <a @click="openPopup(row)" class="view-button">View</a>
                <Popup
                    :show="isPopupVisible"
                    @update:show="isPopupVisible = $event"
                    :request="currentRequest"
                />
              </template>
            </UTable>

            <div class="pagination-controls">
              <button :disabled="currentPage === 1" @click="handlePageChange(currentPage - 1)"
                      class="pagination-button">
                <UIcon name="mdi-arrow-left"/>
              </button>
              <span class="pagination-info">Page {{ currentPage }} of {{ Math.ceil(totalItems / pageSize) }}</span>
              <button :disabled="currentPage >= Math.ceil(totalItems / pageSize)"
                      @click="handlePageChange(currentPage + 1)" class="pagination-button">
                <UIcon name="mdi-arrow-right"/>
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
}

@media (max-width: 1200px) {
  .dashboard-wrapper {
    display: block;
  }

  .navigation-panel {
    min-height: 30vh;
  }
}

.navigation-links li {
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

.navigation-links li:hover {
  color: var(--text-hover-color);
  background-color: var(--primary-hover-color);
  transition: .3s ease-in-out;
}

.content-wrapper {
  flex: 10;
  background-color: #eeeeee;
  padding: 0;
  min-height: 90vh;
}

.filter-wrapper,
.filter-dropdown {
  padding: 1rem 1rem 0 1rem;
}

.filter-dropdown .filter-box,
.filter-wrapper .filter-box {
  padding: 5px;
  border-radius: 5px;
  outline: none;
  border: none;
  color: var(--primary-hover-color);
}

.header-section {
  display: inline-flex;
  flex-wrap: wrap;
  margin: 0.5rem;
  align-items: center;
}

@media (max-width: 1200px) {
  .header-section {
    display: block;
  }
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

