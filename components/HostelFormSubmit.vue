<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isLoading = ref(false);
const visibleButtonIndex = ref<number | null>(null);

const router = useRouter();

async function navigateToPage(url: string) {
  isLoading.value = true;
  try {
    setTimeout(async () => {
      await router.push(url);
    }, 2000);
  } catch (error) {
    console.error('Navigation error:', error);
  } finally {
    isLoading.value = false;
  }
}

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

      <main class="dashboard-content">
        <HostelForm/>
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
  flex-direction: row;
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
  padding: 0;
}

@media (max-width: 1200px) {
  .admin-dashboard {
    display: block;
  }

  .container {
    flex-direction: column;
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
  padding: 0;
  background-color: white;
}

.dashboard-content .hostel-form input,
.dashboard-content .hostel-form select {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #EEEEEE;
  border-radius: 5px;
  outline: none;
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
