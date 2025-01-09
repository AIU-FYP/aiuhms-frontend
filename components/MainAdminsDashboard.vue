<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Popup from "~/components/AdminInfoPopup.vue";
import { useNuxtApp } from "#app";

let { $axios } = useNuxtApp();

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
  { key: "id", label: "ID" },
  { key: "username", label: "Username" },
  { key: "name", label: "Name" },
  { key: "position", label: "Position" },
  { key: "staff_ID", label: "Staff ID" },
  { key: "phone", label: "Phone" },
  { key: "staff_type", label: "Staff Type" },
  { key: "extend", label: "View", sortable: false },
];

const admins = ref<User[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);
const q = ref("");
const api = $axios;
const isLoading = ref(true);

const fetchData = async () => {
  isLoading.value = true;
  try {
    const response = await api.get("/users/");
    admins.value = response.data.map((person: any) => ({
      id: person.id || 0,
      username: person.username || "",
      password: person.password || "",
      name: person.profile?.name || "",
      position: person.profile?.position || "",
      staff_ID: person.profile?.staff_ID || "",
      phone: person.profile?.phone || "",
      email: person.profile?.email || "",
      staff_type: person.profile?.staff_type || null,
    }));
    totalItems.value = response.data.length;
    console.log("Fetched admins:", admins.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
};

const isPopupVisible = ref(false);
const currentAdmin = ref<User | null>(null);

onMounted(fetchData);

definePageMeta({
  middleware: "auth",
});

const openPopup = (admin: User) => {
  currentAdmin.value = admin;
  isPopupVisible.value = true;
};

const filteredRows = computed(() => {
  if (!q.value) {
    return admins.value;
  }
  return admins.value.filter((admin) =>
      Object.values(admin).some((value) =>
          String(value).toLowerCase().includes(q.value.toLowerCase())
      )
  );
});

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredRows.value.slice(start, end);
});

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};
</script>

<template>
  <div class="admin-dashboard">
    <div class="dashboard-wrapper">
      <main class="content-area">
        <div class="header-section">
          <div class="search-box">
            <UInput v-model="q" placeholder="Filter admins..." />
          </div>
        </div>
        <UTable :columns="columns" :rows="paginatedRows">
          <template #extend-data="{ row }">
            <a @click="openPopup(row)" class="view-button">View</a>
            <Popup
                :show="isPopupVisible"
                @update:show="isPopupVisible = $event"
                :admins="currentAdmin"
            />
          </template>
        </UTable>
        <div class="pagination-controls">
          <button
              :disabled="currentPage === 1"
              @click="handlePageChange(currentPage - 1)"
          >
            <UIcon name="mdi-arrow-left" />
          </button>
          <span>
            Page {{ currentPage }} of {{ Math.ceil(totalItems / pageSize) }}
          </span>
          <button
              :disabled="currentPage >= Math.ceil(totalItems / pageSize)"
              @click="handlePageChange(currentPage + 1)"
          >
            <UIcon name="mdi-arrow-right" />
          </button>
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

.dashboard-wrapper {
  display: flex;
  flex-direction: column;
  padding: 0;
  border-top: 3px solid var(--text-hover-color);
  border-bottom: 3px solid var(--text-hover-color);
  margin: 0 auto;
  width: 100%;
}

.content-area {
  background-color: #eeeeee;
  padding: 1rem;
  flex: 1;
}

.header-section {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-box {
  width: 100%;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.pagination-controls button {
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: var(--text-light-color);
  background-color: var(--primary-color);
  transition: 0.3s ease-in-out;
}

.pagination-controls span {
  margin: 0 1rem;
}

.view-button {
  color: var(--primary-color);
  background-color: var(--primary-hover-color);
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.view-button:hover {
  background-color: var(--primary-color);
  color: var(--text-hover-color);
}
</style>
