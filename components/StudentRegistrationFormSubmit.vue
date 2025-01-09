<script setup lang="ts">

import {ref} from 'vue'

interface Person {
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
ref<Person[]>([]);

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
      {text: "Add new Building", url: "/new-hostel-form"},
      {text: "Manage Rooms", url: "/room-dashboard"},
    ],
  },
];

function toggleLinkVisibility(index: number) {
  visibleButtonIndex.value = visibleButtonIndex.value === index ? null : index;
}

</script>

<template>
  <div class="dashboard-layout">
    <div class="dashboard-container">
      <aside class="navigation-sidebar">
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
              <a :href="link.url" class="navigation-link">{{ link.text }}</a>
            </li>
          </ul>
        </div>
      </aside>

      <main class="content-section">
        <StudentRegistrationForm/>
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: block;
  background-color: var(--primary-color);
}

.dashboard-container {
  display: flex;
  flex-wrap: nowrap;
  padding: 0;
  border: 3px solid var(--primary-color);
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
  padding: 2rem;
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
  .navigation-sidebar {
    flex-basis: 100%;
  }

  .content-section {
    padding: 1rem;
  }
}
</style>

