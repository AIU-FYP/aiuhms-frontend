<script setup>
import {reactive, watch} from 'vue';
import {z} from 'zod';

const previousQuestions = [
  {
    label: "Username",
    type: "text",
    placeholder: "Enter your username",
    required: true,
    id: "username"
  },
  {
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    required: true,
    id: "name"
  },
  {
    label: "Enter your Position",
    type: "select",
    placeholder: "Position",
    required: true,
    options: [
        {value: "student_affairs", label: "Student Affairs"},
        {value: "ppk", label: "PPK"},
        {value: "assistance", label: "Assistance"},
    ],
    id: "position"
  },
  {
    label: "Staff ID",
    type: "text",
    placeholder: "Enter your staff ID (e.g., AIU21011234)",
    required: true,
    id: "staff_ID"
  },
  {
    label: "Phone Number",
    type: "text",
    placeholder: "Enter your phone number",
    required: true,
    id: "phone"
  },
  {
    label: "Email Address (Staff Email Only)",
    type: "text",
    placeholder: "Enter your email address",
    required: true,
    id: "email"
  },
  {
    label: "Admin type (admin or super admin)",
    type: "select",
    options: [{value: "admin", label: 'Admin'}, {value: "super_admin", label: "Super Admin"}],
    placeholder: "Select admin type",
    required: true,
    id: "staff_type"
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Enter your new password",
    required: true,
    id: "password"
  },
  {
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
    required: true,
    id: "confirm_password"
  }
];

