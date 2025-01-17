<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import Popup from '~/components/AdminInfoPopup.vue'
import {useNuxtApp} from "#app";

let {$axios} = useNuxtApp()
const api = $axios()

interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  position: string;
  staff_ID: string;
  phone: string;
  email: string;
  staff_type: string | null;
}

const columns = [
  {key: 'id', label: 'ID'},
  {key: 'username', label: 'Username'},
  {key: 'name', label: 'Name'},
  {key: 'position', label: 'Position', sortable: true},
  {key: 'staff_ID', label: 'ID'},
  {key: 'staff_type', label: 'Type', sortable: true},
  {key: 'extend', label: 'View',},
];

const admins = ref<User[]>([]);
const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(0);
const q = ref('');

const fetchData = async () => {
  try {
    const response = await api.get("/users/");
    admins.value = response.data.map((admin: any, index: number) => ({
      id: admin.id,
      username: admin.username || '',
      password: admin.password || '',
      name: admin.profile?.name || '',
      position: admin.profile?.position || '',
      staff_ID: admin.profile?.staff_ID || '',
      phone: admin.profile?.phone || '',
      email: admin.profile?.email || '',
      staff_type: admin.profile?.staff_type || null,
    }));
    totalItems.value = response.data.length;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const isPopupVisible = ref(false);
const currentStudent = ref({});

onMounted(fetchData)

definePageMeta({
  middleware: 'auth',
});

const openPopup = (row: User) => {
  currentStudent.value = row;
  isPopupVisible.value = true;
};

const filteredRows = computed(() => {
  if (!q.value) {
    return admins.value;
  }

  return admins.value.filter((admin) => {
    return Object.values(admin).some((value) => {
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

definePageMeta({
  middleware: 'auth',
});

</script>

<template>
  <div class="dashboard-wrapper">
    <main class="content-wrapper">

      <div class="content-body">

        <div class="content-header">
          <div class="search-box">
            <UInput v-model="q" placeholder="Filter admins..."/>
          </div>
        </div>

        <UTable :columns="columns" :rows="paginatedRows">
          <template #extend-data="{ row }">
            <a @click="openPopup(row)" class="view-button">View</a>
            <Popup
                :show="isPopupVisible"
                @update:show="isPopupVisible = $event"
                :admins="currentStudent"
            />
          </template>
        </UTable>

        <div class="pagination-controls">
          <button
              :disabled="currentPage === 1"
              @click="handlePageChange(currentPage - 1)"
          >
            <UIcon name="mdi-arrow-left"/>
          </button>
          <span>Page {{ currentPage }} of {{ Math.ceil(totalItems / pageSize) }}</span>
          <button
              :disabled="currentPage >= Math.ceil(totalItems / pageSize)"
              @click="handlePageChange(currentPage + 1)"
          >
            <UIcon name="mdi-arrow-right"/>
          </button>
        </div>
      </div>

    </main>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  display: block;
}

.content-wrapper {
  flex: 6;
}

.content-body {
  margin: 1rem;
}

.content-header {
  display: inline-flex;
  flex-wrap: wrap;
  margin: 0.5rem;
  align-items: center;
}

.search-box {
  margin-bottom: 1rem;
}

.view-button {
  padding: 0.5rem;
  border-radius: 0.5rem 0;
  color: var(--text-hover-color);
  background-color: var(--primary-hover-color);
  cursor: pointer;
}

.view-button:hover {
  color: var(--text-light-color);
  background-color: var(--primary-color);
  transition: 0.3s ease-in-out;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.pagination-controls span {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: 0.3s ease-in-out;
}

.pagination-controls button {
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: var(--text-light-color);
  background-color: var(--primary-color);
  transition: 0.3s ease-in-out;
}


@media (max-width: 768px) {
  .content-wrapper {
    padding: 1rem;
  }
}
</style>

