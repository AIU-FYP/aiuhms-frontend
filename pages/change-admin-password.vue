<script setup lang="ts">

import AdminHeader from "~/components/AdminHeader.vue";
import AdminChangePassword from "~/components/AdminChangePassword.vue";
import AdminFooter from "~/components/AdminFooter.vue";

definePageMeta({
  middleware: 'auth',
})

</script>

<template>
  <AdminHeader/>
  <AdminChangePassword/>
  <AdminFooter/>
</template>

<style scoped>

</style>