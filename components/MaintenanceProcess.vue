<script setup lang="ts">
import {ref} from "vue";

const items = [
  {
    label: "Fill Out the Complaint Form",
    defaultOpen: false,
    content:
        "Students must complete the designated complaint form to report the issue.",
  },
  {
    label: "Submit the Complaint",
    defaultOpen: false,
    content:
        "The Student Affairs (SA) will submit the complaint regarding the room issue.",
  },
  {
    label: "Assessment and Resolution",
    defaultOpen: false,
    content: "Once you submit the form, the Student Affairs (SA) and PPK will receive real-time notifications about your report.",
  },
  {
    label: "Confirmation of Resolution",
    defaultOpen: false,
    content: "An email will be sent to confirm that the problem has been resolved.",
  },
];

const activeIndex = ref<number | null>(null);

const toggleFaq = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<template>
  <div class="process-maintenance-room">
    <div class="container">
      <div class="process-maintenance-room-section">
        <h2>How do students complain about room issues?</h2>
        <div
            v-for="(item, index) in items"
            :key="index"
            class="process-item"
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
              {{ item.label }}
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
            {{ item.content }}
          </p>
        </div>
        <router-link to="/maintenance-room-form" class="link-btn">
          Maintenance Room Form
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.process-maintenance-room {
  padding: 1rem 0;
  margin: 0 auto;
  max-width: 800px;
}

.process-maintenance-room h2 {
  text-align: center;
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
}

.process-item {
  background-color: #f5f5f5;
  color: var(--primary-hover-color);
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

@media (max-width: 1200px) {
  .process-item{
    width: 90%;
    margin: 1.5rem auto;
  }
}

.process-item:focus,
.process-item:hover {
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

.description.fade-in {
  opacity: 1;
  max-height: 300px;
}

.link-btn {
  display: inline-block;
  margin-top: 2rem;
  text-align: center;
  background-color: #f5f5f5;
  color: var(--primary-hover-color);
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.link-btn:hover {
  background-color: var(--primary-color);
  color: var(--text-light-color);
  transition:  0.3s ease-in-out;
}

@media (max-width: 820px) {
  .process-maintenance-room h2 {
    font-size: 1.5rem;
  }

  .description {
    font-size: 0.9rem;
  }

  .link-btn {
    font-size: 0.9rem;
    padding: 0.7rem 1.2rem;
    margin: 1rem;
  }
}
</style>
