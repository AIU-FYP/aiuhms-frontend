<script setup lang="ts">
import {ref} from "vue";

const policies = [
  {
    label: 'Cooking in Rooms',
    defaultOpen: true,
    content: 'Cooking inside the hostel rooms is strictly prohibited. Students are encouraged to use designated kitchen areas for preparing meals. This policy is enforced to maintain cleanliness, avoid fire hazards, and ensure the safety of all residents.'
  },
  {
    label: 'Quiet Hours',
    defaultOpen: false,
    content: 'Quiet hours must be observed from 10:00 PM to 7:00 AM. During this time, noise levels should be kept to a minimum to allow fellow residents to study and sleep without disturbances.'
  },
  {
    label: 'Room Cleanliness',
    defaultOpen: false,
    content: 'Students are responsible for maintaining cleanliness in their rooms. Regular inspections will be conducted, and failure to maintain a clean environment may result in penalties.'
  },
  {
    label: 'Use of Electrical Appliances',
    defaultOpen: false,
    content: 'Only approved electrical appliances are permitted in the rooms. Unauthorized use of heaters, electric stoves, or other high-power-consuming devices is not allowed.'
  },
  {
    label: 'Visitors',
    defaultOpen: false,
    content: 'Visitors are allowed only during specified hours and must sign in at the front desk. Overnight stays by visitors are not permitted.'
  },
  {
    label: 'Smoking and Alcohol',
    defaultOpen: false,
    content: 'Smoking and alcohol consumption are strictly prohibited within the hostel premises.'
  },
  {
    label: 'Fire Safety',
    defaultOpen: false,
    content: 'Fire safety equipment should not be tampered with. In case of fire, students must follow evacuation procedures immediately. Blocking fire exits is forbidden.'
  },
  {
    label: 'Personal Conduct',
    defaultOpen: false,
    content: 'Students are expected to show respect for other residents and staff. Harassment, theft, vandalism, or any other inappropriate behavior will result in disciplinary action.'
  },
  {
    label: 'Room Alterations',
    defaultOpen: false,
    content: 'Alterations to rooms, including painting, adding shelves, or drilling, are not allowed. Students must maintain the room as it was provided to them.'
  },
  {
    label: 'Reporting Issues',
    defaultOpen: false,
    content: 'Any maintenance or room-related issues should be promptly reported to the hostel management.'
  }
];

const activeIndex = ref<number | null>(null);

const toggleFaq = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<template>
  <div class="faq-section">
    <div class="container">
      <div></div>
      <div class="faq-container">
        <h2>Student Accommodation Guidelines</h2>
        <div
            v-for="(policy, index) in policies"
            :key="index"
            class="policies"
            @click="toggleFaq(index)"
            :aria-expanded="activeIndex === index"
            role="button"
            tabindex="0"
            @keydown.enter="toggleFaq(index)"
            @keydown.space.prevent="toggleFaq(index)"
        >
          <div class="info">
            <h3 class="title">
              <span>
                <UIcon name="i-heroicons-square-3-stack-3d"/>
              </span>
              {{ policy.label }}
            </h3>
            <h3>
              <UIcon
                  v-if="activeIndex === index"
                  name="ep-arrow-up-bold"
              />
              <UIcon
                  v-else
                  name="ep-arrow-down-bold"
              />
            </h3>
          </div>
          <p
              v-show="activeIndex === index"
              class="description"
              :class="{ 'fade-in': activeIndex === index }"
          >
            {{ policy.content }}
          </p>
        </div>

      </div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>

.faq-section {
  padding: 1rem 0;
  margin: 0 10rem;
  align-items: center;
}

.faq-container h2 {
  font-size: 2rem;
  color: var(--primary-hover-color);
  padding: 50px 0;
}

.policies {
  background-color: #f5f5f5;
  margin-bottom: 1.5rem;
  color: var(--primary-hover-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.policies:focus,
.policies:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.title {
  font-size: 1.2rem;
}

.description {
  padding: 0 1rem 1rem;
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
  transition: opacity 0.3s ease, max-height 0.3s ease;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

@media (max-width: 1200px) {
  .faq-section {
    margin: 0;
  }

  .faq-container h2 {
    font-size: 1.2rem;
    text-align: center;
    padding: 40px 0;
  }

  .policies {
    width: 90%;
    margin: 1rem auto;
  }
  .title {
    font-size: 1rem;
  }
  .description {
    font-size: .8rem;
  }
}

.description.fade-in {
  opacity: 1;
  max-height: 300px;
}

</style>
