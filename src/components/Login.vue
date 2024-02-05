<!--
    Login
    หน้าจอเช้าสู่ระบบ
    Author : Rawich Piboonsin
    Created date : 19-08-2566
-->

<template>
  <div class="background">
    <div class="card content w-75 rounded-5 border-0 shadow py-3">
      <div class="box_clicknext ms-5 mb-2">
        <img src="../assets/images/clicknext-logo.png" width="240" alt="" />
      </div>
      <div class="card-body mx-5 row">
        <div class="col-md-7">
          <h5 class="card-title mb-4">Internship Management System</h5>

          <div class="row mb-3" v-if="error">
            <span class="text-danger fw-bold">{{ error }}</span>
          </div>

          <label class="form-label h5">Username</label>
          <div class="row mb-3">
            <span class="col-auto align-self-center">
              <UserIcon />
            </span>
            <input v-model="credentials.username" class="col form-control rounded-pill" placeholder="Username" type="text"
              required />
          </div>

          <label class="form-label h5">Password</label>
          <div class="row mb-4">
            <span class="col-auto align-self-center">
              <PasswordIcon />
            </span>
            <input v-model="credentials.password" class="col form-control rounded-pill" type="password"
              placeholder="Password" required />
          </div>

          <div class="row mb-4">
            <span class="col-auto">
              <UserIcon class="fake-display" />
            </span>

            <button @click="login" class="col btn">LOGIN</button>
          </div>

          <div class="row">
            <span class="col-auto">
              <UserIcon class="fake-display" />
            </span>
            <router-link to="#" class="col-auto mx-auto text-center text-dark text-decoration-underline">
              ลืมรหัสผ่าน
            </router-link>
          </div>
        </div>

        <div class="col-lg-4 mx-auto">
          <img src="../assets/images/login_img.png" width="350" alt="" />
        </div>
      </div>
    </div>

    <img height="184" class="overflow-auto w-100 position-absolute bottom-0" src="../assets/images/wave.png" alt="" />
  </div>
</template>

<script setup>
import UserIcon from "./icons/UserIcon.vue";
import PasswordIcon from "./icons/PasswordIcon.vue";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

const error = ref();
const router = useRouter();
const credentials = ref({
  username: "",
  password: "",
});

/*
 * login
 * ฟังก์ชันเรียก api สำหรับ Login เมื่อมีการคลิกปุ่ม Login
 * param: -
 * return: -
*/
const login = async () => {
  const result = await axios
    .post(`${import.meta.env.VITE_API_HOST}/users/login`, credentials.value)
    .then((response) => {
      return response.data;
    });

  if (result.status) {
    let me = await validateTokent(result.token)

    Cookies.set("token", result.token, {
      expires: new Date(me.exp * 1000)
    });

    Cookies.set("user", `${me.fname} ${me.lname}`)

    router.push({ name: "index" });
  } else {
    error.value = result.error;
  }
};

/*
 * validateTokent
 * ฟังก์ชันสำหรับเรียก api เพื่อตรวจสอบข้อมูลของผู้ใช้งาน
 * param: token สำหรับตรวจนสอบ้ขอมูล
 * return: ผลลัพธ์ในการตรวจสอบ
*/
const validateTokent = (async (token) => {
  return await axios.get(`${import.meta.env.VITE_API_HOST}/users/me`, { headers: { "Authorization": `Bearer ${token}` } })
    .then((res) => {
      return res.data
    }).catch((e) => {
      return false
    })
})
</script>

<style scoped>
.card {
  height: fit-content;
  margin-top: 5%;
}

.background {
  display: flex;
  justify-content: center;
  background-color: rgba(239, 238, 238, 0.852);
  height: 100%;
}

.box_clicknext {
  display: flex;
  margin-top: 20px;
  height: 50px;
}

.box_wel {
  margin-top: 15px;
  margin-left: 50px;
}

.box_login {
  margin-top: 20px;
  margin-left: 88px;
}

.group_box {
  display: inline-block;
}

.box_img_people {
  display: inline-block;
  margin-top: 50px;
}

button {
  background-color: #e1032b !important;
  color: white !important;
}

button:hover {
  background-color: #c00023 !important;
}

input:focus {
  border: 1px solid #c00023 !important;
  box-shadow: none !important;
  transition: none !important;
}

.fake-display {
  visibility: hidden;
}
</style>
