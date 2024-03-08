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

  <DatePicker placeholder="เพลส" pid="d1" label="ลาเบล" v-model="d1" />
  <DatePicker pid="d2" label="gg" v-model="d2" />

  <BaseInput
    v-model="addressdd.house_number"
    label="ทดสอบจ้า"
    :required="true"
    placeholder="placeholder ..."
    :class="{ 'is-invalid': v$.address.house_number.$error }"
  />
  <InvalidFeedback :errors="v$.address.house_number.$errors" />

  <DataTable striped :heads="heads" :items="sections" :total="sections.length">
    <template #action="{ data }">
      <BaseButton class="sm" label="แก้ไข" @click="console.log(data)" />
    </template>
  </DataTable>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useInternFormData } from "../../stores/addInternFormData";
import useVuelidate from "@vuelidate/core"; // validate
import { required } from "@vuelidate/validators"; // validate
import BaseCard from "../Component/BaseCard.vue";
import BaseInput from "../Component/BaseInput.vue";
import BaseSelect from "../Component/BaseSelect.vue";
import BaseButton from "../Component/BaseButton.vue";
import InvalidFeedback from "../Component/InvalidFeedback.vue";
import { useGenderData } from "../../stores/constData";
import DataTable from "../Component/DataTable.vue";
import apiService from "../../services/api";
import DatePicker from "../Component/DatePicker.vue";

const d1 = ref("13/03/2566")
const d2 = ref()
const apiCall = new apiService();
const form = ref(String(""));
const sections = ref([]);
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

const heads = ref([
  { key: "mentors[0].ment_lname", title: "ชื่อพี่เลี้ยง" },
  { key: "sec_name", title: "ชื่อฝ่าย" },
  { key: "sec_created_at", title: "วันที่สร้างฝ่าย" },
  { key: "action", title: "แก้ไข", align: "center" },
]);

const opt = ref([
  { id: 2, name: "tttt" },
  { id: 3, name: "ssdf" },
  { id: 1, name: "werwer" },
  { id: 56, name: "sdfsdf" },
  { id: 5, name: "sdfdfs" },
]);

const v$ = useVuelidate(rules, formData);
const image = ref("");

async function validate() {
  console.log(d1.value)
  const result = await v$.value.$validate();
}

onMounted(async () => {
  sections.value = await apiCall.getSectionWithMentor();
});
</script>

<style scoped></style>
