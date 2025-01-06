<script setup lang="ts">
import {ref} from 'vue';

const members = ref([
  {
    name: "Nidhoil Mohamed Ibrahim",
    position: "DIRECTOR OF STUDENT AFFAIRS",
    photoURL: "/images/Nidhoil-200x200.jpg",
    alt: "Nidhoil Mohamed Ibrahim"
  },
  {
    name: "Nurul Huda Bt Hassan Bakri",
    position: "Deputy Director of Student Affairs",
    photoURL: "/images/Nurul-Huda-Hassan-01-200x200.jpg",
    alt: "Nurul Huda Bt Hassan Bakri"
  },
  {
    name: "Fazlia Binti Azhari",
    position: "Counsellor",
    photoURL: "/images/fazlia-200x200.jpg",
    alt: "Fazlia Binti Azhari"
  },
  {
    name: "Mohammad Hafis Shafiq Bin Mohammad Sopian",
    position: "Counsellor",
    photoURL: "/images/hafis-shafiq-200x200.png",
    alt: "Mohammad Hafis Shafiq Bin Mohammad Sopian"
  },
  {
    name: "Ahmad Muaz Azizan",
    position: "Executive cum Warden",
    photoURL: "/images/Muaz-240x300-1-200x200.png",
    alt: "Ahmad Muaz Azizan"
  },
  {
    name: "Nurul Elina Afiqah Binti Badrulhisham",
    position: "Executive cum Warden",
    photoURL: "/images/Elina-200x200.jpg",
    alt: "Nurul Elina Afiqah Binti Badrulhisham"
  },
  {
    name: "Hazween Eyzwann Bin Sharif",
    position: "Executive cum Warden",
    photoURL: "/images/Hazween-200x200.jpg",
    alt: "Hazween Eyzwann Bin Sharif"
  },
  {
    name: "Nurul Izzati Binti Ramli",
    position: "Executive cum Warden",
    photoURL: "/images/izzati-200x200.jpg",
    alt: "Nurul Izzati Binti Ramli"
  },
  {
    name: "Ainun Nadiah Binti Samsudin",
    position: "Executive (Career & Alumni)",
    photoURL: "/images/ainun-200x200.jpg",
    alt: "Ainun Nadiah Binti Samsudin"
  },
  {
    name: "Muhammad Zhafran Bin Jasmi",
    position: "Sport Officer",
    photoURL: "/images/zhafran.jasmi@aiu.edu_.my_-200x200.jpg",
    alt: "Muhammad Zhafran Bin Jasmi"
  },
  {
    name: "Mohamad Nor Hisyam Bin Musa",
    position: "Warden",
    photoURL: "/images/Hisyam-Musa-1-200x200.jpg",
    alt: "Mohamad Nor Hisyam Bin Musa"
  },
  {
    name: "Farah Nadiah Binti Abdul Kudus",
    position: "Warden",
    photoURL: "/images/Fatin-Nadiah.jpg",
    alt: "Farah Nadiah Binti Abdul Kudus"
  },
  {
    name: "Nadia Affiqa Abdul Nasir",
    position: "Warden",
    photoURL: "/images/nadia-200x200.jpg",
    alt: "Nadia Affiqa Abdul Nasir"
  }
]);

const currentIndex = ref(0);

const goToNext = () => {
  currentIndex.value = (currentIndex.value + 3) % members.value.length;
};

const goToPrevious = () => {
  currentIndex.value = (currentIndex.value - 3 + members.value.length) % members.value.length;
};
</script>

<template>
  <div class="team">
    <div class="team-container">
      <h2>Members of Staff</h2>
      <hr class="divider">
      <div class="carousel">
        <div v-for="(member, index) in members.slice(currentIndex, currentIndex + 3)" :key="index" class="team-member">
          <img :src="member.photoURL" :alt="member.alt">
          <div class="info">
            <h3>{{ member.name }}</h3>
            <h5>{{ member.position }}</h5>
          </div>
        </div>
      </div>
      <div class="carousel-controls">
        <button @click="goToPrevious" class="carousel-btn">
          <UIcon name="chevron-left" size="24"/>
        </button>
        <button @click="goToNext" class="carousel-btn">
          <UIcon name="chevron-right" size="24"/>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-container {
  padding: 5rem;
}

@media (max-width: 800px) {
  .team-container {
    padding: 0 1rem;
  }
}

.team h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  padding: 0 2rem;
}

.divider {
  margin: 1rem auto;
  border: 2px solid var(--primary-color);
  width: 100%;
}

.carousel {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  min-height: 300px;
}

@media (max-width: 1200px) {
  .carousel {
    flex-direction: column;
  }
}

.team-member {
  text-align: center;
  flex: 1;
  margin-bottom: 1rem;
}

.team-member img {
  margin: 10px auto;
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.team-member h3 {
  font-size: 1rem;
  padding: .5rem 0;
  color: var(--primary-color);
  max-width: 200px;
  margin: auto;
  font-weight: bold;
}

.team-member h5 {
  font-size: .8rem;
  color: var(--primary-color);
  max-width: 200px;
  margin: auto;
}

.carousel-controls {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
}

@media (max-width: 1200px) {
  .carousel-controls {
    width: 90%;
    margin: 20px auto;
  }
}

.carousel-btn {
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.carousel-btn:hover {
  background-color: var(--primary-hover-color);
}

@media (max-width: 800px) {
  .team-container {
    padding: 0;
  }

  .carousel-btn {
    padding: 0.5rem 1rem;
  }
}
</style>
