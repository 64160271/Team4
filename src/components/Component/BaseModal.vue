<template>
    <div id="modal" class="modal" tabindex="-1" aria-hidden="true" v-show="open">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 id="exampleModalLabel" class="modal-title">{{ title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                    @click="$emit('close')"></button>
                </div>
                <div class="modal-body">
                    
                    <slot></slot>

                </div>
                <div class="modal-footer justify-content-center gap-4">
                    <button type="button" class="col-md-3 btn outline-gray" data-bs-dismiss="modal"
                    @click="$emit('close')">
                        ยกเลิก
                    </button>
                    <button type="button" class="col-md-3 btn outline-red" @click="$emit('save')">
                        บันทึก
                    </button>
                </div>
            </div>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer justify-content-center gap-4">
          <button
            type="button"
            class="col-md-3 btn outline-gray"
            data-bs-dismiss="modal"
            @click="$emit('close')"
          >
            ยกเลิก
          </button>
          <button type="button" class="col-md-3 btn outline-red" @click="$emit('save')">
            บันทึก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const modal = ref();

onMounted(() => {
  modal.value = new bootstrap.Modal("#modal", {});
  modal.value.show();
});

defineProps({
  open: Boolean,
  title: String,
});
</script>

<style scoped></style>
