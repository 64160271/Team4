<template>
  <label for="" class="row">{{ addressdd.house_number }}</label>
  <div class="col">
    <input
      v-model="addressdd.house_number"
      class="form-control"
      type="text"
      name=""
      id=""
      :class="{ 'is-invalid': v$.address.house_number.$error }"
    />
    <span
      v-for="error in v$.address.house_number.$errors"
      :key="error.$uid"
      class="invalid-feedback"
    >
      กรุณากรอกข้อมูล
    </span>
  </div>
  <button class="ms-3 btn btn-success" @click="validate()">ส่ง</button>

  <BaseSelect
    label="test"
    :options="opt"
    value="id"
    text="name"
    v-model="form"
    :set-default="true"
    :class="{ 'is-invalid': v$.form.$error }"
  />
  <InvalidFeedback :errors="v$.form.$errors" />

  <BaseInput
    v-model="addressdd.house_number"
    label="ทดสอบจ้า"
    :required="true"
    placeholder="placeholder ..."
    :class="{ 'is-invalid': v$.address.house_number.$error }"
  />
  <InvalidFeedback :errors="v$.address.house_number.$errors" />

  <img :src="'data:image/png;base64,'+ image" alt="">
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useInternFormData } from "../../stores/addInternFormData";
import useVuelidate from "@vuelidate/core"; // validate
import { required } from "@vuelidate/validators"; // validate
import BaseCard from "../Component/BaseCard.vue";
import BaseInput from "../Component/BaseInput.vue";
import BaseSelect from "../Component/BaseSelect.vue";
import InvalidFeedback from "../Component/InvalidFeedback.vue";
import { useGenderData } from "../../stores/constData";
import axios from 'axios'

const form = ref(String(""));
const formData = useInternFormData();
const addressdd = ref(formData.address);
const workInfo = ref(formData.work_info);
const gender = ref(useGenderData());
const rules = ref({
  address: {
    house_number: { required },
  },
  form: { required },
});

const opt = ref([
  { id: 2, name: "tttt" },
  { id: 3, name: "ssdf" },
  { id: 1, name: "werwer" },
  { id: 56, name: "sdfsdf" },
  { id: 5, name: "sdfdfs" },
]);

const v$ = useVuelidate(rules, formData);
const image = ref('')

async function validate() {
  const result = await v$.value.$validate();
}

onMounted(async () => {
  console.log(gender.value.list);
});
</script>

<style scoped></style>
