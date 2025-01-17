<script setup lang="ts">
import {onMounted, ref, computed} from "vue";
import {useNuxtApp} from "#app";

const isLoading = ref(true);
const userDetails = ref();
const isAdmin = computed(() => userDetails.value?.profile['staff_type'] == 'admin');
const isSuperAdmin = computed(() => userDetails.value?.profile['staff_type'] == 'super_admin');

function handleLogout() {
  useCookie('token').value = null;
  navigateTo('/login');
}

onMounted(async () => {
  try {
    const {$axios} = useNuxtApp();
    const {data} = await $axios().get('/users/me/');
    userDetails.value = data;
    console.log('User Details:', data);
  } catch (error) {
    console.error('Error fetching user details:', error);
  } finally {
    isLoading.value = false;
  }
});

definePageMeta({
  middleware: 'auth',
});
</script>


<template>
  <div class="setting-sidebar" v-if="!isLoading">
    <h1>Account Settings</h1>
    <nav>
      <ul class="menu">
        <li v-if="isAdmin">
          <UIcon name="mdi-password" class="icon"/>
          <router-link to="change-admin-password">Change Password</router-link>
        </li>
        <li v-if="isSuperAdmin">
          <UIcon name="subway-admin-1" class="icon"/>
          <router-link to="setting">Setting</router-link>
        </li>
        <li v-if="isSuperAdmin">
          <UIcon name="subway-admin-1" class="icon"/>
          <router-link to="new-admin">Add New Admin</router-link>
        </li>
        <li v-if="isSuperAdmin">
          <UIcon name="grommet-icons-user-admin" class="icon"/>
          <router-link to="admin-dashboard">Admin dashboard</router-link>
        </li>
        <li v-if="isSuperAdmin">
          <UIcon name="eos-icons-admin" class="icon"/>
          <router-link to="admin">Admin</router-link>
        </li>
        <li class="nav-item" @click="handleLogout">
          <UIcon name="uiw-logout" class="icon"/>
          Logout
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>


.setting-sidebar {
  flex: 1;
  background-color: var(--primary-color);
  padding: 20px;
  color: var(--text-light-color);
  border-radius: 10px;
  min-height: 81vh;
}

.sidebar h1 {
  font-size: 1.5rem;
  margin: 2rem auto;
  text-align:center ;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu li {
  display: flex;
  align-items: center;
  padding: .5rem;
  margin-bottom: 15px;
  font-size: 1rem;
  cursor: pointer;
  background-color: transparent;
}

.menu li:hover {
  background-color: var(--primary-hover-color);
  transition: .3s ease-in-out;
}

.menu li .icon {
  margin-right: 10px;
}

.menu li a {
  text-decoration: none;
}


</style>