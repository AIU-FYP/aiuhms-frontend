<script setup lang="ts">


import AdminHeader from "~/components/AdminHeader.vue";
import AdminFooter from "~/components/AdminFooter.vue";

definePageMeta({
  middleware: 'auth'
})

</script>

<template>
  <AdminHeader/>
  <RoomDashboard/>
  <AdminFooter/>
</template>

<style scoped>

</style>