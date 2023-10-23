<template>
    <LayoutMenuName page-name="จัดการข้อมูลเอกสารรับรอง > บริษัท" />
    <div class="header me-1">
        <div class="col-md-4 my-auto">
            <div class="input-group">
                <span class="bg-grays-200 input-group-text" id="basic-addon1" style="height: 37.6px">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                        viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </span>
                <input v-model="searchData" type="text" id="search-bar" class="bg-grays-200 form-control"
                    placeholder="Search" aria-label="" aria-describedby="basic-addon1">
            </div>
        </div>

        <button class="btn_add ms-auto" data-bs-toggle="modal" data-bs-target="#addcompany">
            เพิ่มข้อมูล
        </button>

        <!-- <BaseModal>
            <div class="content-body" style="width: 60%; margin: 0% 20% 5% 20%;">
                <label for="exampleInputEmail1" class="form-label">ชื่อบริษัท</label>
                <input class="form-control" type="text" placeholder="ชื่อบริษัท" aria-label="default input example">

                <label for="exampleInputEmail1" class="form-label">สาขา</label>
                <input class="form-control" type="text" placeholder="สาขา" aria-label="default input example">

                <label for="exampleInputEmail1" class="form-label">ที่อยู่</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                    placeholder="เลขที่ 22/14-15 ถนนบางแสนสาย 4 เหนือ ตำบลแสนสุข อำเภอเมืองชลบุรี จังหวัดชลบุรี 20130"
                    aria-label="default input example"></textarea>
            </div>
        </BaseModal> -->

        <div class="modal" id="addcompany" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body" style="width: 100%;">
                        <div class="content-body" style="width: 60%; margin: 10% 20% 5% 20%;">
                            <label for="exampleInputEmail1" class="form-label">ชื่อบริษัท</label>
                            <input class="form-control" type="text" placeholder="ชื่อบริษัท"
                                aria-label="default input example">

                            <label for="exampleInputEmail1" class="form-label">สาขา</label>
                            <input class="form-control" type="text" placeholder="สาขา" aria-label="default input example">

                            <label for="exampleInputEmail1" class="form-label">ที่อยู่</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                placeholder="เลขที่ 22/14-15 ถนนบางแสนสาย 4 เหนือ ตำบลแสนสุข อำเภอเมืองชลบุรี จังหวัดชลบุรี 20130"
                                aria-label="default input example"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary w-25" data-bs-dismiss="modal">ยกเลิก</button>
                        <button type="button" class="btn btn-outline-danger w-25" data-bs-toggle="modal"
                            data-bs-target="#comfirmcompany">บันทึก</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="comfirmcompany" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body" style="width: 100%;">
                        <div class="content-body" style="width: 60%; margin: 30% 0% 20% 20%;">
                            <center><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                                    class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16" style="fill: yellow;">
                                    <path
                                        d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg></center>
                            <p>
                                <center style="font-size: 25px;">คุณต้องการบันทึกข้อมูลหรือไม่</center>
                            </p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary w-25" data-bs-dismiss="modal">ยกเลิก</button>
                        <button type="button" class="btn btn-outline-danger w-25" data-bs-toggle="modal"
                            data-bs-target="#successcompany">บันทึก</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="successcompany" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body" style="width: 100%;">
                        <div class="content-body" style="width: 60%; margin: 30% 0% 17.5% 20%;">
                            <center>
                                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor"
                                    class="bi bi-check-circle-fill" viewBox="0 0 16 16"
                                    style="fill: green; margin-bottom: 20px;">
                                    <path
                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </svg>
                            </center>
                            <p>
                                <center style="font-size: 25px;">บันทึกข้อมูลเสร็จสิ้น</center>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="content_card" style="display: flex; flex-wrap: wrap; width: 100%;">
        <BaseCard v-for="Company in companies" class="outline-card mt-5" style="width: 30%; margin-right: 3%;"
            :title=Company.com_name :sub=Company.com_address.addr_province>
            <div class="text_content">
                {{ Company.com_address.addr_house_number }}
                {{ Company.com_address.addr_village_number }}
                {{ Company.com_address.addr_subdistrict }}
                {{ Company.com_address.addr_district }}
                {{ Company.com_address.addr_province }}
                {{ Company.com_address.addr_post_code }}
            </div>
            <button class="stroke_edit position-absolute top-0 end-0 m-1 p-1 w-25 h-25 border-0" style="border-radius: 50px; background-color: white;">
                <EditIcon data-bs-toggle="modal"
                data-bs-target="#edit-company" />
            </button>
        </BaseCard>
    </div>

    <div class="modal" id="edit-company" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body" style="width: 100%;">
                    <div class="content-body" style="width: 60%; margin: 10% 20% 5% 20%;">
                        <label for="exampleInputEmail1" class="form-label">ชื่อบริษัท</label>
                        <input class="form-control" type="text" placeholder="ชื่อบริษัท" aria-label="default input example">

                        <label for="exampleInputEmail1" class="form-label">สาขา</label>
                        <input class="form-control" type="text" placeholder="สาขา" aria-label="default input example">

                        <label for="exampleInputEmail1" class="form-label">ที่อยู่</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                            placeholder="เลขที่ 22/14-15 ถนนบางแสนสาย 4 เหนือ ตำบลแสนสุข อำเภอเมืองชลบุรี จังหวัดชลบุรี 20130"
                            aria-label="default input example"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary w-25" data-bs-dismiss="modal">ยกเลิก</button>
                    <button type="button" class="btn btn-outline-danger w-25" data-bs-toggle="modal"
                        data-bs-target="#comfirm-edit-company">บันทึก</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="comfirm-edit-company" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body" style="width: 100%;">
                        <div class="content-body" style="width: 60%; margin: 30% 0% 20% 20%;">
                            <center><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                                    class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16" style="fill: yellow;">
                                    <path
                                        d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg></center>
                            <p>
                                <center style="font-size: 25px;">คุณต้องการบันทึกข้อมูลหรือไม่</center>
                            </p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary w-25" data-bs-dismiss="modal">ยกเลิก</button>
                        <button type="button" class="btn btn-outline-danger w-25" data-bs-toggle="modal"
                            data-bs-target="#success-company">บันทึก</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="success-company" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body" style="width: 100%;">
                        <div class="content-body" style="width: 60%; margin: 30% 0% 17.5% 20%;">
                            <center>
                                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor"
                                    class="bi bi-check-circle-fill" viewBox="0 0 16 16"
                                    style="fill: green; margin-bottom: 20px;">
                                    <path
                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </svg>
                            </center>
                            <p>
                                <center style="font-size: 25px;">บันทึกข้อมูลเสร็จสิ้น</center>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

