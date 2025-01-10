<script setup lang="ts">

import {useAuth} from "~/composables/useAuth";
import StudentDashboard from "~/components/StudentDashboard.vue";
import AdminHeader from "~/components/AdminHeader.vue";
import AdminFooter from "~/components/AdminFooter.vue";

definePageMeta({
  middleware: 'auth'
})

const auth = useAuth()


</script>

<template>
  <AdminHeader/>
  <StudentDashboard/>
  <AdminFooter/>
</template>

<style scoped>

</style>