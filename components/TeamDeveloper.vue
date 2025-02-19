<script setup lang="ts">

const members = [
  {
    name: "Associate Professor Dr. Basheer Riskhan",
    position: "Dean of SCI",
    photo: "images/Associate-Professor-Dr.-Basheer-Riskhan-200x200.jpg",
  },
  {
    name: "Halawati Binti Abd Jalil Safuan",
    position: "supervisor",
    photo: "images/Halawati Binti Abd Jalil Safuan.jpg",
  },
  {
    name: "Mohamed Bashir",
    position: "Data analyst",
    photo: "./images/mohammed_Bashair.png",
  },
  {
    name: "Abdoulaye Saleh",
    position: "Data analyst",
    photo: "images/Abdoulaye Saleh.png",
  },
  {
    name: "Adnan Madi",
    position: "Web developer",
    photo: "images/Adnan Madi.jpg",
  },
];


</script>

<template>
  <div class="team-section">
    <h2 class="team-developer-title">Team Developer </h2>
    <hr class="team-developer-divider"/>
    <div class="team-grid">
      <div v-for="member in members" :key="member.name" class="team-card">
        <div class="team-photo">
          <img :src="member.photo" :alt="member.name"/>
        </div>
        <div class="team-details">
          <div class="box">
            <h2>{{ member.name }}</h2>
          </div>
          <h3>{{ member.position }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-section {
  padding: 40px;

}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  justify-content: center;
  max-width: 1200px;
  margin: 5rem auto;
}

.team-card {
  background: var(--text-hover-color);
  border: 3px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: var(--primary-color);
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.team-photo {
  min-height: 150px;
}

.team-photo img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 15px auto;
}

.team-details .box {
  min-height: 70px;
}

.team-details h2,
.team-details h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
  text-transform: capitalize;
}

.team-developer-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  padding: 0 2rem;
  margin: 1rem 0;
}

.team-developer-divider {
  margin: 2rem auto;
  border: 2px solid var(--primary-color);
  width: 100%;
}

</style>

