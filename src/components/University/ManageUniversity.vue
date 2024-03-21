<!--
 MaangeUniversity
 หน้าจอสำหรับแสดง และจัดการข้อมูลมหาวิทยาลัย
 Author : Kanyaporn Phetthong, Wilaklak Prathummat
 Created date : 04-12-2566
-->

<template>
  <LayoutMenuName page-name="จัดการมหาวิทยาลัย" />

  <SectionSpace>
    <div class="row mb-4 nopadding">
      <div class="col-md-3 my-auto nopadding">
        <SearchBox v-model="searchData" class="my-auto" placeholder="ชื่อมหาวิทยาลัย" />
      </div>

      <BaseButton label="เพิ่มมหาวิทยาลัย" class="col-md-2 ms-auto" @click="add()">
        <template #before-text>
          <ManageUniversityIcon class="custom-icon" />
        </template>
      </BaseButton>
    </div>

    <BaseModal v-if="isOpen == true" @save="formSubmit" title="เพิ่มข้อมูลมหาวิทยาลัย" @close="isOpen = false">
      <div class="col-md-12">
        <div class="text-center">
          <img id="blah" src="#" alt="" class="img-add bg-grays-200" />
          <span v-if="v$.uni_file.$error" :class="{ 'is-invalid': v$.uni_file.$error }"></span>
          <InvalidFeedback :errors="v$.uni_file.$errors" />
        </div>

        <div class="row mt-4">
          <button id="picture" class="mx-auto outline-red col-sm-6 btn btn-sm position-relative">
            <input id="img-upload" type="file" accept="image/*" @change="showImg" />
            <CameraLogoVue />
            ตรามหาวิทยาลัย
          </button>
          <div class="col-md-12 mt-3">
            <BaseInput label="ชื่อมหาวิทยาลัย" v-model="formData.uni_name" :value="formData.uni_name"
              placeholder="มหาวิทยาลัย" :class="{ 'is-invalid': v$.uni_name.$error }" required />
            <InvalidFeedback :errors="v$.uni_name.$errors" />
          </div>
        </div>
      </div>
    </BaseModal>

    <Loading v-if="!loaded" />
    <div class="row ms-auto" v-if="loaded && filterData.length < 1">
      <NotFound />
    </div>

    <div v-for="(university, index) in filterData" class="row mx-auto mt-2">
      <div :id="'r' + index" class="card mb-3 shadow-sm" ref="row" :class="{ 'border-danger': showDetail[index] }">
        <div class="card-body">
          <div class="row">
            <label class="col">
              <span class="me-2">
                <img id="uniLogo" class="img" :src="university?.uni_image_path" height="35" width="35" />
              </span>
              {{ university.uni_name }}
            </label>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
              class="col-auto my-auto bi bi-trash-fill cursor-p outline-hov-red" viewBox="0 0 16 16"
              @click="deleteUniversity(university.uni_id)">
              <path
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
            </svg>

            <EditIcon @click="edit(universities[index])" class="hov-outline-red ms-auto col-auto my-auto cursor-p" />

            <ArrowDownIcon @click="handleCollapse(university.uni_id, index)"
              class="outline-hov-red ms-auto col-auto m-2 my-auto cursor-p" />
          </div>
          <div :id="university.uni_id" class="hidden">
            <div class="row row-cols-lg-3 mt-3">
              <div v-for="faculty in university.faculties" class="col-lg-4 d-flex align-items-stretch mb-3">
                <div class="shadow-sm card flex-fill">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-between bg-red text-white">
                      <span class="my-auto">คณะ {{ faculty.fac_name }}</span>
                      <svg @click="editFaculty(faculty, university)" class="col-auto my-auto cursor-p" v-bind="$attrs"
                        width="25" height="25" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8.05878 10.4102H5.70585C4.45778 10.4102 3.26083 10.9059 2.37831 11.7885C1.49579 12.671 1 13.8679 1 15.116V36.2923C1 37.5404 1.49579 38.7374 2.37831 39.6199C3.26083 40.5024 4.45778 40.9982 5.70585 40.9982H26.8822C28.1303 40.9982 29.3272 40.5024 30.2097 39.6199C31.0922 38.7374 31.588 37.5404 31.588 36.2923V33.9394"
                          stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                          d="M29.2361 5.7061L36.2949 12.7649M39.5537 9.43549C40.4804 8.5088 41.001 7.25194 41.001 5.9414C41.001 4.63086 40.4804 3.37399 39.5537 2.4473C38.627 1.52061 37.3701 1 36.0596 1C34.7491 1 33.4922 1.52061 32.5655 2.4473L12.7656 22.1766V29.2354H19.8244L39.5537 9.43549Z"
                          stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </li>

                    <div v-if="faculty.majors.length == 0" class="row mt-3">
                      <span class="text-center mt-auto">ไม่มีข้อมูลสาขา</span>
                    </div>
                    <ol v-else class="list-group-item list-group-numbered">
                      สาขา
                      <li v-for="major in faculty.majors" class="list-group-item border-0">
                        {{ major.maj_name }}
                      </li>
                    </ol>
                  </ul>
                </div>
              </div>

              <div class="col-lg-4 d-flex align-items-stretch mb-3">
                <div class="shadow-sm card flex-fill p-4">
                  <!-- <button class="btn col-md-6 outline-red m-auto " @click="modalOpen = !open, uniName = university.uni_name">+ เพิ่มคณะ</button> -->
                  <button class="btn col-md-6 outline-red m-auto" @click="addFaculty(university)">
                    + เพิ่มคณะ
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionSpace>

  <BaseModal :title="uniName" v-if="isFacOpen" @close="isFacOpen = false" @save="formFacSubmit">
    <div class="row g-3 align-items-center mx-1 mb-2">
    
      <div class="col-2">
        <label for="facultyName" class="col-form-label">คณะ <span class="text-danger">*</span></label>
      </div>

      <div class="col-9">
        <input :class="{ 'is-invalid': facv$.fac_name.$error }" type="text" id="facName" class="form-control"
          v-model="facFormData.fac_name" placeholder="ชื่อคณะ" />
        <InvalidFeedback :errors="facv$.fac_name.$errors" />
      </div>

    </div>

    <div v-for="(major, index) in facFormData.majors" class="row g-3 align-items-center mx-1 mb-2 my-1">
      <div class="col-2">
        <label for="majorName" class="col-form-label">สาขา <span class="text-danger">*</span></label>
      </div>

      <div class="col-9">
        <input type="text" id="majorName" class="form-control" v-model="major.maj_name" :key="index"
          placeholder="ชื่อสาขา" :class="{ 'is-invalid': emptyMajor?.includes(index) }" />
        <span class="invalid-feedback">กรุณากรอกข้อมูล</span>
      </div>

      <button type="button" class="col-1 btn btn-outline-secondary mx-auto rounded-circle"
        @click="removeMajor(major, index)" v-if="!isMajorActive(major)">
        -
      </button>

    </div>

    <div class="row">
      <button type="button" class="col-1 btn btn-outline-secondary mx-auto rounded-circle" @click="addMajor(faculty)">
        +
      </button>
    </div>

  </BaseModal>

