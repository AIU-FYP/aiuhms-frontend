<script setup>
import { defineProps, reactive, watch } from 'vue';
import { z } from 'zod';

const previousQuestions = [
  {
    label: "Current Password",
    type: "password",
    placeholder: "Enter Current Password",
    id: "old_password",
  },
  {
    label: "New Password",
    type: "password",
    placeholder: "Enter New Password",
    id: "new_password"
  },
  {
    label: "Confirm New Password",
    type: "password",
    placeholder: "Confirm New Password",
    id: "confirm_password"
  },
];

const formSchema = z.object({
  "old_password": z
      .string(),
  "new_password": z
      .string(),
  "confirm_password": z
      .string()
      .refine(value => value === form["new_password"], "Passwords must match"),
});

const form = reactive({});
const errors = reactive({});

previousQuestions.forEach((question) => {
  form[question.id] = "";
  errors[question.id] = "";
});

function validateField(field) {
  try {
    formSchema.shape[field].parse(form[field]);
    errors[field] = "";
  } catch (error) {
    errors[field] = error.errors ? error.errors[0].message : error.message;
  }
}

previousQuestions.forEach((question) => {
  watch(
      () => form[question.id],
      () => validateField(question.id)
  );
});

let { $axios } = useNuxtApp()
const api = $axios()

const handleSubmit = async () => {
  try {
    const response = await api.post(`/users/change-password/`, form);

    console.log('Success:', response.data);
    alert("Password changed successfully");
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
};
</script>

<template>
  <div class="settings-page">
    <div class="container">
      <aside class="sidebar">
        <h1>Account Settings</h1>
        <nav>
          <ul class="menu">
            <li>
              <UIcon name="mdi-password" class="icon"/>
              <router-link to="change-admin-password">Change Password</router-link>
            </li>
            <li>
              <UIcon name="subway-admin-1" class="icon"/>
              <router-link to="new-admin">Add New Admin</router-link>
            </li>
            <li>
              <UIcon name="grommet-icons-user-admin" class="icon"/>
              <router-link to="admin-dashboard">Admin dashboard</router-link>
            </li>
            <li>
              <UIcon name="eos-icons-admin" class="icon"/>
              <router-link to="admin">Admin</router-link>
            </li>
            <li>
              <UIcon name="uiw-logout" class="icon"/>
              <router-link to="login">Log Out</router-link>
            </li>
          </ul>
        </nav>
      </aside>
      <main class="content">
        <h2>Change Admin Password</h2>
        <form @submit.prevent="handleSubmit">
          <div v-for="(question, index) in previousQuestions" :key="index" class="form-group">
            <div class="form-control">
              <label class="question-title" :for="question.id">{{ question.label }}:</label>

              <input
                  v-if="question.type === 'text' || question.type === 'password'"
                  :type="question.type"
                  v-model="form[question.id]"
                  :placeholder="question.placeholder"
                  :id="question.id"
              />
              <span v-if="errors[question.id]" class="error">{{ errors[question.id] }}</span>
            </div>
          </div>
          <button type="submit" class="submit-btn">Save Changes</button>
        </form>
      </main>
    </div>
  </div>
</template>


<style scoped>
.settings-page {
  display: flex;
  padding: 20px;
}

.container {
  display: flex;
  gap: 20px;
  width: 100%;
  margin: 0 auto;
}

.sidebar {
  flex: 1;
  background-color: var(--main-color);
  padding: 20px;
  color: var(--text-color);
  border-radius: 1rem;
  min-height: 81vh;
}

.sidebar h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
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
  background-color: var(--main-hovor-color);
  transition: .3s ease-in-out;
}

.menu li .icon {
  margin-right: 10px;
}

.menu li a {
  text-decoration: none;
}

.content {
  flex: 3;
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 1rem;
}

.content h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--main-hovor-color);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select{
  width: 100%;
  padding: 10px;
  border: 2px solid var(--text-color);
  border-radius: 5px;
  outline: none;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}

.submit-btn {
  padding: 10px 20px;
  background-color: var(--main-hovor-color);
  color: var(--text-color);
  border: none;
  border-radius: .5rem;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: var(--main-color);
  color: var(--text-hovor-color);
  transition: .3s ease-in-out;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .sidebar {
    margin-bottom: 20px;
  }
}
</style>
