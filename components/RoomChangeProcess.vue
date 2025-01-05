<script setup lang="ts">
const items = [
  {
    label: 'Fill Out the Room Change Request Form',
    defaultOpen: false,
    content: 'Students must complete the designated form to request a room change, providing necessary details and supporting documentation.'
  },
  {
    label: 'Submit Supporting Documents',
    defaultOpen: false,
    content: 'For medical reasons, attach an official medical report. For issues with roommates, submit proof via email to the relevant office.'
  },
  {
    label: 'Processing of Request',
    defaultOpen: false,
    content: 'The Student Affairs (SA) team will review the submitted form and documents. Processing typically takes 7-14 working days.'
  },
  {
    label: 'Assessment and Decision by Director of Student Affairs',
    defaultOpen: false,
    content: 'The Director of Student Affairs will evaluate the necessity of the room change and check room availability. The decision is final upon approval.'
  },
  {
    label: 'Confirmation of Room Availability and Approval',
    defaultOpen: false,
    content: 'Confirmation will be sent via email once the request is approved, outlining the next steps for the room change.'
  },
  {
    label: 'Compliance with Hostel Policies',
    defaultOpen: false,
    content: 'Students acknowledge that room change approval is contingent on room availability and compliance with hostel policies.'
  }
];

const activeIndex = ref<number | null>(null)

const toggleFaq = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<template>
  <div class="room-change-request">
    <div class="container">
      <div></div>
      <div class="room-change-request-section">
        <h2>How do students request to change room?</h2>
        <div
            class="room-change-request-item"
            v-for="(item, index) in items"
            :key="index"
            @click="toggleFaq(index)"
            :aria-expanded="activeIndex === index"
            role="button"
            tabindex="0"
            @keydown.enter="toggleFaq(index)"
            @keydown.space.prevent="toggleFaq(index)"
        >
          <div class="room-change-request-info">
            <h3 class="room-change-request-title">
              <span>
                <UIcon
                    name="lucide-university"
                />
              </span>
              {{ item.label }}
            </h3>
            <h3>
              <UIcon v-if="activeIndex === index" name="ep-arrow-up-bold" />
              <UIcon v-else name="ep-arrow-down-bold" />
            </h3>
          </div>
          <p class="room-change-request-description" v-show="activeIndex === index" :class="{ 'fade-in': activeIndex === index }">{{ item.content }}</p>
        </div>
        <router-link to="/change-room-form" class="room-change-request-link-btn">
          Request To Change Room Form
        </router-link>
      </div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
.room-change-request {
  padding: 1rem 0;
  margin: 0 auto;
  max-width: 800px;
}

.room-change-request h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: normal;
  color: var(--primary-color);
  padding: 2rem;
  margin: 2rem 0;
}

.room-change-request-item {
  background-color: #f5f5f5;
  color: var(--primary-hover-color);
  margin-bottom: 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.room-change-request-item:focus,
.room-change-request-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.room-change-request-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: .5rem 1rem;
}

.room-change-request-title {
  font-size: 1.5rem;
}

.room-change-request-description {
  padding: .5rem 1rem;
  font-size: 1rem;
  font-weight: normal;
  color: var(--primary-hover-color);
  text-align: justify;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: opacity 0.3s ease, max-height 0.3s ease;
}

.room-change-request-description.fade-in {
  opacity: 1;
  max-height: 300px;
}

.room-change-request-link-btn {
  display: inline-block;
  font-size: 1.2rem;
  color: var(--primary-color);
  margin: 1rem 0;
  text-align: center;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  background-color: #f5f5f5;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.room-change-request-link-btn:hover {
  background-color: var(--primary-color);
  color: var(--text-light-color);
}

@media (max-width: 820px) {
  .room-change-request h2 {
    font-size: 1.5rem;
  }

  .room-change-request {
    padding: 1em;
    margin: 0 1rem;
  }

  .room-change-request-description {
    font-size: 0.9rem;
  }

  .room-change-request-link-btn {
    font-size: 1rem;
    padding: 0.7rem 1.2rem;
  }
}
</style>
