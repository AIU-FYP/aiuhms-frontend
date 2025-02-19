<script setup>
</script>


<template>
  <section class="landing-section">
    <div class="content-container">
      <div class="text-content">
        <h2 class="fade-in">Welcome Students</h2>
        <h1 class="slide-up">Albukhary International University</h1>
        <h3 class="slide-up">
          Developed by School of Computing and Informatics
        </h3>
      </div>
      <div class="image-wrapper">
        <img src="../public/images/hostel.png" alt="AIU Campus" class="image-fade"/>
      </div>
    </div>

  </section>
</template>

<style scoped>

.landing-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: var(--text-hover-color);
  overflow: hidden;
  background: linear-gradient(135deg, #133E87FF, #4B8AE6, #82B4F9);
}

.content-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 90vh;
  padding: 2rem;
  border-radius: 1.5rem;
  background: linear-gradient(120deg, #82B4F9, #4B8AE6, #133E87FF);
}

.text-content {
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.text-content h2, .text-content h1, h3 {
  margin: 1rem 0;
  opacity: 0;
}

h2 {
  font-size: 3rem;
  animation: fadeIn 1s ease forwards;
}

h1 {
  font-size: 3rem;
  color: var(--primary-color);
  animation: slideUp 1.2s ease forwards;
}

h3 {
  font-size: 1.5rem;
  color: var(--text-light-color);
  background-color: hsla(180, 3%, 7%, 0.5);
  padding: 1.5rem 2rem;
  animation: fadeIn 1s ease forwards;
  border-radius: 30px 20px 35px 70px;
  display: inline-block;
}

.image-wrapper {
  flex: 1 1 35%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-wrapper img {
  width: 80%;
  height: auto;
  border-radius: 1rem;
  opacity: 0;
  animation: fadeIn 1.5s ease forwards;
}

@media (max-width: 1200px) {
  .content-container {
    width: 100%;
    height: 100vh;
    flex-direction: column;
  }

  .landing-section h2 {
    font-size: 1.5rem;
  }

  h1,
  h3 {
    font-size: 1.5rem;
  }

  .content-container {
    padding: 2rem;
    border-radius: 0;
  }
}

@media (max-width: 800px) {
  .content-container {
    padding: 1rem;
    text-align: center;
  }

  h2, h1 {
    font-size: 1.5rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
