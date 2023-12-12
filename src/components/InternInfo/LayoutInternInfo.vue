<template>
  <div class="row mx-auto my-3" style="width: 80%">
    <div class="col-auto">
      <img id="blah" :src="getImage()" alt="" class="img bg-grays-200" />
    </div>

    <div class="col ms-5 align-self-center">
      <div class="row mb-2 ms-2">
        <label for="" class="col-md-2 col-form-label text-gray">
          รหัสนักศึกษาฝึกงาน
        </label>
        <div class="col">
          <input
            placeholder="-"
            :value="code"
            type="text"
            class="form-control-plaintext"
            readonly
            required
          />
        </div>

        <label for="" class="col-md-2 col-form-label text-gray"> ชื่อ-นามสกุล </label>
        <div class="col">
          <input
            placeholder="-"
            :value="name"
            type="text"
            class="form-control-plaintext"
            readonly
            required
          />
        </div>
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  image: [String, Boolean],
  code: [String, Boolean],
  name: [String, Boolean],
});
</script>

<style scoped></style>
