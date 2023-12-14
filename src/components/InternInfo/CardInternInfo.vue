<template>
  <div class="card shadow-sm border-0">
    <div class="row mx-auto my-3" style="width: 80%">
      <div class="col-auto">
        <img id="blah" :src="internData.intn_image" alt="" class="img bg-grays-200" />
      </div>

      <div class="col ms-5 align-self-center">
        <div class="row mb-2">
          <label for="" class="col-md-3 col-form-label text-gray">
            รหัสนักศึกษาฝึกงาน
          </label>
          <div class="col-auto">
            <input placeholder="-" :value="internData.intn_code" type="text" class="form-control-plaintext" readonly
              required />
          </div>

          <label for="" class="col-md-3 col-form-label text-gray"> ชื่อ-นามสกุล </label>
          <div class="col-auto">
            <input placeholder="-" :value="internData.intn_name" type="text" class="form-control-plaintext" readonly
              required />
          </div>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useInternName } from '../../stores/constData';
import axios from 'axios';
import { getImageFromBuffer } from '../../assets/js/func';

const internData = ref(useInternName())

const props = defineProps({
  internId: [Number, Boolean]
})

onMounted(async () => {
  if (internData.value.intn_id == props.internId) {
    return
  }

  await axios.get(`${import.meta.env.VITE_API_HOST}/interns/personal/${props.internId}`)
    .then((response) => {
      internData.value.setData(response.data)
    })

})
</script>

<style scoped>
</style>
