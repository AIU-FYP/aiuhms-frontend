<script setup lang="ts">


definePageMeta({
  middleware: 'auth'
})

import HostelFormSubmit from "~/components/HostelFormSubmit.vue";
</script>

<template>
  <AdminHeader/>
  <HostelFormSubmit/>
  <AdminFooter/>
</template>

<style scoped>

</style>