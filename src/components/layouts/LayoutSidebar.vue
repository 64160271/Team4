<!--
 LayoutSidebar
 Display system's main sidebar menu
 Author : Rawich Piboonsin
 Created date : 24-08-2566
-->

<template>
  <div class="position-fixed d-flex flex-column p-4 bg-white border-end vh-100" style="width: 280px">
    <ClicknextLogo />

    <hr />

    <label class="text-center fw-bold" for="">ฝ่ายบุคคล</label>
    <label class="text-center" for="">{{ user }}</label>

    <hr />

    <ul class="nav nav-pills flex-column">
      <li class="nav-item py-2">
        <router-link to="/interns" class="nav-link text-dark hov-red" 
          :class="{ active: router.currentRoute.value.path.includes('/interns') }"
          active-class="active" @click="changeActiveMenu($event)">
          <InternListIcon class="hov-red" />

          รายชื่อนักศึกษา
        </router-link>
      </li>

      <li class="nav-item py-2">
        <router-link to="/projects" class="nav-link text-dark hov-red" active-class="active"
        :class="{ active: router.currentRoute.value.path.includes('/projects') }"
          @click="changeActiveMenu($event)">
          <ProjectIcon class="hov-red me-3" />

          โปรเจกต์
        </router-link>
      </li>

      <li class="nav-item py-2">
        <router-link to="/certificates" class="nav-link text-dark hov-red" active-class="active"
        :class="{ active: router.currentRoute.value.path.includes('/certificates') }"
          @click="changeActiveMenu($event)">
          <CertificateIcon class="hov-red" />

          เอกสารรับรอง
        </router-link>
      </li>

      <li class="nav-item py-2">
        <a id="dropdownReport" class="btn nav-link text-dark text-start hov-red"
           @click="handleCollapse('repMenu')">
          <ReportIcon class="hov-red" />
          เบี้ยเลี้ยง
          <span class="dropdown-toggle"></span>
        </a>

          <div id="repMenu" class="hidden">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 ms-2">
              <li class="my-2">
                <router-link to="/reports" class="nav-link text-dark hov-red" active-class="active"
                  @click="changeActiveMenu($event)">
                  <Monitor />
                  <span class="ms-3">รายงานเบี้ยเลี้ยง</span>
                </router-link>
              </li>
              <li>
                <router-link to="/salaries" class="nav-link text-dark hov-red" active-class="active"
                  @click="changeActiveMenu($event)">
                  <ManageSalaryIcon />
                  <span class="ms-3">จัดการเบี้ยเลี้ยง</span>
                </router-link>
              </li>
            </ul>
          </div>
      </li>

      <li class="nav-item py-2">
        <router-link to="/universities" class="nav-link text-dark hov-red" active-class="active"
          @click="changeActiveMenu($event)">
          <ManageUniversityIcon class="hov-red" />

          จัดการมหาวิทยาลัย
        </router-link>
      </li>

      <li class="py-2">
        <a class="btn nav-link text-dark text-start dropdown-toggle hov-red" type="button"
        @click="handleCollapse('cerMenu')">
          <CertificateDataIcon class="hov-red" />

          จัดการเอกสารรับรอง
        </a>

          <div id="cerMenu" class="hidden">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 ms-2">
              <li class="my-2">
                <router-link to="/signatures" class="nav-link text-dark hov-red" active-class="active"
                  @click="changeActiveMenu($event)">
                  <ManageSignatureIcon />
                  <span class="ms-3">ลายเซ็น</span> 
                </router-link>
              </li>
              <li>
                <router-link to="/companies" class="nav-link text-dark hov-red" active-class="active"
                  @click="changeActiveMenu($event)">
                  <ManageCompanyIcon />
                  <span class="ms-3">บริษัท</span>
                </router-link>
              </li>
            </ul>
          </div>
      </li>
    </ul>

    <div class="nav nav-pills mt-auto flex-column">
      <router-link to="/login" class="nav-link text-dark hov-red">
        <LogoutIcon class="hov-red" />

        ออกจากระบบ
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, toRaw } from "vue";
import ClicknextLogo from "../icons/ClicknextLogo.vue";
import CertificateDataIcon from "../icons/CertificateDataIcon.vue";
import CertificateIcon from "../icons/CertificateIcon.vue"
import ManageUniversityIcon from "../icons/ManageUniversityIcon.vue"
import ReportIcon from "../icons/ReportIcon.vue"
import InternListIcon from "../icons/InternListIcon.vue"
import LogoutIcon from "../icons/LogoutIcon.vue"
import ProjectIcon from "../icons/ProjectIcon.vue"
import Cookies from "js-cookie"
import { useRouter } from "vue-router"
import Monitor from "../icons/Monitor.vue";
import ManageSalaryIcon from "../icons/ManageSalaryIcon.vue";
import ManageCompanyIcon from "../icons/ManageCompanyIcon.vue";
import ManageSignatureIcon from "../icons/ManageSignatureIcon.vue";

const user = ref(Cookies.get('user'))
const router = useRouter()

function changeActiveMenu(event) {
  /* const active = document.querySelector(".active");
  const element = event.target;
  element.classList.add("active");
  active.classList.remove("active"); */
}

function handleCollapse(id) {
  $('#' + id).slideToggle()
}
</script>

<style scoped>
.active {
  background-color: var(--main-color) !important;
  color: white !important;
  font-weight: bold !important;
}

.hov-red:hover {
  color: white !important;
  background-color: var(--main-color);
}

.hidden {
  display: none;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

</style>
