<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Popup from '~/components/StudentInfoPopup.vue'
import { useNuxtApp } from "#app";
import { useRouter } from 'vue-router'

let { $axios } = useNuxtApp()

interface Person {
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
  bedId: number;
}

const columns = [
  { key: 'id', label: 'ID' },
  { key: "date", label: 'Date' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'student_id', label: 'Student ID', sortable: true },
  { key: 'hostel_name', label: 'Hostel Name', sortable: true },
  { key: 'level_number', label: 'Level No', sortable: true },
  { key: 'room_number', label: 'Room No', sortable: true },
  { key: 'bed_number', label: 'Bed No', sortable: true },
  { key: 'gender', label: 'Gender', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'extend', label: 'View', sortable: false }
];


const people = ref<Person[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);
const q = ref('');
const isLoading = ref(true);
const api = $axios()

const fetchData = async () => {
  isLoading.value = true;
  try {
    const response = await api.get("/students/");
    people.value = response.data.map((person: any) => ({
      ...person,
      hostel_name: person.bed ? person.bed.hostel_name : 'N/A',
      level_number: person.bed ? person.bed.level_number : 'N/A',
      room_number: person.bed ? person.bed.room_number : 'N/A',
      bed_number: person.bed ? person.bed.bed_number : 'N/A',
    }));
    console.log('Fetched students:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
};

const isPopupVisible = ref(false);
const currentStudent = ref({});

onMounted(() => {
  fetchData();
});
const visibleButtonIndex = ref<number | null>(null);

const navigationButtons = [
  {
    name: "Student",
    icon: "ph-student",
    links: [
      { text: "Register Student", url: "/student-registration-form" },
      { text: "Manage Student", url: "/student-registration-dashboard" },
    ],
  },
  {
    name: "Maintenance",
    icon: "wpf-maintenance",
    links: [
      { text: "Maintenance Form", url: "/maintenance-room-form" },
      { text: "Manage Maintenance", url: "/maintenance-room-dashboard" },
    ],
  },
  {
    name: "Change Room",
    icon: "bx-building",
    links: [
      { text: "Change Room Form", url: "/change-room-form" },
      { text: "Manage Room Changes", url: "/change-room-dashboard" },
    ],
  },
  {
    name: "Hostels",
    icon: "bx-building",
    links: [
      { text: "Add new Building", url: "/new-hostel-form" },
      { text: "Manage Rooms", url: "/room-dashboard" },
    ],
  },
];

function toggleLinkVisibility(index: number) {
  visibleButtonIndex.value = visibleButtonIndex.value === index ? null : index;
}

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

definePageMeta({
  middleware: 'auth',
});

const openPopup = (row: Person) => {
  currentStudent.value = row;
  isPopupVisible.value = true;
};


const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredRows.value.slice(start, end);
});

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};

onMounted(fetchData)

const selectedFilter = ref('active');

const filterOptions = [
  { value: 'graduated', label: 'Graduated Students' },
  { value: 'active', label: 'Active Students' },
  { value: 'inactive', label: 'Non-Active Students' },
];

const filteredRows = computed(() => {
  if (selectedFilter.value === 'graduated') {
    return people.value;
  } else if (selectedFilter.value === 'active') {
    return people.value.filter(person => person.status === 'active');
  } else if (selectedFilter.value === 'inactive') {
    return people.value.filter(person => person.status === 'inactive');
  }
  return people.value;
});


</script>

