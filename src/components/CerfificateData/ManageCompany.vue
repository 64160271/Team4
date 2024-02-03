<!--
    AddInternForm
    Parent of module add intern by form
    Author : keetapong Rodjanavichai
    Created date : 21-10-2566
-->
<template>
    <LayoutMenuName page-name="จัดการข้อมูลเอกสารรับรอง > บริษัท" />
    <div class="header me-1">
        <div class="bx_nav" style="display: flex;">
            <div class="col-md-4 my-auto">
                <div class="input-group">
                    <span class="bg-grays-200 input-group-text" id="basic-addon1" style="height: 37.6px">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-search" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </span>
                    <input v-model="searchData" type="text" id="search-bar" class="bg-grays-200 form-control"
                        placeholder="Search" aria-label="" aria-describedby="basic-addon1">
                </div>
            </div>

            <div class="bnav_btn" style="margin-left: 59.5%;">
                <BaseButton @click="openCreateModel = true" label="เพิ่มข้อมูล" />
            </div>
        </div>

        <BaseModal v-if="openCreateModel" @save="submitForm" @close="openCreateModel = false" title="เพิ่มข้อมูลบริษัท">
            <BaseInput label="ชื่อบริษัท" input_type="text" v-model="companyData.com_name" placeholder="ชื่อบริษัท"
                required="required" />

            <div class="box_input" style="display: flex; margin: 10px 0px 10px 0px;">
                <div class="bx1" style="margin-right: 40px;">
                    <BaseInput label="เลขที่" input_type="text" v-model="companyData.addr_house_number"
                        placeholder="เลขที่" />
                </div>

                <div class="bx2">
                    <BaseInput label="หมู่" input_type="text" v-model="companyData.addr_village_number"
                        placeholder="เลขที่" />
                </div>
            </div>

            <div class="box_input" style="display: flex; margin: 10px 0px 10px 0px;">
                <div class="bx1">
                    <BaseInput label="ตรอก" input_type="text" v-model="companyData.addr_alley" placeholder="ตรอก" />
                </div>

                <div class="bx2" style="margin-left: 40px;">
                    <BaseInput label="ถนน" input_type="text" v-model="companyData.addr_street" placeholder="ถนน" />
                </div>
            </div>

            <div class="box_input" style="display: flex; margin: 10px 0px 10px 0px;">
                <div class="bx1">
                    <BaseInput label="ตำบล/แขวง" input_type="text" v-model="companyData.addr_subdistrict"
                        placeholder="ตำบล/แขวง" required="required" />
                </div>

                <div class="bx2" style="margin-left: 40px;">
                    <BaseInput label="อำเภอ/เขต" input_type="text" v-model="companyData.addr_district"
                        placeholder="อำเภอ/เขต" required="required" />
                </div>
            </div>

            <BaseInput label="สาขา(ชื่อจังหวัด)" input_type="text" v-model="companyData.addr_province"
                placeholder="สาขา(ชื่อจังหวัด)" required="required" />

            <BaseInput label="เลขไปรษณีย์" input_type="text" v-model="companyData.addr_post_code" placeholder="เลขไปรษณีย์"
                required="required" />
        </BaseModal>
    </div>

    <div class="content_card" style="display: flex; flex-wrap: wrap; width: 100%;">
        <BaseCard v-for="Company in companies" class="outline-card mt-5" :title=Company.com_name
            :sub=Company.com_address.addr_province>
            <template #after-title>
                <div class="text_content">
                    {{ Company.com_address.addr_house_number }}
                    {{ Company.com_address.addr_village_number }}
                    {{ Company.com_address.addr_subdistrict }}
                    {{ Company.com_address.addr_district }}
                    {{ Company.com_address.addr_province }}
                    {{ Company.com_address.addr_post_code }}
                </div>
                <button class="stroke_edit position-absolute top-0 end-0 m-1 p-1 w-25 h-25 border-0"
                    style="border-radius: 50px; background-color: white;" @click="openEditModel2(Company)">
                    <EditIcon />
                </button>
            </template>
        </BaseCard>
    </div>

    <BaseModal v-if="openEditModel" @save="submitFormedit" @close="openEditModel = false" title="แก้ไขข้อมูลบริษัท">
        <BaseInput label="ชื่อบริษัท" input_type="text" :value="editedCompany.com_name" v-model="editedCompany.com_name"
            placeholder="ชื่อบริษัท" required="required" />

        <div class="box_input" style="display: flex; margin: 10px 0px 10px 0px;">
            <div class="bx1" style="margin-right: 40px;">
                <BaseInput label="เลขที่" input_type="text" :value="editedCompany.com_address.addr_house_number"
                    v-model="editedCompany.com_address.addr_house_number" placeholder="เลขที่" />
            </div>

            <div class="bx2">
                <BaseInput label="หมู่" input_type="text" :value="editedCompany.com_address.addr_village_number"
                    v-model="editedCompany.addr_village_number" placeholder="เลขที่" />
            </div>
        </div>

        <div class="box_input" style="display: flex; margin: 10px 0px 10px 0px;">
            <div class="bx1">
                <BaseInput label="ตรอก" input_type="text" :value="editedCompany.com_address.addr_alley"
                    v-model="editedCompany.addr_alley" placeholder="ตรอก" />
            </div>

            <div class="bx2" style="margin-left: 40px;">
                <BaseInput label="ถนน" input_type="text" :value="editedCompany.com_address.addr_street"
                    v-model="editedCompany.addr_street" placeholder="ถนน" />
            </div>
        </div>

        <div class="box_input" style="display: flex; margin: 10px 0px 10px 0px;">
            <div class="bx1">
                <BaseInput label="ตำบล/แขวง" input_type="text" :value="editedCompany.com_address.addr_subdistrict"
                    v-model="editedCompany.addr_subdistrict" placeholder="ตำบล/แขวง" required="required" />
            </div>

            <div class="bx2" style="margin-left: 40px;">
                <BaseInput label="อำเภอ/เขต" input_type="text" :value="editedCompany.com_address.addr_district"
                    v-model="editedCompany.addr_district" placeholder="อำเภอ/เขต" required="required" />
            </div>
        </div>

        <BaseInput label="สาขา(ชื่อจังหวัด)" input_type="text" :value="editedCompany.com_address.addr_province"
            v-model="editedCompany.addr_province" placeholder="สาขา(ชื่อจังหวัด)" required="required" />

        <BaseInput label="เลขไปรษณีย์" input_type="text" :value="editedCompany.com_address.addr_post_code"
            v-model="editedCompany.addr_post_code" placeholder="เลขไปรษณีย์" required="required" />
    </BaseModal>