</template>

<script setup>
import apiService from '../../services/api';
import BaseCard from '../Component/BaseCard.vue';
import EditIcon from '../icons/EditIcon.vue';
import BaseModal from '../Component/BaseModal.vue'
import { ref, onMounted } from 'vue';

const apiCall = new apiService();
const companies = ref([])

onMounted(async () => {
    companies.value = await apiCall.getCompanyWithAddress()
})

</script>

<style scoped>
input {
    margin-bottom: 5%;
}

.btn_add {
    background-color: white;
    border: 1px solid red;
    border-radius: 5px;
    color: red;
    width: 150px;
    height: 35px;
    outline: none;
}

.btn_add:hover {
    background-color: red;
    border: 1px solid white;
    border-radius: 5px;
    color: white;
    width: 150px;
    height: 35px;
    outline: none;
}

.card_sign {
    border: 1px solid black;
    width: 15rem;
    height: 18rem;
    border-radius: 20px;
    text-align: center;
}

.card-content {
    margin: 0rem 5px 0rem 5px;
}

.size_font_modal {
    font-size: 16px;
    font-weight: bold;
    margin-top: 15px;
    margin-left: 25%;
}

.size_input_modal {
    border: 1px solid black;
    border-radius: 5px;
    margin-left: 25%;
    margin-top: 10px;
}

.size_btn_modal {
    border: 1px solid black;
    border-radius: 20px;
    width: 150px;
    color: gray;
    background-color: white;
    /* margin-right: 3rem; */
}

.size_btn_modal_save {
    border: 1px solid black;
    border-radius: 20px;
    width: 150px;
    color: var(--main-color);
    border: 1px solid var(--main-color);
    background-color: white;
}

.size_btn_modal_save:hover {
    border: 1px solid black;
    border-radius: 20px;
    width: 150px;
    color: white;
    border: 1px solid var(--main-color);
    background-color: var(--main-color);
}

.stroke_edit {
    fill: black;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.stroke_edit:hover {
    fill: var(--main-color);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.outline-card {
    border: 1px solid black;
    color: black;
    border-radius: 33px;
}

.outline-card:hover {
    border: 1px solid var(--main-color);
    color: var(--main-color);
}

.header {
    display: flex;
    width: 90%;
}

.text_content {
    width: 80%;
    text-align: left;
    margin: 0 20px 40px 20px;
}

.modal-footer {
    display: flex;
    justify-content: space-between;
}
</style>
