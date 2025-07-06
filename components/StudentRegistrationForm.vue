<script setup>
import {computed, reactive, ref, watch} from 'vue';
import Popup from '~/components/AdminSubmitPopup.vue';
import {z} from 'zod';
import {religions, nationalities} from "~/utils/dropdownOptions.js";
import {useNuxtApp} from "#app";

const form = reactive({});
const errors = reactive({});

const userNationalityInput = ref('');
const filteredNationalities = computed(() => {
  if (!userNationalityInput.value) {
    return nationalities;
  }
  return nationalities.filter(n =>
      n.toLowerCase().startsWith(userNationalityInput.value.toLowerCase())
  );
});

const userReligionsInput = ref('');
const filteredReligions = computed(() => {
  if (!userReligionsInput.value) {
    return religions;
  }
  return religions.filter(n =>
      n.toLowerCase().startsWith(userReligionsInput.value.toLowerCase())
  );
});

const isPopupVisible = ref(false);

const formSchema = z.object({
  "name": z.string().min(8, "Name must be at least 8 characters long"),
  "student_id": z.string().regex(/^AIU\d{8}$/, "Invalid Student ID format"),
  "passport": z.string()
      .regex(/^[a-zA-Z0-9]{6,15}$/, "Invalid Passport Number format"),
  "arrival_date": z.string(),
  "phone": z.string().regex(/^\d{8,15}$/, "Invalid WhatsApp number format"),
  "email": z.string().email("Invalid email format"),
  "gender": z.string().optional(),
  "status": z.string().optional(),
  "religion": z.string().optional(),
  "nationality": z.string().optional(),
  "major": z.string().min(3, "Major must be at least 3 characters long"),
  "block_name": z.string().optional(),
  "level_number": z.string().optional(),
  "room": z.string().optional(),
  "bed": z.number().optional(),
});

let {$axios} = useNuxtApp();
const api = $axios;

const selectedHostelIndex = ref(0);
const allHostels = ref([]);
const selectedHostel = computed(() => allHostels[selectedHostelIndex]);

const questions = computed(() => {
  return [
    {
      label: "Name", type: "text", placeholder: "Enter your name", id: "name"
    },
    {
      label: "Student ID", type: "text", placeholder: "Enter your student ID (e.g., AIU21011234)", id: "student_id"
    },
    {
      label: "Passport No", type: "text", placeholder: "Enter your passport No", id: "passport"
    },
    {
      label: "Date of Arrive", type: "date", placeholder: "Select your date of birth", id: "arrival_date"
    },
    {
      label: "WhatsApp No", type: "text", placeholder: "Enter your WhatsApp No", id: "phone"
    },
    {
      label: "Email Address (Student Email Only)", type: "text", placeholder: "Enter your email address", id: "email"
    },
    {
      label: "Gender",
      type: "select",
      options: [{value: "male", label: "Male"}, {value: "female", label: "Female"}],
      placeholder: "Select your gender",
      model: ref(""),
      id: "gender"
    },
    {
      label: "Status",
      type: "select",
      options: [
        {value: 'active', label: 'Active'},
        {value: 'foundation', label: 'Foundation '},
      ],
      placeholder: "Select your status",
      model: ref(""),
      id: "status"
    },
    {
      label: "Religion",
      type: "select",
      options: filteredReligions.value,
      placeholder: "Select Your religion",
      id: "religion"
    },
    {
      label: "Nationality",
      type: "select",
      options: filteredNationalities.value,
      placeholder: "Select Your nationality",
      id: "nationality"
    },
    {
      label: "Program/Major", type: "text", placeholder: "Enter your program or major", id: "major"
    },
    {
      label: "Block Name",
      type: "select",
      placeholder: "Select Block Name (e.g., 25i)",
      model: ref(""),
      id: "block_name",
      options: allHostels.value.filter(h => h.gender === form['gender']).map(h => ({value: h.name, label: h.name}))
    },
    {
      label: "Level No",
      type: "select",
      options: allHostels.value.find(h => h.name === form['block_name'])?.levels.map(l => ({
        value: l.number.toString(),
        label: `Level ${l.number}`
      })) || [],
      placeholder: "Select Level No",
      model: ref(""),
      id: "level_number"
    },
    {
      label: "Room No",
      type: "select",
      placeholder: "Select Room No (e.g., 02)",
      options: allHostels.value.find(h => h.name === form['block_name'])?.levels.find(l => l.number === Number(form['level_number']))?.room_details.map(r => ({
        value: r.number,
        label: `Room ${r.number}`
      })) || [],
      model: ref(""),
      id: "room"
    },
    {
      label: "Which Zone",
      type: "select",
      placeholder: "Which Zone?",
      options: allHostels.value.find(h => h.name === form['block_name'])?.levels.find(l => l.number.toString() === form['level_number'])?.room_details.find(r => r.number.toString() === form['room'])?.beds.map(b => ({
        value: b.id,
        label: `Zone ${b.bed_number} (${b.status})`
      })) || [],
      id: "bed"
    }
  ];
});

