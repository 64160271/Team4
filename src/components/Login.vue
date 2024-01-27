<template>
  <!-- <div class="back container">
    <div class="box">
      <div class="group_box">
        <div class="box_clicknext">
          <img src="../assets/images/clicknext-logo.png" width="250" alt="" />
        </div>
        <div class="box_wel">
          <label for="">Welcome Internship Management System</label>
        </div>
        <div class="box_group_user">
          <div class="">
            <label style="font-size: 20px" for="">Username</label>
            <br /><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="50" viewBox="0 0 42 50" fill="none">
                <path
                  d="M21 25C27.6281 25 33 19.4043 33 12.5C33 5.5957 27.6281 0 21 0C14.3719 0 9 5.5957 9 12.5C9 19.4043 14.3719 25 21 25ZM29.9812 28.1836L25.5 46.875L22.5 33.5938L25.5 28.125H16.5L19.5 33.5938L16.5 46.875L12.0187 28.1836C5.33437 28.5156 0 34.209 0 41.25V45.3125C0 47.9004 2.01562 50 4.5 50H37.5C39.9844 50 42 47.9004 42 45.3125V41.25C42 34.209 36.6656 28.5156 29.9812 28.1836Z"
                  fill="#8D969B" />
              </svg></span>
            <input class="box_user ps-3" placeholder="Username" type="text" />
          </div>
          <div class="">
            <label style="font-size: 20px" for="">Password</label>
            <br /><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="50" viewBox="0 0 40 50" fill="none">
                <path
                  d="M20 38.0952C21.3261 38.0952 22.5979 37.5935 23.5355 36.7005C24.4732 35.8075 25 34.5963 25 33.3333C25 32.0704 24.4732 30.8592 23.5355 29.9662C22.5979 29.0731 21.3261 28.5714 20 28.5714C18.6739 28.5714 17.4021 29.0731 16.4645 29.9662C15.5268 30.8592 15 32.0704 15 33.3333C15 34.5963 15.5268 35.8075 16.4645 36.7005C17.4021 37.5935 18.6739 38.0952 20 38.0952ZM35 16.6667C36.3261 16.6667 37.5979 17.1684 38.5355 18.0614C39.4732 18.9544 40 20.1656 40 21.4286V45.2381C40 46.501 39.4732 47.7122 38.5355 48.6053C37.5979 49.4983 36.3261 50 35 50H5C3.67392 50 2.40215 49.4983 1.46447 48.6053C0.526784 47.7122 0 46.501 0 45.2381V21.4286C0 20.1656 0.526784 18.9544 1.46447 18.0614C2.40215 17.1684 3.67392 16.6667 5 16.6667H7.5V11.9048C7.5 8.74742 8.81696 5.7194 11.1612 3.48682C13.5054 1.25425 16.6848 0 20 0C21.6415 0 23.267 0.307926 24.7835 0.906196C26.3001 1.50447 27.6781 2.38136 28.8388 3.48682C29.9996 4.59228 30.9203 5.90465 31.5485 7.34901C32.1767 8.79336 32.5 10.3414 32.5 11.9048V16.6667H35ZM20 4.7619C18.0109 4.7619 16.1032 5.51445 14.6967 6.854C13.2902 8.19355 12.5 10.0104 12.5 11.9048V16.6667H27.5V11.9048C27.5 10.0104 26.7098 8.19355 25.3033 6.854C23.8968 5.51445 21.9891 4.7619 20 4.7619Z"
                  fill="#8D969B" />
              </svg></span>
            <input type="password" class="box_user ps-3" placeholder="Password" required />
          </div>
        </div>
        <div class="box_login">
          <button class="box_btn_login">login</button>
        </div>
        <div class="box_forget">
          <a href="#">ลืมรหัสผ่าน</a>
        </div>
      </div>
      <div class="box_img_people">
        <img src="../assets/images/login_img.png" width="400" alt="" />
      </div>
    </div>
  </div> -->

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
