<script setup lang="ts">

</script>

<template>
  <div class="dashboard-layout">
    <div class="dashboard-container">

      <aside class="navigation-sidebar">
        <AdminSidebar/>
      </aside>

      <main class="content-section">
        <StudentRegistrationForm/>
      </main>

    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: block;
  background-color: var(--primary-color);
}

.dashboard-container {
  display: flex;
  flex-wrap: nowrap;
  padding: 0;
  border-top: 3px solid var(--text-hover-color);
  border-bottom: 3px solid var(--text-hover-color);
  width: 100%;
  margin: 0 auto;
}

.navigation-sidebar {
  flex: 2;
  background-color: var(--primary-color);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-section {
  flex: 6;
  padding: 2rem;
  background-color: #eeeeee;
}

@media (max-width: 1200px) {
  .dashboard-container {
    display: block;
  }

  .navigation-sidebar {
    min-height: 30vh;
  }
}

@media (max-width: 768px) {
  .navigation-sidebar {
    flex-basis: 100%;
  }

  .content-section {
    padding: 1rem;
  }
}
</style>

