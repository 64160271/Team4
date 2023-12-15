<template>
    <div class="row mb-3">
        <LayoutMenu />

        <div class="row mb-3">
            <CardInternInfo :internId="internId">
                
            </CardInternInfo>
        </div>

        <div class="row mb-3">
            <BaseButton class="col-md-2 ms-auto" label="+ เพิ่มข้อมูล">
            
            </BaseButton>
        </div>

        <div class="row">
            <DataTable :heads="tableHead" :items="documents">
                <template #open_file="{ data }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                        class="bi bi-file-earmark cursor-p" viewBox="0 0 16 16" @click="showDocumentFile(data.doc_id)">
                        <path
                            d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
                    </svg>
                </template>
                <template #delete_file>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                        class="bi bi-trash-fill cursor-p" viewBox="0 0 16 16">
                        <path
                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg>
                </template>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import LayoutMenu from "./LayoutMenu.vue";
import apiService from "../../services/api";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import DataTable from "../Component/DataTable.vue";
import { getImageFromBuffer2 } from "../../assets/js/func";
import CardInternInfo from "./CardInternInfo.vue";
import BaseButton from "../Component/BaseButton.vue";

const internId = useRoute().params.id;
const documents = ref([]);
const apiCall = new apiService();
const file = ref({});
const modal = ref();
const tableHead = ref([
    { key: "doc_title", title: "ชื่อไฟล์" },
    { key: "doc_file.file_type", title: "ประเภทไฟล์" },
    { key: "doc_created_at", title: "วันที่อัปโหลดไฟล์", align: 'center' },
    /* { key: "lvs_day", title: "ผู้ทำการแก้ไข" }, */
    { key: "open_file", title: "เปิดไฟล์", align: 'center' },
    { key: "delete_file", title: "ลบไฟล์", align: 'center' },
]
);

onMounted(async () => {
    documents.value = await apiCall.getDocumentByInternId(internId);
    /* modal.value = new bootstrap.Modal("#modal", {}); */
});

async function showDocumentFile(id) {
    file.value = await apiCall.getDocumentFile(id).then((file) => {
        return getImageFromBuffer2(file.file_type, file.file_image.data)
    })

    let img = new Image()
    img.src = file.value
    let win = window.open("")
    win.document.write(img.outerHTML)
}

function formSubmit() {
    console.log(formData.value);
}

function openModal() {
    modal.value.show();
}

function closeModal() {
    modal.value.hide();
}
</script>

<style scoped></style>