<!--
    AddInternForm
    Parent of module add intern by form
    Author : keetapong Rodjanavichai
    Created date : 21-10-2566
-->
<template>
  <LayoutMenuName page-name="จัดการข้อมูลเอกสารรับรอง > บริษัท" />
  <div class="header me-1">
    <div class="col-md-4 my-auto">
      <div class="input-group">
        <span
          class="bg-grays-200 input-group-text"
          id="basic-addon1"
          style="height: 37.6px"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            />
          </svg>
        </span>
        <input
          v-model="searchData"
          type="text"
          id="search-bar"
          class="bg-grays-200 form-control"
          placeholder="Search"
          aria-label=""
          aria-describedby="basic-addon1"
        />
      </div>
    </div>

    <button class="btn_add ms-auto" data-bs-toggle="modal" data-bs-target="#addcompany">
      เพิ่มข้อมูล
    </button>

    <div
      class="modal"
      id="addcompany"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body" style="width: 100%">
            <div class="content-body" style="width: 60%; margin: 10% 20% 5% 20%">
              <h1>
                <center><strong>เพิ่มข้อมูลบริษัท</strong></center>
              </h1>
              <label for="exampleInputEmail1" class="form-label">ชื่อบริษัท</label>
              <input
                class="form-control"
                type="text"
                placeholder="ชื่อบริษัท"
                aria-label="default input example"
                v-model="companyData.com_name"
                required
              />

              <div class="box1" style="display: flex; flex-wrap: wrap">
                <label for="exampleInputEmail1" class="form-label">เลขที่</label>
                <input
                  v-model="companyData.addr_house_number"
                  class="form-control"
                  type="text"
                  placeholder="เลขที่"
                  aria-label="default input example"
                  required
                />

                <label for="exampleInputEmail1" class="form-label">หมู่</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="หมู่"
                  aria-label="default input example"
                  v-model="companyData.addr_village_number"
                />
              </div>

              <div class="box1" style="display: flex; flex-wrap: wrap">
                <label for="exampleInputEmail1" class="form-label">ตรอก</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="ตรอก"
                  aria-label="default input example"
                  v-model="companyData.addr_alley"
                />

                <label for="exampleInputEmail1" class="form-label">ถนน</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="ถนน"
                  aria-label="default input example"
                  v-model="companyData.addr_street"
                />
              </div>

              <div class="box1" style="display: flex; flex-wrap: wrap">
                <label for="exampleInputEmail1" class="form-label">ตำบล/แขวง</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="ตำบล/แขวง"
                  aria-label="default input example"
                  v-model="companyData.addr_subdistrict"
                  required
                />

                <label for="exampleInputEmail1" class="form-label">อำเภอ/เขต</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="อำเภอ/เขต"
                  aria-label="default input example"
                  v-model="companyData.addr_district"
                  required
                />
              </div>

              <div class="box1" style="display: flex; flex-wrap: wrap">
                <label for="exampleInputEmail1" class="form-label"
                  >สาขา(ชื่อจังหวัด)</label
                >
                <input
                  class="form-control"
                  type="text"
                  placeholder="สาขา"
                  aria-label="default input example"
                  v-model="companyData.addr_province"
                  required
                />

                <label for="exampleInputEmail1" class="form-label">เลขไปรษณีย์</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="เลขไปรษณีย์"
                  aria-label="default input example"
                  v-model="companyData.addr_post_code"
                  required
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary w-25"
              data-bs-dismiss="modal"
            >
              ยกเลิก
            </button>
            <button type="button" class="btn btn-outline-danger w-25" @click="submitForm">
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="content_card" style="display: flex; flex-wrap: wrap; width: 100%">
    <BaseCard
      v-for="Company in companies"
      class="outline-card mt-5"
      style="width: 30%; margin-right: 3%; margin-bottom: 30px"
      :title="Company.com_name"
      :sub="Company.com_address.addr_province"
    >
      <template #after-title>
        <div class="text_content">
          {{ Company.com_address.addr_house_number }}
          {{ Company.com_address.addr_village_number }}
          {{ Company.com_address.addr_subdistrict }}
          {{ Company.com_address.addr_district }}
          {{ Company.com_address.addr_province }}
          {{ Company.com_address.addr_post_code }}
        </div>
        <button
          class="stroke_edit position-absolute top-0 end-0 m-1 p-1 w-25 h-25 border-0"
          style="border-radius: 50px; background-color: white"
          @click="openEditModal(Company)"
        >
          <EditIcon data-bs-toggle="modal" data-bs-target="#edit-company" />
        </button>
      </template>
    </BaseCard>
  </div>

  <div
    class="modal"
    id="edit-company"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body" style="width: 100%">
          <div class="content-body" style="width: 60%; margin: 10% 20% 5% 20%">
            <div class="content_edit">
              <h1>
                <center><strong>แก้ไขข้อมูลบริษัท</strong></center>
              </h1>
              <label for="exampleInputEmail1" class="form-label">ชื่อบริษัท </label>
              <input
                v-model="editedCompany.com_name"
                class="form-control"
                type="text"
                placeholder="ชื่อบริษัท"
                aria-label="default input example"
              />

              <div class="box1" style="display: flex; flex-wrap: wrap">
                <label for="exampleInputEmail1" class="form-label">เลขที่ </label>
                <input
                  v-model="editedCompany.com_address.addr_house_number"
                  class="form-control"
                  type="text"
                  placeholder="เลขที่"
                  aria-label="default input example"
                />

                <label for="exampleInputEmail1" class="form-label">หมู่ </label>
                <input
                  v-model="editedCompany.com_address.addr_village_number"
                  class="form-control"
                  type="text"
                  placeholder="หมู่"
                  aria-label="default input example"
                />
              </div>

              <div class="box1" style="display: flex; flex-wrap: wrap">
                <label for="exampleInputEmail1" class="form-label">ตรอก </label>
                <input
                  v-model="editedCompany.com_address.addr_alley"
                  class="form-control"
                  type="text"
                  placeholder="ตรอก"
                  aria-label="default input example"
                />

                <label for="exampleInputEmail1" class="form-label">ถนน </label>
                <input
                  v-model="editedCompany.com_address.addr_street"
                  class="form-control"
                  type="text"
                  placeholder="ถนน"
                  aria-label="default input example"
                />
              </div>

              <div class="box1" style="display: flex; flex-wrap: wrap">
                <label for="exampleInputEmail1" class="form-label">ตำบล/แขวง </label>
                <input
                  v-model="editedCompany.com_address.addr_subdistrict"
                  class="form-control"
                  type="text"
                  placeholder="ตำบล/แขวง"
                  aria-label="default input example"
                />

                <label for="exampleInputEmail1" class="form-label">อำเภอ/เขต </label>
                <input
                  v-model="editedCompany.com_address.addr_district"
                  class="form-control"
                  type="text"
                  placeholder="อำเภอ/เขต"
                  aria-label="default input example"
                />
              </div>

              <div class="box1" style="display: flex; flex-wrap: wrap">
                <label for="exampleInputEmail1" class="form-label"
                  >สาขา(ชื่อจังหวัด)
                </label>
                <input
                  v-model="editedCompany.com_address.addr_province"
                  class="form-control"
                  type="text"
                  placeholder="สาขา"
                  aria-label="default input example"
                />

                <label for="exampleInputEmail1" class="form-label">เลขไปรษณีย์ </label>
                <input
                  v-model="editedCompany.com_address.addr_post_code"
                  class="form-control"
                  type="text"
                  placeholder="เลขไปรษณีย์"
                  aria-label="default input example"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary w-25"
            data-bs-dismiss="modal"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            class="btn btn-outline-danger w-25"
            @click="submitFormedit"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import apiService from "../../services/api";
