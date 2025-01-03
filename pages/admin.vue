<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
})

</script>

<template>
  <AdminHeader/>
  <Admin/>
  <AdminFooter/>
</template>

<style scoped></style>
