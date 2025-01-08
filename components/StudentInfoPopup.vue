<script setup>
import { defineEmits, defineProps, ref, onMounted } from 'vue';
import { useNuxtApp } from "#app";
import { religions } from "~/utils/dropdownOptions.js";

const props = defineProps({
  show: Boolean,
  student: Object,
});

const religionOptions = Array.isArray(religions)
    ? religions
    : Array.from(religions.values());

const allHostels = ref([]);
const isLoading = ref(true);
const emit = defineEmits(['update:show']);

const studentFields = ref([
  {
    label: 'ID ',
    key: 'id',
    editable: false,
    type: 'input'
  },
  {
    label: 'Status',
    key: 'status',
    editable: true,
    type: 'select',
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "graduated", label: "Graduated" },
      { value: "terminated", label: "Terminated" },
    ]
  },
  {
    label: 'Name',
    key: 'name',
    editable: false,
    type: 'input'
  },
  {
    label: 'Student ID',
    key: 'student_id',
    editable: false,
    type: 'input'
  },
  {
    label: 'Passport No',
    key: 'passport',
    editable: true,
    type: 'input'
  },
  {
    label: 'Date of Arrival',
    key: 'arrival_date',
    editable: false,
    type: 'input'
  },
  {
    label: 'WhatsApp No',
    key: 'phone',
    editable: true,
    type: 'input'
  },
  {
    label: 'Student Email',
    key: 'email',
    editable: true,
    type: 'input'
  },
  {
    label: 'Nationality',
    key: 'nationality',
    editable: false,
    type: "input"
  },
  {
    label: 'Program/Major',
    key: 'major',
    editable: true,
    type: "input"
  },
  {
    label: 'Gender',
    key: 'gender',
    editable: true,
    type: 'select',
    options: [{ value: "male", label: "Male" }, { value: "female", label: "Female" }]
  },
  {
    label: 'Religion',
    key: 'religion',
    editable: true,
    type: 'select',
    options: religionOptions
  },
  {
    label: 'Block Name',
    key: 'hostel_name',
    editable: true,
    type: 'select',
    options: [],
  },
  {
    label: 'Level No',
    key: 'level_number',
    editable: true,
    type: 'select',
    options: [],
  },
  {
    label: 'Room No',
    key: 'room_number',
    editable: true,
    type: 'select',
    options: [],
  },
  {
    label: 'Bed',
    key: 'bed_number',
    editable: true,
    type: 'select',
    options: [],
  },
]);

const closePopup = () => {
  emit('update:show', false);
};

let { $axios } = useNuxtApp();
const api = $axios();

const updateHostelOptions = (gender) => {
  const blockField = studentFields.value.find(field => field.key === 'hostel_name');
  if (blockField) {
    blockField.options = allHostels.value.filter(hostel => hostel.gender === gender);
  }
};

const updateLevelOptions = (hostelId) => {
  const hostel = allHostels.value.find(h => h.id === hostelId);
  const levelField = studentFields.value.find(field => field.key === 'level_number');
  if (levelField && hostel) {
    levelField.options = hostel.levels.map(level => ({
      value: level.id,
      label: level.name
    }));
  }
};

const updateRoomOptions = (levelId) => {
  const hostel = allHostels.value.find(h => h.levels.some(level => level.id === levelId));
  const level = hostel?.levels.find(level => level.id === levelId);
  const roomField = studentFields.value.find(field => field.key === 'room_number');
  if (roomField && level) {
    roomField.options = level.rooms.map(room => ({
      value: room.id,
      label: room.number
    }));
  }
};

const updateBedOptions = (roomId) => {
  const hostel = allHostels.value.find(h => h.levels.some(level => level.rooms.some(room => room.id === roomId)));
  const level = hostel?.levels.find(level => level.rooms.some(room => room.id === roomId));
  const room = level?.rooms.find(room => room.id === roomId);
  const bedField = studentFields.value.find(field => field.key === 'bed_number');
  if (bedField && room) {
    bedField.options = room.beds.map(bed => ({
      value: bed.id,
      label: bed.number
    }));
  }
};

onMounted(async () => {
  try {
    const { data } = await api.get('/hostels/');
    console.log('Fetched Hostels:', data);

    allHostels.value = data.map(hostel => ({
      value: hostel.id,
      label: hostel.name,
      gender: hostel.gender,
      levels: hostel.levels
    }));

    updateHostelOptions(props.student.gender);
    updateLevelOptions(props.student.hostel_id);
    updateRoomOptions(props.student.level_id);
    updateBedOptions(props.student.room_id);

  } catch (error) {
    console.error('Error fetching hostels:', error);
  } finally {
    isLoading.value = false;
  }
});

const updateStudentInfo = async () => {
  try {
    const response = await api.patch(`/students/${props.student.id}/`, {
      ...props.student
    });
    console.log('Success:', response.data);
    alert("Student info updated successfully");
    emit('update:show', false);
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
};

const deleteStudent = async () => {
  try {
    const response = await api.delete(`/students/${props.student.id}/`);
    console.log('Student deleted:', response.data);
    alert("Student deleted successfully");
    emit('update:show', false);
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
  <div v-if="show" class="popup-overlay" @click="closePopup">
    <div class="popup-container" @click.stop>

      <div class="popup-header">
        <span style="font-size: 1.5rem">Welcome to {{ props.student.name }}</span>
        <span @click="closePopup" class="close-btn">
          <UIcon name="fontisto-close"/>
        </span>
      </div>

      <hr class="divider">

      <div class="popup-content">
        <div class="box" v-for="field in studentFields" :key="field.key">
          <span class="student-label-info">
            <span>
              <UIcon style="color: var(--primary-color)" name="ph-student"/>
            </span> {{ field.label }}: </span>
          <span class="student-key-info">
            <div v-if="field.type === 'input'">
              <input
                  v-model="props.student[field.key]"
                  class="control-input"
                  :readonly="!field.editable"
              />
            </div>
            <div v-if="field.type === 'select'">
              <select
                  v-model="props.student[field.key]"
                  :disabled="!field.editable"
                  class="control-input"
              >
                <option
                    v-for="option in field.options || []"
                    :key="option.value"
                    :value="option.value"
                    :selected="{ 'selected': option.value == student['bed']['hostel_id'] }"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
          </span>
        </div>
      </div>
      <hr class="divider">
      <div class="popup-footer">
        <div class="popup-bts">
          <button @click="deleteStudent" class="delete-student">Delete Student</button>
          <button @click="updateStudentInfo" class="change-student-info">
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