</template>

<script setup>
import apiService from '../../services/api';
import BaseCard from '../Component/BaseCard.vue';
import BaseModal from '../Component/BaseModal.vue';
import BaseInput from '../Component/BaseInput.vue';
import BaseButton from '../Component/BaseButton.vue';
import EditIcon from '../icons/EditIcon.vue';
import Swal from "sweetalert2";
import { ref, onMounted, reactive } from 'vue';

const apiCall = new apiService();
const companies = ref([])
const company = ref([])

const openCreateModel = ref(false);
const openEditModel = ref(false);

const companyData = ref({
    com_name: '',
    addr_house_number: '',
    addr_village_number: '',
    addr_alley: '',
    addr_street: '',
    addr_subdistrict: '',
    addr_district: '',
    addr_province: '',
    addr_post_code: '',
})

async function submitForm() {
    await apiCall.createCompany(companyData.value)
        .then(() => {
            Swal.fire({
                icon: 'success',
                text: 'บันทึกข้อมูลเสร็จสิ้น',
                showConfirmButton: false,
                timer: 3000
            }).then(() => {
                // router.push({ name: 'index' })
            })
        })
        .catch(error => {
            if (error.response && error.response.status === 400 && error.response.data === 'Company name already exists.') {
                Swal.fire({
                    icon: 'error',
                    text: 'มีข้อมูลบริษัทนี้อยู่แล้ว',
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    text: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
                    showConfirmButton: true,
                });
            }
        });
}

async function submitFormedit() {
    await apiCall.updateCompany(editedCompany.value)
        .then(() => {
            Swal.fire({
                icon: 'success',
                text: 'แก้ไขข้อมูลสำเร็จ',
                showConfirmButton: false,
                timer: 3000
            }).then(() => {
                // router.push({ name: 'index' })
            })
        })
}

// เพิ่ม ref สำหรับเก็บข้อมูลบริษัทที่จะแก้ไข
const editedCompany = reactive({
    com_name: '',
    com_address: {
        addr_house_number: '',
        addr_village_number: '',
        addr_alley: '',
        addr_street: '',
        addr_subdistrict: '',
        addr_district: '',
        addr_province: '',
        addr_post_code: '',
    },
});

// ฟังก์ชันที่เรียกเมื่อปุ่ม Edit ถูกคลิก
const openEditModel2 = (company) => {
    Object.assign(editedCompany, {
        com_name: company?.com_name,
        com_address: {
            addr_house_number: company.com_address?.addr_house_number,
            addr_village_number: company.com_address?.addr_village_number,
            addr_alley: company.com_address?.addr_alley,
            addr_street: company.com_address?.addr_street,
            addr_subdistrict: company.com_address?.addr_subdistrict,
            addr_district: company.com_address?.addr_district,
            addr_province: company.com_address?.addr_province,
            addr_post_code: company.com_address?.addr_post_code,
        }
    });
    openEditModel.value = true;
};

onMounted(async () => {
    companies.value = await apiCall.getCompanyWithAddress()
})

onMounted(async () => {
    company.value = await apiCall.getAllCompany()
})


</script>
