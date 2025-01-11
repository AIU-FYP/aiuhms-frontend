<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import Popup from '~/components/StudentRoomChangePopup.vue'
import {useNuxtApp} from "#app";

interface RequestFields {
  id: number
  date: string
  name: string
  studentIdNumber: string
  roomNumber: string
  whatsappNumber: string
  emailAddress: string
  gender: string
  extend?: boolean | string
}

const columns = [
  {key: 'id', label: 'id'},
  {key: "date", label: 'Date',},
  {key: 'student', label: 'Name', sortable: true},
  {key: 'room_number', label: 'Room No', sortable: true},
  {key: 'gender', label: 'Gender', sortable: true},
  {key: 'status', label: 'Status', sortable: true},
  {key: 'extend', label: 'View', sortable: false,}
]

const fetchData = async () => {

  isLoading.value= true;
  try {
    const response = await api.get("/change-room-requests/");
    requests.value = response.data.map((request: RequestFields) => ({
      ...request,
      date: new Date().toLocaleDateString(),
    }));
    totalItems.value = response.data.length;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  finally {
    isLoading.value = false;
  }
}

definePageMeta({
  middleware: 'auth',
});

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
  extend?: boolean | string
}

const requests = ref<RequestFields[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);
const q = ref('');
const api = $axios()
const isLoading = ref(false);
const isPopupVisible = ref(false);
const currentRequest = ref({});

onMounted(fetchData)

const openPopup = (row: StudentRequest) => {
  currentRequest.value = row;
  isPopupVisible.value = true;
};

const filteredRows = computed(() => {
  if (!q.value) {
    return requests.value;
  }

  return requests.value.filter((request) => {
    return Object.values(request).some((value) => {
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
  <div class="dashboard-layout">
    <div class="dashboard-container">

      <aside class="navigation-panel">
        <AdminSidebar/>
      </aside>

      <main class="content-area" v-if="isLoading">
        <loader />
      </main>

      <main class="content-area" v-else>
        <div class="content-wrapper">

          <div class="content-body">
            <div class="header-section">

              <div class="search-wrapper">
                <UInput v-model="q" placeholder="Filter requests..." />
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
}

@media (max-width: 1200px) {
  .dashboard-layout {
    display: block;
  }

  .navigation-panel {
    min-height: 30vh;
  }
}

.content-wrapper {
  flex: 10;
  background-color: #eeeeee;
}

.header-section {
  display: inline-flex;
  flex-wrap: wrap;
  margin: 0.5rem;
  align-items: center;
}

.search-wrapper {
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

