<script setup lang="ts">


import AdminHeader from "~/components/AdminHeader.vue";

definePageMeta({
  middleware: 'auth'
})

import HostelFormSubmit from "~/components/HostelFormSubmit.vue";
import AdminFooter from "~/components/AdminFooter.vue";
</script>

<template>
  <AdminHeader/>
  <HostelFormSubmit/>
  <AdminFooter/>
</template>

<style scoped>

</style>