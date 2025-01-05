<template>
  <div class="header-sec">
    <div class="main-container">
      <div class="container-box">
        <div class="image-logo">
          <a href="https://aiu.edu.my/">
            <img src="/images/AIU-Official-Logo.png" alt="AIU Logo" />
          </a>
        </div>
        <button v-if="isMobile" @click="toggleLinksVisibility" class="bar-btn">
          <UIcon name="uil-bars" />
        </button>
      </div>

      <div class="title">
        <h2>AIU Hostel Management System</h2>
      </div>

      <nav v-if="isLinksVisible || !isMobile" class="menu">
        <ul class="menu-links">
          <li><router-link to="/home">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/maintenance-room-form">Maintenance Room Form</router-link></li>
          <li><router-link to="/change-room-form">Change Room Form</router-link></li>
          <li><router-link to="/login">Log In</router-link></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLinksVisible = ref(false);
const isMobile = ref(false);

function toggleLinksVisibility() {
  isLinksVisible.value = !isLinksVisible.value;
  console.log('Links visibility toggled:', isLinksVisible.value);
}

onMounted(() => {
  isMobile.value = window.innerWidth <= 1200;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 1200;
  });
});
</script>

<style scoped>
.header-sec {
  background-color: var(--primary-color);
  padding: 0.5rem 1rem;
  max-height: 500px;
}

.main-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}

.image-logo img {
  width: 70px;
  height: 50px;
}

.title h2 {
  font-size: 1.5rem;
  font-weight: normal;
  text-transform: uppercase;
  color: var(--text-light-color);
}

.menu-links {
  display: inline-flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-links li {
  display: inline-block;
  padding: 0.3rem;
  margin-right: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  background-color: transparent;
}

.menu-links li:hover {
  border: 1px solid var(--primary-hover-color);
  background-color: var(--primary-hover-color);
}

.menu-links a {
  color: var(--text-light-color);
  padding: 0 0.5rem;
  font-size: 1rem;
  text-decoration: none;
}

.menu-links a:hover {
  color: var(--text-hover-color);
  transition: 0.3s ease-in-out;
}

@media (max-width: 1200px) {
  .main-container {
    display: block;
  }

  .title h2 {
    display: none;
  }

  .container-box {
    display: flex;
    justify-content: space-between;
  }

  .bar-btn {
    font-size: 2rem;
    margin: 0 1rem;
    color: var(--text-hover-color);
  }

  .menu-links {
    display: block;
    margin: 1rem 0;
  }

  .menu-links li {
    display: block;
    margin-left: 0.5rem;
  }
}
</style>
