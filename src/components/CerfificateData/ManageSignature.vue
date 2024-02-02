<template>
    <LayoutMenuName page-name="จัดการข้อมูลลายเซ็น" />

    <SectionSpace>
        <div class="row mb-4">
        <div class="col-md-4 my-auto">
            <SearchBox v-model="searchData" />
        </div>

        <BaseButton class="col-md-2 btn outline-red ms-auto" label="+ เพิ่มข้อมูล" @click="openModal = true" />
    </div>

    <div class="row mb-2">
        <BaseCard v-for="signature in signatures" title=" " :sub="signature.sign_fname + ' ' + signature.sign_lname"
            content="Senior Human Resources" class="mb-4" hover>
            <template #before-title>
                <EditIcon @click="edit(signature) && (openModal = true)" class="position-absolute top-0 end-0 m-2 cursor-p hov-outline-red" />
                <img width="150" height="110" :src="signature.sign_image_path" alt="">
            </template>
            <template #after-title>
                <span class="text-center">
                    {{ signature.sign_company?.com_name }}
                </span>
            </template>
        </BaseCard>
    </div>
    </SectionSpace>

    <BaseModal v-if="openModal == true" title="เพิ่มข้อมูลลายเซ็น" size="lg" @close="openModal = false"
            @save="submitForm">
            <div class="row mx-2">
                <div class="col">

                    <!-- แถวกรอกข้อมูลชื่อ -->
                    <div class="row mb-3">
                        <div class="col-md-3">
                            <BaseSelect 
                                label="คำนำหน้า" 
                                v-model="formData.sign_prefix" 
                                :options="prefix"
                                required
                                :class="{ 'is-invalid': v$.sign_prefix.$error }"
                            >
                            </BaseSelect>
                            <InvalidFeedback :errors="v$.sign_prefix.$errors" />
                        </div>
                        <div class="col">
                            <BaseInput 
                                label="ชื่อ" 
                                v-model="formData.sign_fname" 
                                placeholder="ชื่อ"
                                required
                                :class="{ 'is-invalid': v$.sign_fname.$error }"
                                >
                            </BaseInput>
                            <InvalidFeedback :errors="v$.sign_fname.$errors" />
                        </div>
                        <div class="col">
                            <BaseInput 
                                label="นามสกุล" 
                                v-model="formData.sign_lname" 
                                placeholder="นามสกุล"
                                required
                                :class="{ 'is-invalid': v$.sign_lname.$error }"
                                >
                            </BaseInput>
                            <InvalidFeedback :errors="v$.sign_lname.$errors" />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <BaseInput 
                                label="ตำแหน่ง" 
                                v-model="formData.sign_role" 
                                placeholder="ตำแหน่ง"
                                required
                                :class="{ 'is-invalid': v$.sign_role.$error }"
                                >
                            </BaseInput>
                            <InvalidFeedback :errors="v$.sign_role.$errors" />
                        </div>
                        <div class="col-md-6">
                            <BaseSelect
                                label="บริษัท"
                                v-model="formData.sign_company_id"
                                :options="companies"
                                text="com_name"
                                value="com_id"
                                required
                                :class="{ 'is-invalid': v$.sign_company_id.$error }"
                                >
                            </BaseSelect>
                            <InvalidFeedback :errors="v$.sign_company_id.$errors" />
                        </div>
                    </div>

                    <label for="inputImage" class="form-label text-gray">ไฟล์รูปภาพลายเซ็น <span class="text-danger">*</span></label>

                    <div class="row">
                        <div class="col text-center">
                            <button id="picture" type="button"
                                class="btn outline-red position-relative px-4 mb-3"
                                v-if="!formData.sign_image">
                                <input id="img-upload" type="file" accept="image/*" @change="showImg" />

                                <svg class="me-1" width="20" height="20" viewBox="0 0 42 42" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19.9474 36.5556H5.21053C4.09383 36.5556 3.02286 36.0873 2.23323 35.2538C1.44361 34.4203 1 33.2899 1 32.1111V12.1111C1 10.9324 1.44361 9.80191 2.23323 8.96841C3.02286 8.13492 4.09383 7.66667 5.21053 7.66667H7.31579C8.43249 7.66667 9.50345 7.19841 10.2931 6.36492C11.0827 5.53142 11.5263 4.40096 11.5263 3.22222C11.5263 2.63285 11.7481 2.06762 12.1429 1.65087C12.5377 1.23413 13.0732 1 13.6316 1H26.2632C26.8215 1 27.357 1.23413 27.7518 1.65087C28.1466 2.06762 28.3684 2.63285 28.3684 3.22222C28.3684 4.40096 28.812 5.53142 29.6017 6.36492C30.3913 7.19841 31.4622 7.66667 32.5789 7.66667H34.6842C35.8009 7.66667 36.8719 8.13492 37.6615 8.96841C38.4511 9.80191 38.8947 10.9324 38.8947 12.1111V19.8889"
                                        stroke="var(--main-color)" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path class="stroke-white"
                                        d="M34.6854 41.0026V27.6693M34.6854 27.6693L41.0012 34.3359M34.6854 27.6693L28.3697 34.3359M19.9486 27.6693C21.6237 27.6693 23.2301 26.9669 24.4145 25.7166C25.599 24.4664 26.2644 22.7707 26.2644 21.0026C26.2644 19.2345 25.599 17.5388 24.4145 16.2886C23.2301 15.0383 21.6237 14.3359 19.9486 14.3359C18.2736 14.3359 16.6671 15.0383 15.4827 16.2886C14.2982 17.5388 13.6328 19.2345 13.6328 21.0026C13.6328 22.7707 14.2982 24.4664 15.4827 25.7166C16.6671 26.9669 18.2736 27.6693 19.9486 27.6693Z"
                                        stroke="var(--main-color)" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                    อัปโหลดไฟล์
                            </button>
                        </div>
                    </div>

                    <div class="row" v-if="v$.sign_image.$error">
                        <span class="text-center" :class="{ 'is-invalid': v$.sign_image.$error }">
                            <InvalidFeedback :errors="v$.sign_image.$errors" />
                        </span>
                    </div>

                    <div class="row" v-if="formData.sign_image">
                        <div class="position-relative col-5 border border-dark rounded-3 py-2 mx-auto">
                            <div class="text-overflow-ellipsis mx-2">{{ formData.sign_image.name }}</div>
                            <div class="col position-absolute top-0 end-0 me-1 pointer" @click="formData.sign_image = ''">
                                X
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseModal>
</template>

