<script setup>
import MainAdminsDashboard from "~/components/MainAdminsDashboard.vue";
</script>

<template>
  <div class="account-settings-page">
    <div class="layout-container">
      <aside class="navigation-sidebar">
        <SettingSidebar/>
      </aside>

      <main class="form-content-area">
        <MainAdminsDashboard/>
      </main>
    </div>
  </div>
</template>

<style scoped>
.account-settings-page {
  display: flex;
  padding: 20px;
}

.layout-container {
  display: flex;
  gap: 20px;
  width: 100%;
  margin: 0 auto;
}

.navigation-sidebar {
  flex: 1;
  padding: 20px;
  color: var(--text-light-color);
  border-radius: 1rem;
  min-height: 100vh;
}

.form-content-area {
  flex: 3;
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 1rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--primary-hover-color);
}

@media (max-width: 768px) {
  .layout-container {
    flex-direction: column;
  }

  .navigation-sidebar {
    margin-bottom: 20px;
  }
}
</style>