</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import axios from "axios";
import BaseButton from "../Component/BaseButton.vue";
import BaseInput from "../Component/BaseInput.vue";
import BaseModal from "../Component/BaseModal.vue";
import SearchBox from "../Component/SearchBox.vue";
import ManageUniversityIcon from "../icons/ManageUniversityIcon.vue";
import { useRouter } from "vue-router";
import CameraLogoVue from "../icons/CameraLogo.vue";
import EditIcon from "../icons/EditIcon.vue";
import ArrowDownIcon from "../icons/ArrowDownIcon.vue";
import NotFound from "../Component/NotFound.vue";
import { helpers, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import InvalidFeedback from "../Component/InvalidFeedback.vue";
import { errorAlert, confirmation, successAlert } from "../../assets/js/func";
import ApiService from "../../services/ApiService";

let uni_id = 0;
let edit_fac_id = 0;
const loaded = ref(false);
const api = new ApiService();
const searchData = ref("");
const router = useRouter();
const showDetail = ref([]);
const universities = ref([]);
const isOpen = ref(false);
const isFacOpen = ref(false);
const modalMode = ref("");
const modalModeFac = ref("");
const uniName = ref("");
const countRow = ref(1);
const inititalState = {
  uni_name: "มหาวิทยาลัย",
  uni_file: "",
};
const initialFaculty = {
  fac_university_id: "",
  fac_name: "",
  majors: [
    {
      maj_name: "",
    },
  ],
};

const deleted = [];
const edited = [];
const formData = reactive({ ...inititalState });
const facFormData = reactive({ ...initialFaculty });
const isValidate = ref(false)

const emptyMajor = computed(() => {
  let err = []
  if (isValidate.value) {
    for (let i = 0; i < facFormData.majors.length; i++) {
      if (!facFormData.majors[i].maj_name) {
        err.push(i)
      }
    }
  }
  return err
})

const rules = {
  uni_name: { required },
  uni_file: { required },
};

const facRules = {
  fac_name: { required },
}
const v$ = useVuelidate(rules, formData);
const facv$ = useVuelidate(facRules, facFormData)

/*
 * filterData
 * ฟังก์ชันค้นหารายการมหาวิทยาัลย
 * param: -
 * return: รายการมหาวิทยาลัยที่ตรงกับคำค้นหา
 */
const filterData = computed(() => {
  return universities.value.filter((university) => {
    return university.uni_name.indexOf(searchData.value.trim()) > -1;
  });
});

/*
 * getAllUniversity
 * ฟังก์ชันสำหรับ fetch ข้อมูลมหาวิทยาลัย
 * param: -
 * return: -
 */
const getAllUniversity = async () => {
  loaded.value = false;
  await axios
    .get(`${import.meta.env.VITE_API_HOST}/universities/related`)
    .then((response) => {
      universities.value = response.data;
    });

  loaded.value = true;
};

function handleCollapse(id, index) {
  $('#' + id).slideToggle()

  showDetail.value[index] = !showDetail.value[index]
}

function isMajorActive(major) {
  if (!major.maj_interns) {
    return false
  }

  if (major.maj_interns && major.maj_interns.length > 0) {
    return true
  }

  return false
}

/*
 * edit
 * ฟังก์ชันสำหรับจัดการเมื่อมีการกดปุ่มแก้ไขข้อมูลมหาวิทยาลัย
 * param: ข้อมูลมหาวิทยาลัยที่กดแก้ไข
 * return: -
 */
async function edit(university) {
  modalMode.value = "edit";
  isOpen.value = true;


  // กำหนดค่าให้ formData
  Object.assign(formData, {
    uni_name: university?.uni_name,
    uni_file: university?.uni_image_path,
  });

  uni_id = university.uni_id;

  // แสดงรูปภาพในแบบฟอร์ม
  let blah = document.getElementById("uniLogo");
  if (blah) {
    blah.src = formData.uni_file;
  }
  console.log(blah);
}

/*
 * add
 * ฟังก์ชันสำหรับจัดการเมื่อมีการกดปุ่มเพิ่มข้อมูลมหาวิทยาลัย
 * param: -
 * return: -
 */
function add() {
  // กำนหนดค่าให้แบบฟอร์มเป็นค่าว่าง
  Object.assign(formData, inititalState);
  isOpen.value = true;
  modalMode.value = "add";
}

function addFaculty(university) {
  /* กำนหนดค่าให้แบบฟอร์มเป็นค่าว่าง */
  Object.assign(facFormData, initialFaculty, {
    fac_university_id: university.uni_id,
  });

  uniName.value = university.uni_name;
  isFacOpen.value = true;
  modalModeFac.value = "add";
}

function editFaculty(faculty, university) {
  uniName.value = university.uni_name;

  Object.assign(facFormData, {
    fac_university_id: university.uni_id,
    fac_name: faculty.fac_name,
    majors: faculty.majors.map((maj) => {
      return {
        maj_name: maj.maj_name,
        maj_id: maj.maj_id,
        maj_faculty_id: maj.maj_faculty_id,
        maj_interns: maj.maj_interns
      };
    }),
  });

  edit_fac_id = faculty.fac_id;
  isFacOpen.value = true;
  modalModeFac.value = "edit";
}

function addMajor(faculty) {
  facFormData.majors.push({ maj_name: "", maj_faculty_id: edit_fac_id });
}

function removeMajor(major, index) {
  if (major.maj_id) {
    deleted.push(major.maj_id);
  }

  facFormData.majors.splice(index, 1)
}

/*
 * showImg
 * ฟังก์ชันสำหรับแสดงโลโก้มหาวิทยาลัยเมื่อมีการอัปโหลดไฟล์
 * param: -
 * return: -
 */
function showImg() {
  const imgUpload = document.getElementById("img-upload");
  const blah = document.getElementById("blah");

  if (imgUpload.files[0] != undefined) {
    formData.uni_file = imgUpload.files[0];
  }

  if (formData.uni_file) {
    blah.src = URL.createObjectURL(formData.uni_file);
  }
}

/*
 * formSubmit
 * ฟังก์ชันจัดการการส่งแบบฟอร์มแก้ไขและเพิ่มข้อมูลมหาวิทยาลัย
 * param: -
 * return: -
 */
async function formSubmit() {
  const validate = await v$.value.$validate();

  if (validate) {
    // ถ้าหากเป็นแบบฟอร์มสำหรับเพิ่มข้อมูล ให้เรียก api เพิ่มข้อมูล
    if (modalMode.value == "add") {
      await api
        .createUniversity(formData)
        .then(() => {
          router.go();
        })
        .catch((e) => {
          errorAlert(e.response.data);
        });

      // ถ้าหากเป็นแบบฟอร์มสำหรับแก้ไขข้อมูล
    } else if (modalMode.value == "edit") {
      // ลบ uni_file ทิ้งหากเป็นโลโก้เดิม ป้องกันการสร้างไฟล์ซ้ำซ้อน
      if (typeof formData.uni_file != "object") {
        delete formData["uni_file"];
      }
      await api
        .editUniversity(formData, uni_id)
        .then(() => {
          router.go();
        })
        .catch((e) => {
          formData.uni_file = uni_id;
          errorAlert(e.response.data);
        });

      /* ถ้าหากเป็นแบบฟอร์มสำหรับเพิ่มข้อมูลคณะและสาขา */
    }
  }
}

async function formFacSubmit() {
  isValidate.value = true
  const validate = await facv$.value.$validate()

  if (validate && emptyMajor.value.length < 1) {
    if (modalModeFac.value == "add") {
      const faculty = await api
        .createFaculty({
          fac_name: facFormData.fac_name,
          fac_university_id: facFormData.fac_university_id,
        })
        .catch((e) => {
          errorAlert(e.response.data);
        });

      if (faculty.status == 200) {
        const majorList = facFormData.majors.map((maj) => {
          return {
            maj_faculty_id: faculty.id,
            maj_name: maj.maj_name,
          };
        });

        await api.createMajorBulk(majorList).then(() => {
          router.go();
        }).catch((e) => {
          errorAlert(e.response.data);
        });;
      }
    } else if (modalModeFac.value == "edit") {
      const faculty = await api
        .editFaculty(
          {
            fac_name: facFormData.fac_name,
            fac_university_id: facFormData.fac_university_id,
          },
          edit_fac_id
        )
        .catch((e) => {
          errorAlert(e.response.data);
        });

      if (faculty && deleted[0]) {
        await api.deleteMajorBulk(deleted)
        .catch((e) => {
          errorAlert(e.response.data);
        });
      }

      const addList = []
      const editList = []
      for (let i = 0; i < facFormData.majors.length; i++) {
        let major = facFormData.majors[i]
        if (major.maj_id) {
          editList.push(facFormData.majors[i])
        } else {
          addList.push(facFormData.majors[i])
        }
      }

      if (addList[0]) {
        await api.createMajorBulk(addList).catch((e) => {
          errorAlert(e.response.data);
        });
      }

      if (editList[0]) {
        await api.editMajorBulk(editList).catch((e) => {
          errorAlert(e.response.data);
        });
      }
        
      router.go()
    }
  }
}

/*
 * deleteUniversity
 * ฟังก์ชันสำหรับลบข้อมูลมหาวิทยาลัย
 * param: id ของมหาวิทยาลัยที่ต้องการลบ
 * return: -
 */
async function deleteUniversity(id) {
  const result = await confirmation(
    "ยืนยันการลบข้อมูลหรือไม่\nข้อมูลคณะและสาขาของมหาวิทยาลัยจะถูกลบไปด้วย"
  );

  if (result) {
    await api
      .deleteUniversity(id)
      .then(async () => {
        await successAlert("ลบข้อมูลมหาวิทยาลัยเรียบร้อยแล้ว");
        router.go();
      })
      .catch((e) => {
        console.log(`ไม่สามารถลบข้อมูลได้: ${e}`);
        errorAlert(e.response.data, true);
      });
  }
}

onMounted(() => {
  getAllUniversity();
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.img {
  width: 80px;
  height: 80px;
  border: none;
}

.custom-col {
  margin-bottom: -99999px !important;
  padding-bottom: 999999px !important;
}

.custom-row {
  overflow: hidden !important;
}

.img-add {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 1px solid var(--main-color);
}

.rounded-circle {
  border-radius: 50%;
}

.path-white path {
  stroke: white !important;
}

.hidden {
  display: none;
}

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