const formSchema = z.object({
  "username": z.string().min(4, "Name must be at least 4 characters long").nonempty("Name is required"),
  "name": z.string().min(4, "Name must be at least 4 characters long").nonempty("Name is required"),
  "position": z.string().optional(),
  "staff_ID": z.string().regex(/^AIU\d{8}$/, "Invalid Staff ID format").nonempty("Staff ID is required"),
  "phone": z.string().regex(/^\d{8,15}$/, "Invalid phone number").nonempty("Phone Number is required"),
  "email": z
      .string()
      .email("Invalid email format")
      .regex(/@(aiu\.edu\.my|ppksb\.com\.my)$/, "Email must belong to 'aiu.edu.my' or 'ppksb.com.my'"),

  "staff_type": z.string().nonempty("Admin type is required"),
  "password": z
      .string()
      .min(12, "Password must be at least 12 characters long")
      .max(15, "Password must not exceed 15 characters")
      .regex(/[a-zA-Z]/, "Password must include at least one letter")
      .regex(/\d/, "Password must include at least one number")
      .regex(/[@$!%*?&]/, "Password must include at least one special character"),
  "confirm_password": z
      .string()
      .min(12, "Password must be at least 12 characters long")
      .max(15, "Password must not exceed 15 characters")
      .regex(/[a-zA-Z]/, "Password must include at least one letter")
      .regex(/\d/, "Password must include at least one number")
      .regex(/[@$!%*?&]/, "Password must include at least one special character"),
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


async function handleSubmit() {
  const api = useApi();
  form.Date = new Date().toLocaleDateString("en-GB");

  const validationResults = formSchema.safeParse(form);
  console.log("Form data:", form);

  if (validationResults.success) {
    try {
      const payload = {
        username: form.username,
        password: form.password,
        profile: {
          name: form.name,
          position: form.position,
          staff_ID: form.staff_ID,
          phone: form.phone,
          email: form.email,
          staff_type: form.staff_type,
        }
      };
      console.log("payload:", payload)

      console.log("Sending API Request...", payload);

      const response = await api.post("/users/", payload);
      console.log("Response Data:", response.data);

      Object.keys(form).forEach((key) => {
        if (typeof form[key] === "object") {
          Object.keys(form[key]).forEach((nestedKey) => (form[key][nestedKey] = ""));
        } else {
          form[key] = "";
        }
      });

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error occurred:", error);
      if (error.response) {
        console.error("Backend Error:", error.response.data);
        alert(`Error: ${error.response.data.detail || "Unable to submit the form."}`);
      } else if (error.request) {
        console.error("No response from the server:", error.request);
        alert("Server is not responding. Please try again later.");
      } else {
        console.error("Request Setup Error:", error.message);
        alert("An error occurred while submitting the form. Please try again.");
      }
    }
  } else {
    console.log("Validation Errors:", validationResults.error.errors);
    alert("Please correct the errors in the form.");
  }
}

</script>

<template>
  <div class="account-settings-page">
    <div class="layout-container">
      <aside class="navigation-sidebar">
        <h1 class="sidebar-title">Account Settings</h1>
        <nav>
          <ul class="navigation-menu">
            <li class="menu-item">
              <UIcon name="mdi-password" class="menu-icon"/>
              <router-link to="change-admin-password">Change Password</router-link>
            </li>
            <li class="menu-item">
              <UIcon name="subway-admin-1" class="menu-icon"/>
              <router-link to="new-admin">Add New Admin</router-link>
            </li>
            <li class="menu-item">
              <UIcon name="grommet-icons-user-admin" class="menu-icon"/>
              <router-link to="admin-dashboard">Admin Dashboard</router-link>
            </li>
            <li class="menu-item">
              <UIcon name="eos-icons-admin" class="menu-icon"/>
              <router-link to="admin">Admin</router-link>
            </li>
            <li class="menu-item">
              <UIcon name="uiw-logout" class="menu-icon"/>
              <router-link to="login">Log Out</router-link>
            </li>
          </ul>
        </nav>
      </aside>

      <main class="form-content-area">
        <h2 class="content-header">Add New Admin</h2>
        <form @submit.prevent="handleSubmit" class="admin-form">
          <div v-for="(question, index) in previousQuestions" :key="index" class="form-field">
            <div class="input-container">
              <label class="input-label" :for="question.label">{{ question.label }}:</label>

              <input
                  v-if="question.type === 'text' || question.type === 'password'"
                  :type="question.type"
                  v-model="form[question.id]"
                  :placeholder="question.placeholder"
                  :id="question.id"
                  class="input-field"
              />

              <select
                  v-if="question.type === 'select'"
                  v-model="form[question.id]"
                  :id="question.id"
                  class="select-field"
              >
                <option value="" disabled>{{ question.placeholder }}</option>
                <option v-for="option in question.options" :key="option" :value="option.value">{{ option.label }}</option>
              </select>

              <span v-if="errors[question.id]" class="error-message">{{ errors[question.id] }}</span>
            </div>
          </div>
          <button type="submit" class="submit-button">Save Changes</button>
        </form>
      </main>
    </div>
  </div>
</template>

<style scoped>
.account-settings-page {
  display: flex;
  padding: 20px;
}

.layout-container {
  display: flex;
  gap: 20px;
  width: 100%;
  margin: 0 auto;
}

.navigation-sidebar {
  flex: 1;
  background-color: var(--primary-color);
  padding: 20px;
  color: var(--text-light-color);
  border-radius: 1rem;
  min-height: 81vh;
}

.sidebar-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.navigation-menu {
  list-style: none;
  padding: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: .5rem;
  margin-bottom: 15px;
  font-size: 1rem;
  cursor: pointer;
  background-color: transparent;
}

.menu-item:hover {
  background-color: var(--primary-hover-color);
  transition: .3s ease-in-out;
}

.menu-icon {
  margin-right: 10px;
}

.menu-item a {
  text-decoration: none;
}

.form-content-area {
  flex: 3;
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 1rem;
}

.content-header {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--primary-hover-color);
}

.admin-form {
  display: flex;
  flex-direction: column;
}

.form-field {
  margin-bottom: 20px;
}

.input-container {
  display: flex;
  flex-direction: column;
}

.input-label {
  display: block;
  margin-bottom: 5px;
}

.input-field,
.select-field {
  width: 100%;
  padding: 10px;
  border: 2px solid var(--text-light-color);
  border-radius: 5px;
  outline: none;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}

.submit-button {
  padding: 10px 20px;
  background-color: var(--primary-hover-color);
  color: var(--text-light-color);
  border: none;
  border-radius: .5rem;
  cursor: pointer;
}

.submit-button:hover {
  background-color: var(--primary-color);
  color: var(--text-hover-color);
  transition: .3s ease-in-out;
}

@media (max-width: 768px) {
  .layout-container {
    flex-direction: column;
  }

  .navigation-sidebar {
    margin-bottom: 20px;
  }
}
</style>

