<script setup>
import {defineProps, defineEmits} from "vue";
import {useNuxtApp} from "#app";

const props = defineProps({
  show: Boolean,
  admins: Object,
});

const emit = defineEmits(["update:show"]);

const adminsFields = [
  {label: "ID", key: "id"},
  {label: "Name", key: "name"},
  {label: "Username", key: "username"},
  {label: "Staff ID", key: "staff_ID"},
  {label: "Admin Type", key: "staff_type"},
  {label: "WhatsApp No", key: "phone"},
  {label: "Password", key: "password"},
  {label: "Email Address", key: "email"},
];

const closePopup = () => {
  emit("update:show", false);
};

let {$axios} = useNuxtApp()
const api = $axios

const deleteAdmin = async () => {
  if (!props.admins?.id) {
    alert("Invalid admin data. Unable to delete.");
    return;
  }

  try {
    const response = await api.delete(`/users/${props.admins.id}/`);
    console.log("Admin deleted successfully:", response.data);
    alert("Admin deleted successfully.");
    emit("update:show", false);
  } catch (error) {
    console.error("Error deleting admin:", error.response?.data || error.message);
    alert("Failed to delete admin. Please try again.");
  }
};

definePageMeta({
  middleware: 'auth',
});

</script>


<template>
  <div v-if="show" class="modal-overlay" @click="closePopup">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <span v-if="admins?.name" style="font-size: 1.5rem">
          Welcome to {{ admins.name }}
        </span>
        <span @click="closePopup" class="modal-close-btn">
          <UIcon name="fontina-close" />
        </span>
      </div>

      <div class="modal-content">
        <div class="field-container" v-for="field in adminsFields" :key="field.key">
          <span class="field-label">
            <UIcon style="color: var(--primary-color)" name="ph-student" />
            {{ field.label }}:
          </span>
          <span class="field-input">{{ admins?.[field.key] || 'N/A' }}</span>
        </div>
      </div>

      <div class="modal-footer">
        <div class="action-buttons">
          <button @click="deleteAdmin" class="delete-button" id="deleteAdmin">
            Delete Admin
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background: #fff;
  padding: 2rem;
  width: 60%;
  max-width: 60%;
  scroll-behavior: smooth;
  text-align: center;
  max-height: 90vh;
  position: relative;
  overflow-y: auto;
  z-index: 1001;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
}

.modal-close-btn {
  position: absolute;
  top: 40px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--primary-color);
}

.modal-content {
  padding: 0 20px;
}

.field-container {
  display: flex;
}

.field-label,
.field-input {
  text-align: start;
  color: var(--primary-color);
  font-size: 1.2rem;
  width: 50%;
  padding: 0.5rem;
  background-color: #eeeeee;
  margin: 0.5rem;
}

.action-buttons {
  display: flex;
  justify-content: space-around;
  margin: 10px;
}

.delete-button {
  border: 2px solid red;
  padding: 0.5rem;
  border-radius: 0 1rem;
}

.delete-button:hover {
  background: red;
  color: var(--text-hover-color);
}

@media (max-width: 1200px) {
  .modal-container {
    width: 90%;
    max-width: 90%;
    max-height: 90vh;
  }

  .field-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .field-label,
  .field-input {
    font-size: 1.2rem;
    width: 100%;
  }
}
</style>
