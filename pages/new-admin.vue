<script setup lang="ts">

import {useAuth} from "~/composables/useAuth";
import AdminHeader from "~/components/AdminHeader.vue";
import AdminForm from "~/components/AdminForm.vue";
import AdminFooter from "~/components/AdminFooter.vue";

definePageMeta({
  middleware: 'auth'
})

const auth = useAuth()

</script>

<template>
  <AdminHeader/>
  <AdminForm/>
  <AdminFooter/>
</template>

<style scoped>

</style>