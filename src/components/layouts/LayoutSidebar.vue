<!--
 LayoutSidebar
 Display system's main sidebar menu
 Author : Rawich Piboonsin
 Created date : 24-08-2566
-->

<template>
  <div
    class="position-fixed d-flex flex-column p-4 bg-white border-end vh-100"
    style="width: 280px"
  >
    <ClicknextLogo class="mb-3" />

    <ul class="nav nav-pills flex-column">
      <li class="nav-item py-2">
        <router-link
          to="/"
          class="nav-link text-dark hov-red"
          active-class="active"
          @click="changeActiveMenu($event)"
        >
          <InternListIcon class="hov-red" />
          
          รายชื่อนักศึกษา
        </router-link>
      </li>

      <li class="nav-item py-2">
        <router-link
          to="/certificates"
          class="nav-link text-dark hov-red"
          active-class="active"
          @click="changeActiveMenu($event)"
        >
          <CertificateIcon class="hov-red" />

          เอกสารรับรอง
        </router-link>
      </li>

      <li class="nav-item py-2">
        <router-link
          to="/reports"
          class="nav-link text-dark hov-red"
          active-class="active"
          @click="changeActiveMenu($event)"
        >
          <ReportIcon class="hov-red" />

          รายงานเบี้ยเลี้ยง
        </router-link>
      </li>

      <li class="nav-item py-2">
        <router-link
          to="/universities"
          class="nav-link text-dark hov-red"
          active-class="active"
          @click="changeActiveMenu($event)"
        >
          <ManageUniversityIcon class="hov-red" />

          จัดการมหาวิทยาลัย
        </router-link>
      </li>

      <li class="py-2">
        <a
          class="btn nav-link text-dark text-start dropdown-toggle hov-red"
          type="button"
          @click="showDropdown = !showDropdown"
        >
          <CertificateDataIcon class="hov-red" />

          จัดการเอกสารรับรอง
        </a>

        <Transition>
          <div v-if="showDropdown">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 ms-5">
              <li>
                <router-link
                  to="/signatures"
                  class="nav-link text-dark hov-red"
                  active-class="active"
                  @click="changeActiveMenu($event)"
                >
                  ลายเซ็น
                </router-link>
              </li>
              <li>
                <router-link
                  to="/companies"
                  class="nav-link text-dark hov-red"
                  active-class="active"
                  @click="changeActiveMenu($event)"
                >
                  บริษัท
                </router-link>
              </li>
            </ul>
          </div>
        </Transition>
      </li>
    </ul>

    <div class="nav nav-pills mt-auto flex-column">
      <router-link to="/login" class="nav-link text-dark hov-red">
        <LogoutIcon class="hov-red" />

        Logout
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ClicknextLogo from "../icons/ClicknextLogo.vue";
import CertificateDataIcon from "../icons/CertificateDataIcon.vue";
import CertificateIcon from "../icons/CertificateIcon.vue"
import ManageUniversityIcon from "../icons/ManageUniversityIcon.vue"
import ReportIcon from "../icons/ReportIcon.vue"
import InternListIcon from "../icons/InternListIcon.vue"
import LogoutIcon from "../icons/LogoutIcon.vue"

const showDropdown = ref(false);

function changeActiveMenu(event) {
  const active = document.querySelector(".active");
  const element = event.target;
  element.classList.add("active");
  active.classList.remove("active");
}
</script>

<style scoped>

.active {
  background-color: var(--main-color) !important;
  color: white !important;
}

.hov-red:hover {
  color: white !important;
  background-color: var(--main-color);
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
