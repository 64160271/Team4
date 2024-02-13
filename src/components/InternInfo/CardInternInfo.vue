<template>
  <div class="card shadow-sm border">
    <div class="card-body row">
      <div class="col-lg-3 text-center">
        <img
          id="blah"
          :src="internData?.intn_image_path || '../../src/assets/images/person-nm.png'"
          alt=""
          class="img bg-grays-200"
        />
      </div>

      <div class="col-md-8 align-self-center">
        <div class="row mb-2">
          <label for="" class="col-md-3 col-form-label text-gray">
            รหัสนักศึกษาฝึกงาน
          </label>
          <label for="" class="col-md-3 col-form-label text-gray">
            {{ internData?.intn_code }}
          </label>

          <label for="" class="col-md-3 col-form-label text-gray"> ชื่อ-นามสกุล </label>
          <label for="" class="col-md-3 col-form-label text-gray">
            {{ internData?.intn_name }}
          </label>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useInternName } from "../../stores/constData";
import axios from "axios";

const internData = ref();

const props = defineProps({
  internId: [Number, String, Boolean],
});

onMounted(async () => {
  if (useInternName().getId == props.internId) {
    internData.value = useInternName();
    return;
  }

  await axios
    .get(`${import.meta.env.VITE_API_HOST}/interns/personal/${props.internId}`)
    .then((response) => {
      internData.value = useInternName();
      internData.value.setData(response.data);
    });
});
</script>

<style scoped></style>
