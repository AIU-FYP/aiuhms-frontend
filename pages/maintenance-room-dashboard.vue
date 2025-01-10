<script setup lang="ts">

import MaintenanceDashboard from "~/components/MaintenanceDashboard.vue";
import AdminHeader from "~/components/AdminHeader.vue";
import AdminFooter from "~/components/AdminFooter.vue";

definePageMeta({
  middleware: 'auth'
})

</script>

<template>
  <AdminHeader/>
  <MaintenanceDashboard/>
  <AdminFooter/>
</template>

<style scoped>

</style>