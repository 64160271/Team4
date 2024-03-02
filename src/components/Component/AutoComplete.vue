<template>
    <div class="auto">
        <label for="" class="form-label text-gray" v-if="label">{{ label }}
            <span class="text-danger" v-if="required">*</span>
        </label>
        
            <input 
                :modelValue="modelValue" 
                :type="input_type" 
                class="form-control" 
                :required="required"
                @input="handleChange"
                @focus="open = true" 
                @blur="handleBlur"
                v-bind="$attrs" 
                :placeholder="placeholder" 
            />
            <ul v-if="open" class="mt-1 results">
                <li @click="handleBlur(item)" v-for="item in items" class="result ps-2 py-1">
                    {{ _.get(item, itemText) || item }}
                </li>
            </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import _ from 'lodash'

const open = ref(false)
const emit = defineEmits(['search', 'update:modelValue'])
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
    default: []
  },
  itemText: {
    type: String,
    default: ""
  }
});

/*
 * updatedValue
 * Update ค่า modelValue และส่งไปยัง Component ที่เรียกใช้
 * param: -
 * return: null
 */
function handleChange() {
    if (props.items[0]) {
        open.value = true
    }

    emit('update:modelValue', event.target.value)
    emit('search')
}

function handleBlur(item) {
    console.log(item)
    handleSelect(item)
    open.value = false
}

function handleSelect(item) {
    emit('update:modelValue', item || null)
}
</script>

<style scoped>
input:focus {
  transition: 0s;
  box-shadow: none;
  outline: 2px solid rgb(0, 119, 255) !important;
  border: 1px solid white !important;
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