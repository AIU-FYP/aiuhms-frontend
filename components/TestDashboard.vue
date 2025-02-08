<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import Popup from '~/components/StudentRoomChangePopup.vue'
import {useNuxtApp} from "#app";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
interface RequestFields {
  id: number
  date: string
  name: string
  studentIdNumber: string
  roomNumber: string
  whatsappNumber: string
  emailAddress: string
  gender: string
  status: string
  extend?: boolean | string
}
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
const columns = [
  {key: 'student', label: 'Name', sortable: true},
  {key: 'room_number', label: 'Room No', sortable: true},
  {key: 'gender', label: 'Gender', sortable: true},
  {key: 'status', label: 'Status', sortable: true},
  {key: 'extend', label: 'View', sortable: false,}
]
const api = $axios()
const requests = ref<RequestFields[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const q = ref('');
const isLoading = ref(false);
const isPopupVisible = ref(false);
const currentRequest = ref({});
const fetchData = async () => {
  isLoading.value = true;
  try {
    const response = await api.get("/change-room-requests/");
    requests.value = response.data.map((request: RequestFields) => ({
      ...request,
      date: new Date().toLocaleDateString(),
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
}

definePageMeta({
  middleware: 'auth',
});

onMounted(fetchData)

const openPopup = (row: StudentRequest) => {
  currentRequest.value = row;
  isPopupVisible.value = true;
};

const selectedFilter = ref('pending');

const filterOptions = [
  {value: 'pending', label: 'Pending'},
  {value: 'accepted', label: 'Accepted'},
  {value: 'rejected', label: 'Rejected'},
];

const filteredRows = computed(() => {
  let result = requests.value;

  if (selectedFilter.value) {
    result = result.filter(request => request.status === selectedFilter.value);
  }

  if (q.value) {
    const query = q.value.toLowerCase();
    result = result.filter(request =>
        Object.values(request).some(value =>
            String(value).toLowerCase().includes(query)
        )
    );
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

const generatePDF = () => {
  const doc = new jsPDF();
  doc.text(`Student Requests Report - ${selectedFilter.value.toUpperCase()}`, 14, 10);

  const filteredData = filteredRows.value.map(request => [
    request.id,
    request.name,
    request.studentIdNumber,
    request.roomNumber,
    request.whatsappNumber,
    request.emailAddress,
    request.gender,
    request.status
  ]);

  autoTable(doc, {
    head: [['ID', 'Date', 'Name', 'Student ID', 'Room No', 'WhatsApp', 'Email', 'Gender', 'Status']],
    body: filteredData,
  });

  doc.save(`requests-${selectedFilter.value}.pdf`);
};
</script>

<template>
  <div class="dashboard-layout">
    <div class="dashboard-container">

      <aside class="navigation-panel">
        <AdminSidebar />
      </aside>

      <loader v-if="isLoading" />

      <main class="content-area" v-else>
        <div class="content-wrapper">

          <div class="content-body">
            <div class="header-section">

              <div class="search-wrapper">
                <input v-model="q" placeholder="Filter requests..." class="filter-box"/>
              </div>

              <div class="filter-dropdown">
                <select class="filter-box" v-model="selectedFilter" @click="filteredRows">
                  <option value="" disabled selected>Filter students...</option>
                  <option v-for="option in filterOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
              <div class="download-btn-wrapper">
                <button @click="generatePDF" class="download-button">Download Report</button>
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
                <UIcon name="mdi-arrow-left"/>
              </button>
              <span class="pagination-info">Page {{ currentPage }} of {{ Math.ceil(totalItems / pageSize) }}</span>
              <button
                  :disabled="currentPage >= Math.ceil(totalItems / pageSize)"
                  @click="handlePageChange(currentPage + 1)"
                  class="pagination-button"
              >
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
  gap: 15px 0 ;
}

.filter-box {
  padding: 2px;
  border-radius: 5px;
  outline: none;
  border: 2px solid #EEEEEE;
}

.search-wrapper {
  padding: 1rem;
}

.download-btn-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
}

.download-btn-wrapper button{
  border: none;
  background: var(--primary-color);
  color: var(--text-light-color);
  outline: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
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

