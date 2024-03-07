<template>
  <label for="" class="form-label text-gray" v-if="label"
    >{{ label }}
    <span class="text-danger" v-if="required">*</span>
  </label>
  <div class="input-group date" :id="pid" data-target-input="nearest">
    <input
      :modelValue="modelValue"
      type="text"
      class="form-control datetimepicker-input"
      :data-target="'#'+pid"
      @change="handleChange($event.target.value)"
      v-bind="$attrs"
    />
    <div class="input-group-text" :data-target="'#'+pid">
      <i class="bi bi-calendar"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { slashDtoDashY } from "../../assets/js/func";

const emit = defineEmits()
const props = defineProps({
  label: "",
  pid: "",
  modelValue: {
    type: [Boolean, String],
    default: false,
  },
});

onMounted(() => {
  let el = document.getElementById(props.pid);
  let picker = new tempusDominus.TempusDominus(el, {
    defaultDate: undefined,
    display: {
      components: {
        clock: false,
        hours: false,
        minutes: false,
        seconds: false,
        useTwentyfourHour: undefined,
      },
      keepOpen: true,
      buttons: {
        clear: true,
      },
    },
    localization: {
      format: "dd/MM/yyyy",
      locale: 'th'
    },
    useCurrent: false,
  });
});

function handleChange(val) {
    console.log(val)
    emit('update:modelValue', val)
}
</script>

<style scoped>
input:focus {
  transition: 0s;
  box-shadow: none;
  outline: 2px solid rgb(0, 119, 255) !important;
  border: 1px solid white !important;
}

.is-invalid:focus {
  transition: 0s;
  box-shadow: none;
  border: 1px solid red !important;
  outline: 1px solid rgb(255, 0, 0) !important;
}
</style>
