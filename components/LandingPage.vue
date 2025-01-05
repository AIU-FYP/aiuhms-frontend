<template>
  <section class="landing">
    <div class="main-container">
      <div class="box-info">
        <h2 class="fade-in">Welcome Students</h2>
        <h1 class="slide-up">Albukhary International University</h1>
        <div class="students-btn">
          <button class="btn-animate">Maintenance Room Form</button>
          <button class="btn-animate">Change Room Form</button>
        </div>
      </div>
      <div class="image-container">
        <img src="/images/aiu%20random%201.jpg" alt="AIU Campus" class="image-fade" />
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.landing {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: var(--text-hover-color);
  overflow: hidden;
  background: linear-gradient(135deg, #133E87FF, #4B8AE6, #82B4F9);
}

.main-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 90vh;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  background: linear-gradient(120deg, #82B4F9, #4B8AE6, #133E87FF);
}

@media (max-width: 1200px) {
  .main-container {
    width: 100%;
    height: 100%;
    flex-direction: column;
  }

  .students-btn {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 800px) {
  .main-container {
    padding: 1rem;
    text-align: center;
  }

  h2, h1 {
    font-size: 1.5rem;
  }
}

.box-info {
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.box-info h2, .box-info h1 {
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

.students-btn {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-animate {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 1rem;
  background-color: var(--primary-hover-color);
  color: var(--text-light-color);
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.btn-animate:hover {
  transform: scale(1.1);
  background-color: var(--primary-color);
}

.image-container {
  flex: 1 1 35%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container img {
  width: 80%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(149, 157, 165, 0.2);
  opacity: 0;
  animation: fadeIn 1.5s ease forwards;
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