<script setup>
import BaseButton from '../Component/BaseButton.vue';
import BaseCard from '../Component/BaseCard.vue';
import EditIcon from '../icons/EditIcon.vue';
import BaseModal from '../Component/BaseModal.vue';
import BaseInput from '../Component/BaseInput.vue';
import BaseSelect from '../Component/BaseSelect.vue'
import { ref } from 'vue';
import apiService from '../../services/api';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import SearchBox from "../Component/SearchBox.vue"
import useVuelidate from "@vuelidate/core"
import { required }  from "@vuelidate/validators"
import InvalidFeedback from "../Component/InvalidFeedback.vue"

const router = useRouter()
const openModal = ref(false)
const formData = ref({
    sign_prefix: '',
    sign_fname: '',
    sign_lname: '',
    sign_role: '',
    sign_company_id: '',
    sign_image: ''
})

const modalMode = ref('')
const prefix = ref(['นาย', 'นางสาว', 'นาง'])
const apiCall = new apiService()
const signatures = ref([])
const companies = ref([])
let signEditId = 0;

const rules = {
    sign_prefix: { required },
    sign_fname: { required },
    sign_lname: { required },
    sign_role: { required },
    sign_company_id: { required },
    sign_image: { required },
}
const v$ = useVuelidate(rules, formData.value)

async function submitForm() {
    const validate = await v$.value.$validate()

    if (validate) {
        if (modalMode.value == 'add') {
            await apiCall.createSignature(formData.value)
            router.go()
        } else if (modalMode.value == 'edit') {
            await apiCall.editSignature(formData.value, signEditId)
            router.go()
        }
    }
}

async function edit(signature) {
    signEditId = signature.sing_id;
    formData.value.sign_image = signature.sign_image;
    formData.value.sign_fname = signature.sign_fname;
    formData.value.sign_lname = signature.sign_lname;
    formData.value.sign_role = signature.sign_role;
    formData.value.sign_company_id = signature.sign_company_id;
    console.log(formData.value)

    /* แสดงรูปภาพในแบบฟอร์ม */
    /* let blah = document.getElementById("blah");
    if (blah) {
        blah.src = formData.value.uni_file;
    } */
    modalMode.value = "edit";
}

function showImg() {
    const imgUpload = document.getElementById("img-upload");

    if (imgUpload.files[0] != undefined) {
        formData.value.sign_image = imgUpload.files[0];
    }
}
onMounted(async () => {
    signatures.value = await apiCall.getAllSignatureWithCompany()
    companies.value = await apiCall.getAllCompany()
})


</script>

<style scoped>
.text-overflow-ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.pointer {
    cursor: pointer;
}
</style>