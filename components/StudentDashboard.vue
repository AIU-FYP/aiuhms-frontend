<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import Popup from '~/components/StudentInfoPopup.vue'
import {useNuxtApp} from "#app";
import AdminSidebar from "~/components/AdminSidebar.vue";
import Loader from "~/components/Loader.vue";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Person {
  id: number
  date: string
  name: string
  student_id: string
  passport: string
  phone: string
  email: string
  gender: string
  religion: string
  major: string
  status: string
  extend?: boolean | string
  nationality: string;
  hostel_name: string;
  level_number: number;
  room_number: number;
  bed_number: number;
  filteredRows: string;
}

const {$axios} = useNuxtApp()
const api = $axios()
const bedMapping: Record<string, string> = {
  '01': 'A',
  '02': 'B',
  '03': 'C',
  '04': 'D'
};
const columns = [
  {key: 'name', label: 'Name',},
  {key: 'student_id', label: 'Student ID',},
  {key: 'gender', label: 'Gender', sortable: true},
  {key: 'hostel_name', label: 'Hostel Name', sortable: true},
  {key: 'level_number', label: 'Level No',},
  {key: 'room_number', label: 'Room No',},
  {key: 'bed_number', label: 'Bed No',},
  {key: 'status', label: 'Status', sortable: false},
  {key: 'extend', label: 'View', sortable: false},
];
const people = ref<Person[]>([]);
const currentPage = ref(1);
const pageSize = ref(8);
const q = ref('');
const isLoading = ref(true);
const allHostels = ref([]);
const fetchData = async () => {
  isLoading.value = true;
  try {
    const response = await api.get("/students/");
    const {data} = await api.get('/hostels/');

    allHostels.value = data;

    people.value = response.data.map((student: Person) => ({
      ...student,
      bed_number: bedMapping[String(student.bed_number).padStart(2, '0')] || String(student.bed_number)
    }));

    console.log('Fetched and transformed students:', people.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
};
const isPopupVisible = ref(false);
const currentStudent = ref({});
const openPopup = (row: Person) => {
  currentStudent.value = row;
  isPopupVisible.value = true;
};
const selectedFilter = ref('active');
const filterOptions = [
  {value: 'active', label: 'Active'},
  {value: 'foundation', label: 'Foundation'},
  {value: 'internship', label: 'Internship'},
  {value: 'inactive', label: 'Non-Active'},
  {value: 'graduated', label: 'Graduated'},
  {value: 'terminated', label: 'Terminated'},
];
const filteredRows = computed(() => {
  let result = people.value;

  if (selectedFilter.value) {
    result = result.filter(request => request.status === selectedFilter.value);
  }

  if (q.value) {
    result = result.filter(person => {
      return Object.values(person).some(value =>
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
const generatePDF = () => {
  const doc = new jsPDF();
  doc.text(`AIU Students Report - ${selectedFilter.value.toUpperCase()}`, 14, 10);

  const isGraduatedReport = filteredRows.value.every(people => people.status.toLowerCase() === "graduated");

  const filteredData = filteredRows.value.map((people, index) => {
    if (people.status.toLowerCase() === "graduated") {
      return [
        index + 1,
        people.name,
        people.nationality,
        people.phone,
        people.gender,
        people.status,
        people.major,
      ];
    } else {
      return [
        index + 1,
        people.name,
        people.nationality,
        people.phone,
        people.gender,
        people.status,
        people.hostel_name,
        people.level_number,
        people.room_number,
        String(people.bed_number)
            .replace("01", "A")
            .replace("02", "B")
            .replace("03", "C")
            .replace("04", "D")
      ];
    }
  });

  let tableHeaders = ['#', 'Name', 'Nationality', 'Phone', 'Gender', 'Status'];

  if (isGraduatedReport) {
    tableHeaders.push('Program/Major');
  } else {
    tableHeaders.push('Hostel', 'Level', 'Room', 'Bed');
  }

  autoTable(doc, {
    head: [tableHeaders],
    body: filteredData,
  });

  doc.save(`AIU Students Report-${selectedFilter.value}.pdf`);
};

onMounted(() => {
  fetchData();
});

definePageMeta({
  middleware: 'auth',
});
</script>

<template>
  <div class="dashboard-wrapper">
    <Popup
        :show="isPopupVisible"
        @update:show="isPopupVisible = $event"
        :student="currentStudent"
        :all-hostels="allHostels"
    />
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
                <input type="text" v-model="q" placeholder="Filter students..." class="filter-box">
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
  min-height: 110vh;
}

.filter-wrapper,
.filter-dropdown,
.download-btn-wrapper {
  padding: 1rem 1rem 0 1rem;
}

.filter-dropdown .filter-box,
.filter-wrapper .filter-box,
.download-btn-wrapper .download-button {
  padding: 5px;
  border-radius: 5px;
  outline: none;
  border: none;
  color: var(--primary-hover-color);
}

.download-button {
  background-color: var(--primary-hover-color);
  color: var(--text-light-color) !important;
  border-radius: 10px 0 !important;
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

