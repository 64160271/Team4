import SectionSpace from '../Component/SectionSpace.vue';
<template>
  <LayoutMenuName page-name="จัดการมหาวิทยาลัย" />

  <SectionSpace>
    <div class="row mb-4">
      <div class="col-md-3 my-auto">
        <SearchBox v-model="searchData" class="my-auto" />
      </div>

      <BaseButton
        label="เพิ่มมหาวิทยาลัย"
        class="col-md-2 ms-auto"
        @click="(isOpen = true), (modalMode = 'add')"
      >
        <template #before-text>
          <ManageUniversityIcon class="" />
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
            />
          </div>
        </div>
      </div>
    </BaseModal>

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
            <EditIcon
              @click="edit(universities[index])"
              class="hov-outline-red me-2 ms-auto col-auto my-auto cursor-p"
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
import { ref, onMounted, computed } from "vue";
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

let uni_id = 0;
const searchData = ref("");
const router = useRouter();
const showDetail = ref([]);
const universities = ref([]);
const isOpen = ref(false);
const modalMode = ref("");
const formData = ref({
  uni_name: "มหาวิทยาลัย",
  uni_file: "",
});

const filterData = computed(() => {
  return universities.value.filter((university) => {
    return university.uni_name.indexOf(searchData.value.trim()) > -1;
  });
});

const getAllUniversity = async () => {
  await axios
    .get(`${import.meta.env.VITE_API_HOST}/universities/related`)
    .then((response) => {
      universities.value = response.data;
    });
};

async function edit(university) {
  uni_id = university.uni_id;
  formData.value.uni_file = university.uni_image_path;
  formData.value.uni_name = university.uni_name;
  isOpen.value = true;

  const blah = document.getElementById("blah");
  blah.src = formData.value.uni_file;
  modalMode.value = "edit";
}

function showImg() {
  const imgUpload = document.getElementById("img-upload");
  const blah = document.getElementById("blah");
  console.log(formData.value);

  if (imgUpload.files[0] != undefined) {
    formData.value.uni_file = imgUpload.files[0];
  }

  if (formData.value.uni_file) {
    console.log(blah);
    blah.src = URL.createObjectURL(formData.value.uni_file);
  }
}

async function formSubmit() {
  if (modalMode.value == "add") {
    await axios.post(`${import.meta.env.VITE_API_HOST}/universities`, formData.value, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } else if (modalMode.value == "edit") {
    if (typeof formData.value.uni_file != "object") {
      delete formData.value["uni_file"];
    }
    await axios.put(
      `${import.meta.env.VITE_API_HOST}/universities/${uni_id}`,
      formData.value,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }
  router.go();
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
