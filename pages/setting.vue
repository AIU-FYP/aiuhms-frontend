<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
})

const auth = useAuth()

</script>

<template>
  <AdminHeader/>
  <AdminDashboard/>
  <AdminFooter/>
</template>

<style scoped>

</style>
