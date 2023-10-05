<!--
 InternData
 Display intern's information detail
 Author : Rawich Piboonsin
 Created date : 14-09-2566
-->

<template>
    <div class="row mb-3">

        <LayoutMenu class="mb-3" :name="intern.intn_name_th" />

        <div class="row position-relative">
            <a id="editButton" class="btn btn-sm rounded-circle col-auto top-0 end-0 position-absolute"
                @click="isEdit = !isEdit, editData()">
                <svg class="" width="27" height="32" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.05878 10.4102H5.70585C4.45778 10.4102 3.26083 10.9059 2.37831 11.7885C1.49579 12.671 1 13.8679 1 15.116V36.2923C1 37.5404 1.49579 38.7374 2.37831 39.6199C3.26083 40.5024 4.45778 40.9982 5.70585 40.9982H26.8822C28.1303 40.9982 29.3272 40.5024 30.2097 39.6199C31.0922 38.7374 31.588 37.5404 31.588 36.2923V33.9394"
                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M29.2361 5.7061L36.2949 12.7649M39.5537 9.43549C40.4804 8.5088 41.001 7.25194 41.001 5.9414C41.001 4.63086 40.4804 3.37399 39.5537 2.4473C38.627 1.52061 37.3701 1 36.0596 1C34.7491 1 33.4922 1.52061 32.5655 2.4473L12.7656 22.1766V29.2354H19.8244L39.5537 9.43549Z"
                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </a>
        </div>

        <InternDetail v-if="!isEdit" :intern="intern" class="mt-3" />

        <EditInternData v-if="isEdit" :intern="intern" :cancel-edit="cancelEdit" class="mt-3" />

    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import LayoutMenu from './LayoutMenu.vue'
import apiService from '../../services/api'
import { formatDate, getAgeBuddisht } from '../../assets/js/func'
import EditInternData from './EditInternData.vue'
import InternDetail from './InternDetail.vue'

const intern = ref({})
const route = useRoute()
const id = route.params.id
const isEdit = ref(false)
const apiCall = new apiService()

function cancelEdit() {
    isEdit.value = false
    editData()
}

function editData() {
    let editButton = document.getElementById("editButton")

    if (isEdit.value) {

        editButton.classList.remove("rounded-custom")
        editButton.classList.add("rounded-active")

    } else if (!isEdit.value) {

        editButton.classList.add("rounded-custom")
        editButton.classList.remove("rounded-active")
    }
}

onMounted(async () => {
    intern.value = await apiCall.getInternById(id);
})
</script>

<style scoped>
hr {
    border: none;
    height: 1px;
    background-color: var(--main-color);
}
</style>