<template>
  <div class="auto">
    <label for="" class="form-label text-gray" v-if="label"
      >{{ label }}
      <span class="text-danger" v-if="required">*</span>
    </label>

    <div ref="root">
      <input
        :modelValue="modelValue"
        :type="input_type"
        class="form-control"
        :required="required"
        @input="handleChange"
        @focus="handleFocus"
        v-bind="$attrs"
        :placeholder="placeholder"
      />
      <ul v-if="open" class="mt-1 results">
        <li @click="handleSelect(item)" v-for="item in items" class="result ps-2 py-1">
          {{ _.get(item, itemText) || item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import _ from "lodash";

const root = ref(null);
const open = ref(false);
const emit = defineEmits(["search", "update:modelValue", "return"]);
const props = defineProps({
  label: {
    type: [Boolean, String],
  },
  placeholder: {
    type: [Boolean, String],
  },
  modelValue: {
    type: [Boolean, String],
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  input_type: {
    type: String,
    default: "text",
  },
  items: {
    type: Array,
    default: [],
  },
  itemText: {
    type: String,
    default: "",
  },
});

/*
 * updatedValue
 * Update ค่า modelValue และส่งไปยัง Component ที่เรียกใช้
 * param: -
 * return: null
 */
function handleChange() {
  if (props.items[0]) {
    open.value = true;
  }

  emit("update:modelValue", event.target.value);
  emit("search");
}

function handleFocus() {
  document.addEventListener("click", handleClickOutside);
  open.value = true;
}

function handleSelect(item) {
  open.value = false;
  emit("update:modelValue", item || null);
  emit("return", item || null);
  document.removeEventListener("click", handleClickOutside);
}

function handleClickOutside() {
  if (!root.value?.outerHTML.includes(event.target.outerHTML)) {
    open.value = false;
    document.removeEventListener("click", handleClickOutside);
  }
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

.auto {
  position: relative;
}

.results {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: absolute;
  left: 0;
  right: 0;
  padding: 0;
  margin: 0;
  border: 1px solid #f1f2f3;
  background-color: white;
  min-height: 1em;
  max-height: 14em;
  overflow: auto;
  z-index: 100;
}

.result {
  list-style: none;
  text-align: left;
  cursor: pointer;
}

.result:hover {
  background-color: #563de6;
  color: white;
}
</style>
