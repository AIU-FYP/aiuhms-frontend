<script setup lang="ts">
import {ref} from 'vue';

const members = ref([
  {
    name: "Nidhoil Mohamed Ibrahim",
    position: "DIRECTOR OF STUDENT AFFAIRS",
    photoURL: "./images/Nidhoil-200x200.jpg",
    alt: "Nidhoil Mohamed Ibrahim"
  },
  {
    name: "Nurul Huda Bt Hassan Bakri",
    position: "Deputy Director of Student Affairs",
    photoURL: "./images/Nurul-Huda-Hassan-01-200x200.jpg",
    alt: "Nurul Huda Bt Hassan Bakri"
  },
  {
    name: "Fazlia Binti Azhari",
    position: "Counsellor",
    photoURL: "./images/fazlia-200x200.jpg",
    alt: "Fazlia Binti Azhari"
  },
  {
    name: "Mohammad Hafis Shafiq Bin Mohammad Sopian",
    position: "Counsellor",
    photoURL: "./images/hafis-shafiq-200x200.png",
    alt: "Mohammad Hafis Shafiq Bin Mohammad Sopian"
  },
  {
    name: "Ahmad Muaz Azizan",
    position: "Executive cum Warden",
    photoURL: "./images/Muaz-240x300-1-200x200.png",
    alt: "Ahmad Muaz Azizan"
  },
  {
    name: "Nurul Elina Afiqah Binti Badrulhisham",
    position: "Executive cum Warden",
    photoURL: "./images/Elina-200x200.jpg",
    alt: "Nurul Elina Afiqah Binti Badrulhisham"
  },
  {
    name: "Hazween Eyzwann Bin Sharif",
    position: "Executive cum Warden",
    photoURL: "./images/Hazween-200x200.jpg",
    alt: "Hazween Eyzwann Bin Sharif"
  },
  {
    name: "Nurul Izzati Binti Ramli",
    position: "Executive cum Warden",
    photoURL: "./images/izzati-200x200.jpg",
    alt: "Nurul Izzati Binti Ramli"
  },
  {
    name: "Ainun Nadiah Binti Samsudin",
    position: "Executive (Career & Alumni)",
    photoURL: "./images/ainun-200x200.jpg",
    alt: "Ainun Nadiah Binti Samsudin"
  },
  {
    name: "Muhammad Zhafran Bin Jasmi",
    position: "Sport Officer",
    photoURL: "./images/zhafran.jasmi@aiu.edu_.my_-200x200.jpg",
    alt: "Muhammad Zhafran Bin Jasmi"
  },
  {
    name: "Mohamad Nor Hisyam Bin Musa",
    position: "Warden",
    photoURL: "./images/Hisyam-Musa-1-200x200.jpg",
    alt: "Mohamad Nor Hisyam Bin Musa"
  },
  {
    name: "Farah Nadiah Binti Abdul Kudus",
    position: "Warden",
    photoURL: ".images/Fatin-Nadiah.jpg",
    alt: "Farah Nadiah Binti Abdul Kudus"
  },
  {
    name: "Nadia Affiqa Abdul Nasir",
    position: "Warden",
    photoURL: "./images/nadia-200x200.jpg",
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
  <div class="staff-section">
    <div class="staff-container">
      <h2 class="staff-title">Members of Staff</h2>
      <hr class="staff-divider">
      <div class="staff-content">
        <div class="carousel-control">
          <span class="carousel-box">
            <button @click="goToPrevious" class="carousel-button">
              <UIcon name="mdi-arrow-left" size="24"/>
            </button>
          </span>
        </div>
        <div class="carousel-main">
          <div class="carousel">
            <div
                v-for="(member, index) in members.slice(currentIndex, currentIndex + 3)"
                :key="index"
                class="staff-member"
            >
              <img :src="member.photoURL" :alt="member.alt" class="staff-photo">
              <div class="staff-info">
                <h3 class="staff-name">
                  {{
                    member.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")
                  }}
                </h3>
                <h3 class="staff-position">
                  {{
                    member.position.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")
                  }}

                </h3>
              </div>
            </div>
          </div>
        </div>

        <div class="carousel-control">
          <span class="carousel-box">
            <button @click="goToNext" class="carousel-button">
              <UIcon name="mdi-arrow-right" size="24"/>
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.staff-container {
  padding: 5rem;
}

.staff-content {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  background-color: var(--text-hover-color);
  border-radius: 3rem;
  margin: 5rem 0;
  padding: 1rem 0;
}

.carousel-main {
  flex: 85%;
}

.carousel-control {
  flex: 5%;
  width: 100%;
  height: 100%;
  margin: auto;
  background: white;
  padding: 5px;
  border-radius: 0 50%;
}

@media (max-width: 1200px) {
  .carousel-control {
    flex: 5%;
    width: 100%;
    height: 100%;
    margin: auto;
    background: white;
    padding: 5px;
    border-radius: 0;
    align-items: center;
    text-align: center;
  }
}


.carousel-box {
  margin: 10px;;
  background-color: transparent;
  outline: none;
  border: none;
}

.staff-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  padding: 0 2rem;

}

.staff-divider {
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

.staff-member {
  display: block;
  text-align: center;
  flex: 1;
  margin-bottom: 1rem;
  min-height: 200px;
}

.staff-photo {
  margin: 10px auto;
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.staff-info {
  min-height: 100px;
}

.staff-info h3 {
  height: 60px;
}

.staff-name {
  font-size: 1rem;
  padding: .5rem 0;
  color: var(--primary-color);
  max-width: 200px;
  margin: auto;
  font-weight: bold;
}

.staff-position {
  font-size: .8rem;
  color: var(--primary-hover-color);
  width: 200px;
  margin: auto;
  border-radius: 5px;
}

.carousel-button {
  background-color: var(--text-light-color);
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.carousel-button:hover {
  background-color: var(--text-hover-color);
  transition: ease-in-out .3s;
}

@media (max-width: 800px) {
  .staff-container {
    padding: 0 1rem;
  }

  .carousel-button {
    padding: 0.5rem 1rem;
  }
}
</style>
