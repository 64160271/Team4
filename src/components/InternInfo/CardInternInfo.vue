<template>
  <div class="card shadow-sm border-0">
    <div class="card-body row">
      <div class="col-lg-3 text-center">
        <img id="blah" :src="internData.intn_image_path" alt="" class="img bg-grays-200" />
      </div>

      <div class="col-md-8 align-self-center">
        <div class="row mb-2">
          <label for="" class="col-md-3 col-form-label text-gray">
            รหัสนักศึกษาฝึกงาน
          </label>
          <label for="" class="col-md-3 col-form-label text-gray"> 
            {{ internData.intn_code }} 
          </label>

          <label for="" class="col-md-3 col-form-label text-gray"> 
            ชื่อ-นามสกุล 
          </label>
          <label for="" class="col-md-3 col-form-label text-gray"> 
            {{ internData.intn_name }} 
          </label>
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
  internId: [Number, String, Boolean]
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

<style scoped></style>
