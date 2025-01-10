<script setup lang="ts">
import {useAuth} from "~/composables/useAuth";
import AdminHeader from "~/components/AdminHeader.vue";
import RoomChangeDashboard from "~/components/RoomChangeDashboard.vue";
import AdminFooter from "~/components/AdminFooter.vue";

const auth = useAuth()

definePageMeta({
  middleware: 'auth',
})


</script>

<template>
  <AdminHeader/>
  <RoomChangeDashboard/>
  <AdminFooter/>
</template>

<style scoped>

</style>