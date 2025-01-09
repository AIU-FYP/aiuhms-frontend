<template>
  <div v-if="show" class="modal-overlay" @click="closePopup">
    <div class="modal-container" @click.stop>

      <div class="modal-header">
        <span style="font-size: 1.5rem">Welcome to {{ props.admins.name }}</span>
        <span @click="closePopup" class="modal-close-btn">
          <UIcon name="fontisto-close"/>
        </span>
      </div>

      <div class="modal-content">
        <div class="field-container" v-for="field in studentFields" :key="field.key">
          <span class="field-label">
            <UIcon style="color: var(--primary-color)" name="ph-student"/>
            {{ field.label }}:
          </span>
          <span class="field-input">{{ admins[field.key] }}</span>
        </div>
      </div>

      <div class="modal-footer">
        <div class="action-buttons">
          <button @click="deleteAdmin" class="delete-button" id="deleteAdmin">Delete Admin</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineEmits, defineProps} from "vue";
import {useNuxtApp} from "#app";

const props = defineProps({
  show: Boolean,
  admins: Object,
});

const emit = defineEmits(["update:show"]);

const studentFields = [
  {label: "ID", key: "id"},
  {label: "Name", key: "name"},
  {key: "username", label: "Username"},
  {key: "staff_ID", label: "Staff ID"},
  {key: "staff_type", label: "Admin Type"},
  {label: "WhatsApp No", key: "phone"},
  {label: "Password", key: "password"},
  {label: "Email Address", key: "email"},
];

const closePopup = () => {
  emit("update:show", false);
};

let {$axios} = useNuxtApp();
const api = $axios();

const updateAdminInfo = async () => {
  try {
    const response = await api.patch(`/users/${props.admins.id}/`, {
      ...props.admins,
    });
    console.log("Admin updated successfully:", response.data);
    alert("Admin info updated successfully.");
    emit("update:show", false);
  } catch (error) {
    console.error("Error updating admin:", error.response?.data || error.message);
  }
};

const deleteAdmin = async () => {
  try {
    const response = await api.delete(`/users/${props.admins.id}/`);
    console.log("Admin deleted successfully:", response.data);
    alert("Admin deleted successfully.");
    emit("update:show", false);
  } catch (error) {
    console.error("Error deleting admin:", error.response?.data || error.message);
  }
};
</script>

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
  text-transform: capitalize;
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
  margin: 10px ;
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
</style>
