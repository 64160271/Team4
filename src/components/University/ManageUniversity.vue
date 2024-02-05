<!--
    ManageUniversity
    หน้าจอการจัดการข้อมูลเกี่ยวกับมหาวิทยาลัย
    Author : Wilairak Prathummat ,Kanyaporn Phetthong
    Created date : 13-11-2566
-->


<template>
  <LayoutMenuName page-name="จัดการมหาวิทยาลัย" />

  <SectionSpace>
    <div class="row mb-4">
      <div class="col-md-4 my-auto">
        <SearchBox placeholder="ค้นหาชื่อมหาวิทยาลัย" v-model="searchData" class="my-auto" />
      </div>

      <BaseButton label="เพิ่มมหาวิทยาลัย" class="col-md-2 ms-auto" @click="add()">
        <template #before-text>
          <ManageUniversityIcon class="custom-icon" />
        </template>
      </BaseButton>
    </div>

    <BaseModal
      v-if="isOpen == true"
      @save="formSubmit"
      title="เพิ่มข้อมูลมหาวิทยาลัย"
      @close="isOpen = false"
    >
      <div class="col-md-12">
        <div class="text-center">
          <img id="blah" src="#" alt="" class="img-add bg-grays-200" />
          <span
            v-if="v$.uni_file.$error"
            :class="{ 'is-invalid': v$.uni_file.$error }"
          ></span>
          <InvalidFeedback :errors="v$.uni_file.$errors" />
        </div>

        <div class="row mt-4">
          <button
            id="picture"
            class="mx-auto outline-red col-sm-6 btn btn-sm position-relative"
          >
            <input id="img-upload" type="file" accept="image/*" @change="showImg" />
            <CameraLogoVue />
            ตรามหาวิทยาลัย
          </button>
          <div class="col-md-12 mt-3">
            <BaseInput
              label="ชื่อมหาวิทยาลัย"
              v-model="formData.uni_name"
              :value="formData.uni_name"
              placeholder="มหาวิทยาลัย"
              :class="{ 'is-invalid': v$.uni_name.$error }"
              required
            />
            <InvalidFeedback :errors="v$.uni_name.$errors" />
          </div>
        </div>
      </div>
    </BaseModal>

    <div class="row" v-if="filterData.length == 0 && loaded">
      <NotFound />
    </div>

    <div v-if="!loaded" class="d-flex justify-content-center">
      <div class="spinner-border" role="status"></div>
    </div>

    <div v-for="(university, index) in filterData" class="row mx-auto mt-2">
      <div class="card mb-3" :class="{ 'border-danger': showDetail[index] }">
        <div class="card-body">
          <div class="row">
            <label class="col">
              <span class="me-2">
                <img
                  class="img"
                  :src="university?.uni_image_path"
                  height="35"
                  width="35"
                />
              </span>
              {{ university.uni_name }}
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              class="col-auto my-auto bi bi-trash-fill cursor-p outline-hov-red"
              viewBox="0 0 16 16"
              @click="deleteUniversity(university.uni_id)"
            >
              <path
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
              />
            </svg>
            <EditIcon
              @click="edit(universities[index])"
              class="hov-outline-red ms-auto col-auto my-auto cursor-p"
            />
            <ArrowDownIcon
              @click="
                (showDetail[index] = !showDetail[index]), console.log(showDetail[index])
              "
              class="outline-hov-red ms-auto col-auto m-2 my-auto cursor-p"
            />
          </div>
          <Transition>
            <div v-if="showDetail[index]" class="row row-cols-lg-3 mt-3">
              <div
                v-for="faculty in university.faculties"
                class="col-lg-4 d-flex align-items-stretch mb-3"
              >
                <div class="card flex-fill">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item bg-red text-white">
                      คณะ {{ faculty.fac_name }}
                    </li>
                    <div v-if="faculty.majors.length == 0" class="row mt-3">
                      <span class="text-center mt-auto">ไม่มีข้อมูลสาขา</span>
                    </div>
                    <ol v-else class="list-group-item list-group-numbered">
                      สาขา
                      <li
                        v-for="major in faculty.majors"
                        class="list-group-item border-0"
                      >
                        {{ major.maj_name }}
                      </li>
                    </ol>
                  </ul>
                </div>
              </div>

              <div class="col-lg-4 d-flex align-items-stretch mb-3">
                <div class="card flex-fill p-4">
                  <button class="btn col-md-6 outline-red m-auto">+ เพิ่มคณะ</button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </SectionSpace>
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
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import InvalidFeedback from "../Component/InvalidFeedback.vue";
import { errorAlert, confirmation, successAlert } from "../../assets/js/func";
import ApiService from "../../services/ApiService";

let uni_id = 0;
const api = new ApiService();
const searchData = ref("");
const router = useRouter();
const showDetail = ref([]);
const universities = ref([]);
const isOpen = ref(false);
const modalMode = ref("");
const loaded = ref(false)
const inititalState = {
  uni_name: "มหาวิทยาลัย",
  uni_file: "",
};
const formData = reactive({ ...inititalState });

const rules = {
  uni_name: { required },
  uni_file: { required },
};
const v$ = useVuelidate(rules, formData);

const filterData = computed(() => {
  return universities.value.filter((university) => {
    return university.uni_name.indexOf(searchData.value.trim()) > -1;
  });
});

/*
 * edit
 * ฟังก์ชันสำหรับ เรียก api ข้อมูลมหาวิทยาลัย
 * param: -
 * return: -
*/
const getAllUniversity = async () => {
  await axios
    .get(`${import.meta.env.VITE_API_HOST}/universities/related`)
    .then((response) => {
      universities.value = response.data;
      loaded.value = true
    });
};

/*
 * edit
 * ฟังก์ชันเมื่อมีการกดปุ่มแก้ไข จะทำการกำหนดค่าในแบบฟอร์ม
 * param: university ข้อมูลมหาวิทยาลัย
 * return: -
*/
async function edit(university) {
  // กำหนดค่าให้ formData
  Object.assign(formData, {
    uni_name: university?.uni_name,
    uni_file: university?.uni_image_path,
  });

  uni_id = university.uni_id;
  isOpen.value = true;

  // แสดงรูปภาพในแบบฟอร์ม
  let blah = document.getElementById("blah");
  if (blah) {
    blah.src = formData.uni_file;
  }
  modalMode.value = "edit";
  console.log(formData);
}

/*
 * add
 * เมื่อทำการกดปุ่มเพิ่มข้อมูล
 * param: -
 * return: -
*/
function add() {
  // กำนหนดค่าให้แบบฟอร์มเป็นค่าว่าง
  Object.assign(formData, inititalState);

  isOpen.value = true;
  modalMode.value = "add";
}

/*
 * showImg
 * โชว์รูปภาพมหาวิทยาลัย
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
 * จัดการเมื่อมีการกดบันทึก
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
    }
  }
}

/*
 * deleteUniversity
 * ฟังก์ชันสำหรับลบ้ขอมูลมหาวิทยาลัย
 * param: id ของมหาวิทยาลัย
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
</style>
