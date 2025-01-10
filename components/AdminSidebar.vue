<script setup lang="ts">
import {ref} from 'vue';

definePageMeta({
  middleware: 'auth',
});

const isLoading = ref(false);

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
      {text: "Add new Hostel", url: "/new-hostel-form"},
      {text: "Manage Rooms", url: "/room-dashboard"},
    ],
  },
];

function toggleLinkVisibility(index: number) {
  visibleButtonIndex.value = visibleButtonIndex.value === index ? null : index;
}

</script>

<template>
  <div class="sidebar-section">
    <aside class="navigation-panel">
      <div v-for="(button, index) in navigationButtons" :key="index">
        <div class="navigation-button-wrapper">
          <button
              @click="toggleLinkVisibility(index)"
              :aria-expanded="visibleButtonIndex === index"
              class="navigation-button"
          >
            <UIcon
                :name="button.icon"
            />
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
  </div>
</template>

<style scoped>
.sidebar-section {
  display: block;
}

.navigation-panel {
  flex: 2;
  background-color: var(--primary-color);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

@media (max-width: 1200px) {
  .sidebar-section {
    display: block;
  }

  .navigation-panel {
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


@media (max-width: 768px) {
  .navigation-panel {
    flex-basis: 100%;
  }
}
</style>

