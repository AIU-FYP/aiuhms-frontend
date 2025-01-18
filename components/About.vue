<script setup lang="ts">
const information = [
  {
    title: "Vision",
    description:
        "Cultivating transformative experiences that challenge students to be their best at AIU and beyond. AIU Student Affairs facilitates holistic student success through purposeful advocacy, education, engagement, and support."
  },
  {
    title: "Mission",
    description:
        "With students at the heart of all that AIU does, the Student Affairs Department creates innovative learning opportunities, programmes, and services that prepare students to lead, serve, and become engaged members of a global society."
  }
];

const images = [
  {
    url: "./images/WB-5core-values.jpg",
    alt: "WB-5core-values"
  },
  {
    url: "./images/WB-8hrs-rules.jpg",
    alt: "WB-8hrs-rules"
  }
];
</script>

<template>
  <div class="aiu-about-section">
    <div class="aiu-about-container">
      <h1 class="aiu-about-title">About Albukhary International University</h1>
      <hr class="aiu-divider" />

      <div class="aiu-information">
        <div v-for="info in information" :key="info.title" class="aiu-info-card">
          <h3 class="aiu-info-title">{{ info.title }}</h3>
          <p class="aiu-info-description">{{ info.description }}</p>
        </div>
      </div>

      <div class="aiu-images">
        <div v-for="image in images" :key="image.url" class="aiu-image-wrapper">
          <img :src="image.url" :alt="image.alt" class="aiu-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aiu-about-section {
  padding: 5em;
  margin: 1em auto;
}

.aiu-about-title {
  font-size: 2.5rem;
  margin-left: 20px;
  color: var(--primary-hover-color);
}

@media (max-width: 800px) {
  .aiu-about-section {
    padding: 2rem 1rem;
  }

  .aiu-about-title {
    font-size: 1.2rem;
  }
}

.aiu-divider {
  margin: 1rem auto;
  border: 2px solid var(--primary-color);
  width: 100%;
}

.aiu-information {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.aiu-info-card {
  margin: 1rem auto;
  padding: 20px;
  border-radius: 8px;
  flex: 1 1 45%;
  box-sizing: border-box;
  background-color: var(--text-hover-color);
}

.aiu-info-title {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.aiu-info-description {
  font-size: 1rem;
  color: var(--primary-hover-color);
  text-align: justify;
}

@media (max-width: 800px) {
  .aiu-information {
    flex-direction: column;
  }

  .aiu-info-card {
    width: 100%;
    margin-bottom: 0;
  }
}

.aiu-images {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.aiu-image-wrapper {
  padding: 0.5rem;
}

.aiu-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>

