<script setup>
import {reactive, ref} from 'vue';
import {z} from 'zod';
import {navigateTo, useNuxtApp} from '#app';

const previousQuestions = [
  {
    label: "Username",
    id: "username",
    type: "text",
    placeholder: "Enter your Username",
    required: true
  },
  {
    label: "Admin Password",
    type: "password",
    id: "password",
    placeholder: "Enter your Password",
    required: true
  },
];

const formSchema = z.object({
  "username":
      z.string()
          .min("Username must start with 'AIU' followed by 8 digits")
          .nonempty("Username is required"),
  "password":
      z.string()
          .min(12, "Password must be at least 12 characters long")
          .max(20, "Password must not exceed 15 characters")
          .regex(/[a-zA-Z]/, "Password must include at least one letter")
          .regex(/\d/, "Password must include at least one number")
          .regex(/[@$!%*?&]/, "Password must include at least one special character (@$!%*?&)")
          .nonempty("Password is required"),
});

const form = reactive({
  username: '',
  password: ''
});

const errors = reactive({
  username: '',
  password: ''
});

const isLoading = ref(false);
const errorMessage = ref('');

const {$axios} = useNuxtApp();
const api = $axios();

function validateField(field) {
  try {
    formSchema.shape[field].parse(form[field]);
    errors[field] = "";
  } catch (error) {
    errors[field] = error.errors ? error.errors[0].message : error.message;
  }
}

function validateForm() {
  validateField("username");
  validateField("password");
}

async function handleSubmit() {
  validateForm();

  if (!errors.username && !errors.password) {
    try {
      isLoading.value = true;
      const response = await api.post('/token/', {
        username: form.username,
        password: form.password,
      });

      alert("Login successful");

      console.log('Response:', response.data);
      console.log('Token from response:', response.data.access);

      useCookie('token').value = response.data.access;

      navigateTo('/admin');
      console.log('Navigated to /admin');
    } catch (error) {
      console.error('Error during login:', error);
      errorMessage.value = error.response?.data?.message || 'Login failed.';
    } finally {
      isLoading.value = false;
    }
  }
}


</script>

<template>
  <div class="log-in">
    <div class="container">
      <div class="image-box">
        <img src="../public/images/login.webp" alt="login pic">
      </div>
      <div class="log-in-form">
        <span class="user-icon">
          <UIcon name="mdi-user-outline"/>
        </span>
        <h2 class="form-title">AIU Hostel Management System</h2>
        <div class="form-container">
          <form @submit.prevent="handleSubmit">
            <div class="login-form">
              <div class="info" v-for="(question, index) in previousQuestions" :key="index">
                <label :for="question.label">{{ question.label }}</label>
                <input
                    :type="question.type"
                    v-model="form[question.id]"
                    :placeholder="question.placeholder"
                    :id="question.label"
                />
                <span v-if="errors[question.id]" class="error">{{ errors[question.id] }}</span>
              </div>
              <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
            </div>
            <button class="login-submit" type="submit" :disabled="isLoading">Log In</button>
          </form>
        </div>
        <router-link to="/home" class="home-btn">Home Page</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.log-in {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #133E87FF, #4B8AE6, #82B4F9);
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 85%;
}

.container .image-box {
  flex: 65%;
  width: 100%;
  height: 100%;
}

.container .log-in-form {
  flex: 30%;
  min-height: 60vh;
  padding: 2rem .5rem;
  margin-top: 2rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  background-color: var(--primary-color);
}

@media (max-width: 1200px) {
  .container {
    display: block;
    width: 100%;
    margin: 5rem auto;
    border-radius: 0;
  }

  .container .log-in-form,
  .container .image-box {
    padding: 3rem 0;
    margin: 3rem 0;
  }
}

.log-in-form .user-icon {
  display: flex;
  padding: 1rem;
  width: fit-content;
  margin: -5rem auto 1rem;
  text-align: center;
  font-size: 5rem;
  background-color: var(--text-light-color);
  color: var(--primary-color);
  border: .3rem solid var(--text-light-color);
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.3) 0 5px 15px;
}

.info-box > h2 {
  font-size: 1.2rem;
  text-align: center;
  padding: .5rem;
  color: var(--text-light-color);
}

.log-in-form > h2 {
  font-size: 1.5rem;
  text-align: center;
  color: var(--text-light-color);
}

.login-form {
  display: block;
  width: 90%;
  margin: 3rem auto;
}

.login-form label {
  color: var(--text-hover-color);
}

.login-form input {
  width: 100%;
  padding: 0.5rem;
  margin: .5rem 0;
  border: 1px solid var(--text-hover-color);
  outline: none;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
}

.error {
  color: red;
  font-size: 1rem;
}

.login-submit{
  display: block;
  width: 90%;
  padding: .5rem;
  margin: -2rem auto 0 auto;
  background-color: var(--text-light-color);
  color: var(--primary-color);
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  border-radius: 1rem;
}

.home-btn{
  display: block;
  width: 90%;
  margin: .5rem auto;
  color: var(--text-light-color);
  text-align: center;
}

.login-submit:hover {
  background-color: var(--primary-hover-color);
  color: var(--text-hover-color);
  transition: .4s ease-in-out;
}

</style>
