<template>
  <label for="" class="form-label text-gray" v-if="label"
    >{{ label }}
    <span class="text-danger" v-if="required">*</span>
  </label>
  <div class="input-group date" :id="pid" data-target-input="nearest">
    <input
      :modelValue="modelValue"
      :value="fakeValue"
      type="text"
      class="form-control datetimepicker-input"
      :data-target="'#' + pid"
      @change="handleChange($event.target.value)"
      v-bind="$attrs"
    />

    <div class="input-group-text" :data-target="'#' + pid">
      <i class="bi bi-calendar"></i>
    </div>

    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, defineModel } from "vue";
import { slashDtoDashY, changeTimestampToDate } from "../../assets/js/func";
import moment from "moment";

const fakeValue = ref("");
const emit = defineEmits();
const props = defineProps({
  label: "",
  pid: "",
  required: Boolean,
  displayValue: {
    type: String,
    default: "",
  },
  format: {
    type: String,
    default: "dd/MM/yyyy",
  },
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
      format: props.format,
      locale: "th-TH",
    },
    useCurrent: false,
  });

  initFirstValue()
});


function initFirstValue() {
  if (props.modelValue) {
    fakeValue.value = changeTimestampToDate(props.modelValue)
  }
}

function convertEra(strDate) {
  let dateMomentObject = moment(strDate, "DD/MM/YYYY"); // 1st argument - string, 2nd argument - format
  let dateObject = dateMomentObject.toDate(); // convert moment.js object to Date object
  let formatted = dateObject.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatted;
}

function handleChange(val) {
  if (!val) {
    fakeValue.value = "";
    emit("update:modelValue", "");
    return;
  }

  const newDate = convertEra(val);
  fakeValue.value = newDate;
  emit("update:modelValue", slashDtoDashY(newDate));
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
