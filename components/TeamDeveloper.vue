<script setup lang="ts">

const members = [
  {
    name: "Associate Professor Dr. Basheer Riskhan",
    position: "Dean of SCI",
    photo: "images/Associate-Professor-Dr.-Basheer-Riskhan-200x200.jpg",
  },
  {
    name: "Madam Halawati Binti Abd Jalil Safuan",
    position: "Supervisor",
    photo: "images/Halawati Binti Abd Jalil Safuan.jpg",
  },
  {
    name: "Adnan Madi",
    position: "Web Developer",
    photo: "images/Adnan Madi.jpg",
  },
  {
    name: "Oussama Chakeur",
    position: "System Administrator",
    photo: "images/oussama-chakeur.jpeg",
  },
  {
    name: "Mohamed Bashir",
    position: "Data Analyst",
    photo: "./images/mohammed_Bashair.png",
  },
  {
    name: "Abdoulaye Saleh",
    position: "Data Analyst",
    photo: "images/Abdoulaye Saleh.png",
  },
];

</script>

<template>
  <section class="team-section">
    <h2 class="section-title">Our Team</h2>
    <div class="divider"></div>

    <div class="team-grid">
      <div v-for="member in members" :key="member.name" class="team-card">
        <img :src="member.photo" :alt="member.name" class="avatar" />
        <h3 class="name">{{ member.name }}</h3>
        <p class="role">{{ member.position }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-section {
  padding: 40px 20px;
  background-color: #f9f9f9;
  text-align: center;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.divider {
  width: 60px;
  height: 4px;
  background-color: #3b82f6;
  margin: 0 auto 2rem;
  border-radius: 2px;
}

.team-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  max-width: 1200px;
  margin: 0 auto;
}

.team-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin: 1rem auto;
  border: 2px solid #e5e7eb;
}

.name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  margin: 0.25rem 0;
}

.role {
  font-size: 0.9rem;
  color: #6b7280;
}

</style>
