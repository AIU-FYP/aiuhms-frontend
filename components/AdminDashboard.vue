<script setup>
import MainAdminsDashboard from "~/components/MainAdminsDashboard.vue";
</script>


<template>
  <div class="settings-page">
    <div class="container">

      <aside class="sidebar">
        <SettingSidebar/>
      </aside>

      <main class="content">
        <h2>Admin Dashboard</h2>
        <MainAdminsDashboard/>
      </main>

    </div>
  </div>
</template>

<style scoped>
.settings-page {
  display: flex;
  padding: 20px;
}

.container {
  display: flex;
  gap: 20px;
  width: 100%;
  margin: 0 auto;
}

.sidebar {
  flex: 1;
  background-color: var(--primary-color);
  padding: 20px;
  color: var(--text-light-color);
  border-radius: 10px;
  min-height: 81vh;
}

.content {
  flex: 3;
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
}

.content h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--primary-hover-color);
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .sidebar {
    margin-bottom: 20px;
  }
}
</style>
