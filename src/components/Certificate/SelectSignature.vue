<template>
  <LayoutMenuName
    backButton
    page-name="เอกสารรับรอง > ลายเซ็นผู้มีสิทธ์ออกเอกสารรับรอง"
  />

  <SectionSpace>
    <div class="row mb-3 me-1">
      <div class="col-md-5 my-auto">
        <Search />
      </div>
    </div>

    <!-- Modal -->
    <div class="row mt-3">
        <BaseCard class="mb-4" v-for="signature in signatures" :title="getName(signature)" :sub="signature?.sign_role" content="">
            <template #before-title>
                <div class="text-center mb-4">
                    <img width="100" height="100" :src="signature?.sign_image_path" />
                </div>
            </template>
            <template #after-title>
                <div class="text-center">
                    <!-- <button class="col-auto btn btn_choose" @click="sentCompanyId(signature.sign_id)">เลือก</button> -->
                    <BaseButton class="col-md-6 mx-auto" label="เลือก" @click="sentCompanyId(signature.sign_id)"/>
                </div>
            </template>

        </BaseCard>


    </div>
  </SectionSpace>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import BaseCard from "../Component/BaseCard.vue";
import Search from "../Component/SearchBox.vue";
import BaseButton from "../component/BaseButton.vue";
import { useRoute } from "vue-router";
import router from "@/router";
const route = useRoute();

const signatures = ref([]);
const id = ref(route.params.companyId);

const getSignature = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_HOST}/signatures/company/${id.value}`
    );
    signatures.value = response.data;
  } catch (error) {
    console.error("Error fetching signatures:", error);
  }
};

function sentCompanyId(sign) {
  console.log(sign);
  router.push({
    name: "selectIntern",
    params: {
      companyId: id.value,
      signId: sign,
    },
    // query: { signId: sign }
  });
}

// function sentBack() {
//     router.push({
//         name: 'selectCompany',
//         params: {
//             companyId: id
//         }
//     })
// }

onMounted(() => {
  getSignature();
});

function getName(signature) {
  let name = `${signature.sign_prefix}
    ${signature.sign_fname}
    ${signature.sign_lname}`;
  return name;
}
</script>

<style scoped>
.back {
  display: flex;
  margin-right: 10px;
  margin-bottom: 20px;
}

.search {
  background-color: #8d969b30 !important;
}

.btn_choose {
  border: 1px solid black;
  color: black;
}

.btn_choose:hover {
  border: 1px solid var(--main-color);
  /* color: var(--main-color); */
}
</style>
