<script setup>
import { defineEmits, defineProps } from "vue";
import { useNuxtApp } from "#app";

const props = defineProps({
  show: Boolean,
  hostel: Object,
});

const emit = defineEmits(["update:show"]);

const convertToLetter = (zoneNumber) => {
  return String.fromCharCode(64 + Number(zoneNumber));
};

const closePopup = () => {
  emit("update:show", false);
};

const bedStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "available":
      return "green";
    case "occupied":
      return "red";
    case "under maintenance":
      return "gray";
    default:
      return "transparent";
  }
};

let { $axios } = useNuxtApp();
const api = $axios();

const updateBedStatus = async (bed, newStatus) => {
  try {
    await api.patch(`/beds/${bed.id}/`, { status: 'under maintenance' });
    console.log('Bed ID:', bed.id);
    bed.status = newStatus;

    console.log("Bed status updated successfully:", response.data);
    alert("Bed status updated successfully!");
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
    alert("Error updating bed status. Please try again.");
  }
};


</script>

<template>
  <div v-if="show" class="popup-overlay" @click="closePopup">
    <div class="popup-container" @click.stop>
      <div class="popup-header">
        <span>
          Welcome to {{ hostel.name }} Hostel,
          {{
            hostel.gender.charAt(0).toUpperCase() + hostel.gender.slice(1).toLowerCase()
          }} students
        </span>
        <span @click="closePopup" class="close-btn">
          <UIcon name="fontisto-close" />
        </span>
      </div>

      <hr class="divider" />

      <div class="status">
        <div class="box-status">
          <span class="status-span occupied"></span>
          <span>Occupied</span>
        </div>
        <div class="box-status">
          <span class="status-span available"></span>
          <span>Available</span>
        </div>
        <div class="box-status">
          <span class="status-span under-maintenance"></span>
          <span>Under Maintenance</span>
        </div>
      </div>

      <div class="popup-content">
        <div class="container">
          <div v-for="level in hostel.levels" :key="level.number" class="levels">
            <span class="level-label">Level {{ level.number }}</span>
            <div class="level-box">
              <div v-for="room in level.room_details" :key="room.number" class="room-box">
                <div class="box">
                  <div class="capacity-container">
                    <div
                        v-for="bed in room.beds"
                        :key="bed.id"
                        class="capacity-part"
                        :style="{ backgroundColor: bedStatusColor(bed.status) }"
                        @click="updateBedStatus(bed, 'under maintenance')"
                    >
                      <UIcon name="mdi-bed" class="icon" />
                      <span>{{ convertToLetter(bed.bed_number) }}</span>
                      <span>{{ bed.status }}</span>
                    </div>

                  </div>

                  <div class="room-box">
                    <span class="room-number">Room: {{ room.number }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-container {
  background: #EEEEEE;
  padding: 2rem;
  width: 90%;
  max-width: 90%;
  scroll-behavior: smooth;
  text-align: center;
  max-height: 90vh;
  position: relative;
  overflow-y: auto;
}

@media (max-width: 1200px) {
  .popup-container {
    width: 100%;
    margin: 0;
    padding: 1rem;
  }
}

@media (max-width: 800px) {
  .popup-container {
    width: 100%;
    max-width: 100%;
    border-radius: 0;
    font-size: 1rem;
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
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.close-btn:hover {
  color: #ff0000;
  transition: .2s ease-in-out;
}

.divider {
  margin: 20px 0;
  border: 2px solid var(--primary-color);
}

.status {
  display: inline-flex;
  margin: 0 auto;
}

.status .box-status {
  min-width: 150px;
  display: inline-flex;
  align-items: center;
  text-align: center;
  margin-right: 20px;
}

.status div span {
  display: block;
  align-items: center;
}

.status-span {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.status-span.occupied {
  background-color: red;
}

.status-span.available {
  background-color: green;
}

.status-span.under-maintenance {
  background-color: var(--primary-color);
}

@media (max-width: 800px) {
  .status {
    display: block;
    margin: 0;
  }

  .status .box-status {
    min-width: 100px;
    display: flex;
    justify-content: space-between;
    margin: 1rem auto;
  }
}

.levels {
  border-bottom: 2px solid var(--primary-color);
  margin: 10px;
}

.level-label {
  font-size: 1.5rem;
  color: var(--primary-color);
  padding: 0 50px 10px 50px;
}

.level-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px;
  max-height: 350px;
  overflow-y: auto;
  gap: 20px;
}

.level-box div {
  width: 230px;
  height: auto;
  text-align: center;
  color: black;
}

@media (max-width: 1200px) {
  .level-box div{
    margin: auto;
    gap: 20px;
  }
}

.room-number {
  font-size: 1rem;
}

.capacity-container {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.capacity-part {
  display: block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-radius: 4px;
}

.capacity-part .icon,
.capacity-part span {
  color: var(--text-hover-color);
  font-size: 1rem;
}

@media (max-width: 800px) {
  .box {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 800px) {
  .popup-bts button {
    margin: 0.5rem;
    font-size: 1rem;
  }
}

h2 {
  font-size: 1.5rem;
  text-align: center;
  text-transform: capitalize;
}
</style>