<template>
  <div class="admin-dashboard">
    <div class="container">
      <aside class="sidebar">
        <div v-for="(button, index) in navigationButtons" :key="index">
          <div class="btn-container">
            <button
                @click="toggleLinkVisibility(index)"
                :aria-expanded="visibleButtonIndex === index"
                class="sidebar-button"
            >
              <UIcon :name="button.icon" />
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

      <Loader v-if="isLoading" />

      <main class="dashboard-content" v-else>
        <div class="sub-container">
          <div class="content">
            <div class="header">

              <div class="search-container">
                <UInput v-model="q" placeholder="Filter students..." />
              </div>

              <div class="select-container">
                <USelect
                    v-model="selectedFilter"
                    :options="filterOptions"
                    placeholder="Filter students..."
                />
              </div>

            </div>

            <UTable :columns="columns" :rows="paginatedRows">
              <template #extend-data="{ row }">
                <a @click="openPopup(row)" class="extend-btn">View</a>
                <Popup
                    :show="isPopupVisible"
                    @update:show="isPopupVisible = $event"
                    :student="currentStudent"
                />
              </template>
            </UTable>

            <div class="pagination">
              <button :disabled="currentPage === 1" @click="handlePageChange(currentPage - 1)">
                <UIcon name="mdi-arrow-left" />
              </button>
              <span>Page {{ currentPage }} of {{ Math.ceil(totalItems / pageSize) }}</span>
              <button :disabled="currentPage >= Math.ceil(totalItems / pageSize)" @click="handlePageChange(currentPage + 1)">
                <UIcon name="mdi-arrow-right" />
              </button>
            </div>

            <hr class="divider" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  display: block;
  background-color: var(--primary-color);
}

.container {
  display: flex;
  flex-wrap: nowrap;
  padding: 0;
  border-top: 3px solid var(--text-hover-color);
  border-bottom: 3px solid var(--text-hover-color);
  width: 100%;
  margin: 0 auto;
}

.sidebar {
  flex: 2;
  background-color: var(--primary-color);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.dashboard-content {
  flex: 6;
}

@media (max-width: 1200px) {
  .admin-dashboard {
    display: block;
  }

  .sidebar {
    min-height: 30vh;
  }
}

.btn-container {
  padding: .5rem;
  background-color: transparent;
}

.btn-container:hover {
  background-color: var(--primary-hover-color);
}

.sidebar-button {
  font-size: 1rem;
  color: var(--text-light-color);
  margin-bottom: 0.5rem;
  text-align: start;
  border-radius: .5rem;
  transition: 0.3s ease-in-out;
}

.sidebar-button:hover {
  color: var(--text-hover-color);
}

.sidebar ul li {
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

.sidebar li:hover {
  color: var(--text-hover-color);
  background-color: var(--primary-hover-color);
  transition: .3s ease-in-out;
}

.dashboard-content {
  flex: 10;
  background-color: #eeeeee;
}

.dashboard-info-content div {
  margin: 1rem;
}

.select-container{
  padding: 1rem;
}

.dashboard-info-content div {
  margin: 1rem;
}

.dashboard-content .header {
  display: inline-flex;
  flex-wrap: wrap;
  margin: 0.5rem;
  align-items: center;
}

.extend-btn {
  padding: .5rem;
  border-radius: .5rem 0;
  color: var(--text-hover-color);
  background-color: var(--primary-hover-color);
  cursor: pointer;
}

.extend-btn:hover {
  color: var(--text-light-color);
  background-color: var(--primary-color);
  transition: .3s ease-in-out;
}

.header h2,
.footer h2 {
  font-size: 1.5rem;
  color: var(--primary-hover-color);
  text-align: center;
  margin: 1rem auto;
}

.divider {
  border-bottom: 2px solid var(--primary-hover-color);
  margin: 1rem 0;
}

.pagination {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.pagination span {
  padding: .5rem 1rem;
  border-radius: .5rem;
  transition: 0.3s ease-in-out;
}

.pagination button {
  padding: .5rem;
  border-radius: .5rem;
  color: var(--text-light-color);
  background-color: var(--primary-color);
  transition: 0.3s ease-in-out;
}

@media (max-width: 1200px) {
  .container {
    display: block;
  }
}

@media (max-width: 768px) {
  .sidebar {
    flex-basis: 100%;
  }

  .dashboard-content {
    padding: 1rem;
  }
}


</style>
