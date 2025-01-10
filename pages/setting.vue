<script setup lang="ts">


import AdminHeader from "~/components/AdminHeader.vue";
import AdminDashboard from "~/components/AdminDashboard.vue";
import AdminFooter from "~/components/AdminFooter.vue";

definePageMeta({
  middleware: 'auth'
})

</script>

<template>
  <AdminHeader/>
  <AdminDashboard/>
  <AdminFooter/>
</template>

<style scoped>

</style>