import BaseCard from "../Component/BaseCard.vue";
import EditIcon from "../icons/EditIcon.vue";
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";

const apiCall = new apiService();
const companies = ref([]);
const company = ref([]);

const companyData = ref({
  com_name: "",
  addr_house_number: "",
  addr_village_number: "",
  addr_alley: "",
  addr_street: "",
  addr_subdistrict: "",
  addr_district: "",
  addr_province: "",
  addr_post_code: "",
});

async function submitForm() {
  await apiCall
    .createCompany(companyData.value)
    .then(() => {
      Swal.fire({
        icon: "success",
        text: "บันทึกข้อมูลเสร็จสิ้น",
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        // router.push({ name: 'index' })
      });
    })
    .catch((error) => {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data === "Company name already exists."
      ) {
        Swal.fire({
          icon: "error",
          text: "มีข้อมูลบริษัทนี้อยู่แล้ว",
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
          showConfirmButton: true,
        });
      }
    });
}

async function submitFormedit() {
  await apiCall.updateCompany(editedCompany.value).then(() => {
    Swal.fire({
      icon: "success",
      text: "แก้ไขข้อมูลสำเร็จ",
      showConfirmButton: false,
      timer: 3000,
    }).then(() => {
      // router.push({ name: 'index' })
    });
  });
}

// เพิ่ม ref สำหรับเก็บข้อมูลบริษัทที่จะแก้ไข
const editedCompany = ref({
  com_name: "",
  com_address: {
    addr_province: "",
    addr_house_number: "",
    addr_village_number: "",
    addr_subdistrict: "",
    addr_district: "",
    addr_post_code: "",
  },
});

// ฟังก์ชันที่เรียกเมื่อปุ่ม Edit ถูกคลิก
const openEditModal = (company) => {
  console.log(company);

  if (company && company.com_address) {
    editedCompany.value = company;
    editedCompany.value.com_address = company.com_address;
    console.log(company.com_address);
  } else {
    console.error("อ็อบเจ็กต์บริษัทไม่ถูกต้องหรือไม่มีคุณสมบัติ com_address");
  }
};

onMounted(() => {
  if (!editedCompany.value.com_address) {
    editedCompany.value.com_address = { addr_province: "" };
    editedCompany.value.com_address = { addr_house_number: "" };
    editedCompany.value.com_address = { addr_village_number: "" };
    editedCompany.value.com_address = { addr_subdistrict: "" };
    editedCompany.value.com_address = { addr_district: "" };
    editedCompany.value.com_address = { addr_post_code: "" };
  }
});

onMounted(async () => {
  companies.value = await apiCall.getCompanyWithAddress();
  // console.log(companies.value);
});

onMounted(async () => {
  company.value = await apiCall.getAllCompany();
});
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