questions.value.forEach((question) => {
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

questions.value.forEach((question) => {
  watch(() => form[question.id], () => validateField(question.id));
});

const isLoading = ref(true);

onMounted(async () => {
  try {
    const {data} = await api.get('/hostels/');
    console.log(data);
    allHostels.value = data;
    selectedHostel.value = data[0];
  } catch (e) {
    console.log('error fetching hostels');
  } finally {
    isLoading.value = false;
  }
});

async function handleSubmit() {
  const api = useApi();
  form.Date = new Date().toLocaleDateString("en-GB");

  const validationResults = formSchema.safeParse(form);
  console.log('Form data:', form);
  if (validationResults.success) {
    if (form.room) {
      form.room = form.room.toString();
    }
    try {
      console.log("Sending API Request...");
      const response = await api.post("/students/", {...form});
      console.log("Response Data:", response.data);
      isPopupVisible.value = true;
      Object.keys(form).forEach((key) => (form[key] = ""));
      location.reload();
    } catch (error) {
      isPopupVisible.value = false;
      console.error("Error occurred:", error);
      if (error.response) {
        isPopupVisible.value = false;
        console.log(form);
        console.error("Backend Error:", error.response.data);
        alert(`Error: ${error.response.data.detail || "Unable to submit the form."}`);
      } else if (error.request) {
        isPopupVisible.value = false;
        console.error("No response from the server:", error.request);
        alert("Server is not responding. Please try again later.");
      } else {
        isPopupVisible.value = false;
        console.error("Request Setup Error:", error.message);
        alert("An error occurred while submitting the form. Please try again.");
      }
    }
  } else {
    console.log('Validation Errors:', validationResults.error.errors);
    isPopupVisible.value = false;
    alert("Please correct the errors in the form.");
  }
}

definePageMeta({
  middleware: 'auth',
});
</script>

<template>
  <div class="new-student-sec">
    <Loader v-if="isLoading"/>
    <div class="container" v-else>
      <div class="form-header">
        <h2>Student Registration Form</h2>
      </div>
      <div class="box-form">
        <form @submit.prevent="handleSubmit">
          <div class="form-container">
            <div class="info" v-for="(question, index) in questions" :key="index">
              <label class="question-title" :for="question.label">{{ question.label }}</label>

              <input
                  v-if="question.type === 'text' || question.type === 'file' ||question.type==='date'"
                  :type="question.type"
                  v-model="form[question.id]"
                  :placeholder="question.placeholder"
                  :id="question.label"
                  @input="validateField(question.id)"
              />

              <select
                  v-if="question.type === 'select'"
                  v-model="form[question.id]"
                  :id="question.label"
                  @change="validateField(question.id)"
              >
                <option value="" disabled>{{ question.placeholder }}</option>
                <option v-for="option in question.options" :key="option.label" :value="option.value">{{
                    option.label
                  }}
                </option>
              </select>
              <span v-if="errors[question.id]" class="error">{{ errors[question.id] }}</span>

              <textarea
                  v-if="question.type === 'textarea'"
                  :id="question.id"
                  :name="question.label"
                  :placeholder="question.placeholder"
                  v-model="form[question.id]"
              />

            </div>
          </div>

          <div>
            <button @click.once="isPopupVisible = true" class="submit" type="submit">Submit</button>
            <Popup :show="isPopupVisible" @update:show="isPopupVisible = $event">
            </Popup>
          </div>

        </form>

      </div>
    </div>
  </div>
</template>

<style scoped>

.container {
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 1300px;
  box-shadow: rgba(149, 157, 165, 0.3) 0 8px 24px;

}

@media (max-width: 1200px) {
  .container {
    margin: 3rem 0;
    width: 100%;
  }
}

.form-header {
  width: 100%;
  text-align: center;
  margin: 0;
  padding: .5rem 0;
  background-color: var(--text-light-color);
  border: none;
  outline: none;
  font-size: 1.5rem;
  color: var(--primary-color);
}

.container .box-form {
  width: 90%;
  margin: 0 auto;
  padding: 1rem 0;
}

@media (max-width: 1200px) {
  .container div {
    display: block;
  }
}

.form-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0.5rem 1rem;
}

.info {
  flex-basis: calc(50% - 10px);
  box-sizing: border-box;
  display: block;
}

.form-container .question-title {
  font-size: 1rem;
  color: var(--primary-hover-color);
}

.form-container input,
.form-container select {
  width: 100%;
  padding: .5rem 1rem;
  border: 2px solid var(--text-light-color);
  border-radius: 5px;
  outline: none;
}

.error {
  color: red;
  font-size: 1rem;
}

.submit {
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  padding: .5rem 2rem;
  font-size: 1.2rem;
  border-radius: 1rem 0;
  background-color: var(--primary-hover-color);
  color: var(--text-hover-color);
}

.submit:hover {
  background-color: var(--primary-color);
  transition: .3s ease-in-out;
}


</style>
