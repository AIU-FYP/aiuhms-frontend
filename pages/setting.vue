<script setup lang="ts">


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
