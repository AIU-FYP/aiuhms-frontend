<script setup>
import {defineEmits, defineProps, ref, onMounted} from 'vue';
import {useNuxtApp} from "#app";
import {useStudentFields} from "@/composables/useStudentFields.ts";
import {useStudentOperations} from "@/composables/useStudentOperations.ts";
import {religions} from "~/utils/dropdownOptions.js";

const props = defineProps({
  show: Boolean,
  student: Object,
  allHostels: Array,
});

const emit = defineEmits(['update:show']);

const studentRef = toRef(props, 'student');
const allHostelsRef = toRef(props, 'allHostels');


const {fields, options} = useStudentFields(allHostelsRef, studentRef, religions);
const {updateStudent, deleteStudent, initializeTracking} = useStudentOperations();

watch(() => props.student, (newStudent) => {
  if (newStudent) {
    initializeTracking(newStudent);
  }
}, {immediate: true});

const closePopup = () => emit('update:show', false);

const handleUpdateStudent = async () => {
  const result = await updateStudent(props.student);
  if (result.success) {
    if (result.message) {
      alert(result.message);
    } else {
      alert("Student info updated successfully");
      closePopup();
    }
  } else {
    alert(`Update failed: ${result.error}`);
  }
};

const handleDeleteStudent = async () => {
  if (!confirm('Are you sure you want to delete this student?')) return;

  const result = await deleteStudent(props.student.id);
  if (result.success) {
    alert("Student deleted successfully");
    closePopup();
  } else {
    alert(`Delete failed: ${result.error}`);
  }
};
</script>

<template>
  <div v-if="show" class="popup-overlay" @click="closePopup">
    <div class="popup-container" @click.stop>
      <div class="popup-header">
        <span class="text-xl">Welcome to {{ props.student.name }}</span>
        <UIcon name="fontisto-close" @click="closePopup" class="close-btn"/>
      </div>

      <hr class="divider">

      <div class="popup-content">
        <div v-for="field in fields" :key="field.key" class="box">
          <span class="student-label-info">
            <UIcon name="ph-student" class="student-icon"/>
            {{ field.label }}:
          </span>

          <div class="student-key-info">
            <template v-if="field.type === 'input'">
              <input
                  v-model="props.student[field.key]"
                  class="control-input"
                  :readonly="!field.editable"
              />
            </template>

            <template v-else-if="field.type === 'select'">
              <select
                  v-model="props.student[field.key]"
                  :disabled="!field.editable"
                  class="control-input"
              >
                <option value="">Select {{ field.label }}</option>
                <option
                    v-for="option in options[field.optionsKey]"
                    :key="option.value"
                    :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </template>
          </div>
        </div>
      </div>

      <hr class="divider">
      <div class="popup-footer">
        <div class="popup-bts">
          <button @click="handleDeleteStudent" class="delete-student">Delete Student</button>
          <button @click="handleUpdateStudent" class="change-student-info">
            Change Student Info
          </button>
        </div>
        <div>
          <h2>Thank you</h2>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-container {
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

@media (max-width: 1200px) {
  .popup-container {
    width: 90%;
    max-width: 100%;
  }
}


@media (max-width: 800px) {
  .popup-container {
    width: 100%;
    max-width: 100%;
    border-radius: 0;
  }
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

span {
  margin: 0 5px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--primary-color);
}

.close-btn:hover {
  color: #ff0000;
  transition: .2s ease-in-out;
}

.divider {
  margin: 3% 2%;
  border: 2px solid var(--primary-color);;
}

.popup-content {
  padding: 0 20px;
}

.box {
  display: flex;
}

.student-label-info,
.student-key-info {
  text-align: start;
  text-transform: capitalize;
  color: var(--primary-color);
  font-size: 1.2rem;
  width: 50%;
  padding: .5rem;
  border-radius: .5rem 0;
  background-color: #eeeeee;
  margin-bottom: .5rem;
}

.control-input {
  text-align: start;
  color: var(--primary-color);
  font-size: 1.2rem;
  width: 100%;
  outline: none;
  background-color: #eeeeee;
  margin-bottom: .5rem;
}

.control-input[readonly] {
  cursor: not-allowed;
  color: var(--primary-color);
  font-size: 1.2rem;
  width: 100%;
  outline: none;
}

@media (max-width: 800px) {
  .box {
    display: flex;
    flex-direction: column;
  }

  .student-label-info,
  .student-key-info {
    width: 100%;
    font-size: .9rem;
  }
}

.popup-bts {
  display: flex;
  align-items: center;
  justify-content: space-around;
}


@media (max-width: 800px) {
  .popup-bts {
    flex-direction: column;
    padding: 0;
    margin: 0;
    gap: 0;
  }

  .popup-bts button {
    padding: .5rem;
    margin: 1rem 0;
    font-size: 1rem;
  }
}

.popup-bts button {
  padding: .5rem;
  font-size: 1.2rem;
  text-transform: capitalize;
}

.popup-bts .change-student-info {
  border-radius: 0 1rem;
  border: 2px solid var(--primary-color);
}

.popup-bts .change-student-info:hover {
  background: var(--primary-color);
  color: var(--text-hover-color);
  transition: .4s ease-in-out;
}

.popup-bts .delete-student {
  border-radius: 0 1rem;
  border: 2px solid red;
}

.popup-bts .delete-student:hover {
  background: red;
  color: var(--text-hover-color);
  transition: .4s ease-in-out;
}

@media (max-width: 800px) {
  .popup-bts button {
    padding: .5rem;
    margin: 1rem 0;
    font-size: 1rem;
  }
}

h2 {
  font-size: 1.5rem;
  text-align: center;
  text-transform: capitalize;
}

</style>


