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
const pageSize = ref(7);
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
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false
  }
}

const isPopupVisible = ref(false);
const currentHostel = ref({});

onMounted(fetchData)

const isLoading = ref(false);

definePageMeta({
  middleware: 'auth',
});

const openPopup = (row: Hostel) => {
  currentHostel.value = row;
  isPopupVisible.value = true;
};

const filteredRows = computed(() => {
  let result = hostels.value;

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
  console.log("Paginated Rows:", filteredRows.value.slice(start, end));
  return filteredRows.value.slice(start, end);
});

const handlePageChange = (newPage: number) => {
  if (newPage > 0 && newPage <= Math.ceil(totalItems.value / pageSize.value)) {
    currentPage.value = newPage;
  }
};


onMounted(fetchData)

</script>

<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-container">

      <aside class="navigation-sidebar">
        <AdminSidebar/>
      </aside>

      <main class="content-section" >

        <Loader  v-if="isLoading"/>

        <div class="content-wrapper" v-else>

          <div class="content-body">

            <div class="header-section">
              <div class="search-bar" >
                <input v-model="q" placeholder="Filter hostels..." class="filter-box"/>
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
          </div>
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
  padding: 0 50px ;
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

.header-section {
  display: inline-flex;
  flex-wrap: wrap;
  margin: 0.5rem;
  align-items: center;
}

.search-bar {
  padding: 1rem;
}

.filter-box {
  padding: 2px;
  border-radius: 5px;
  outline: none;
  border: 2px solid #EEEEEE;
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

