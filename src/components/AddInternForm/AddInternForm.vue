<!--
 AddInternForm
 Parent of module add intern by form
 Author : Rawich Piboonsin
 Created date : 04-09-2566
-->

<template>
  <form class="needs-validation" enctype="multipart/form-data" id="form" novalidate>
    <LayoutMenuName pageName="เพิ่มแบบฟอร์ม" />

    <div class="row mx-auto" style="width: 85%;">
      <div class="row border-bottom">
        <div class="col-auto my-3">
          <div class="row">
            <div class="col text-center">
              <img src="" alt="" id="blah" class="img bg-grays-200" />
            </div>
          </div>

          <div class="row mt-3">
            <div class="col">
              <button type="button" class="col-auto btn btn-sm outline-red position-relative px-4" id="picture">
                <input @change="showImg" type="file" id="img-upload" accept="image/*" />

                <svg class="me-1" width="28" height="28" viewBox="0 0 42 42" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19.9474 36.5556H5.21053C4.09383 36.5556 3.02286 36.0873 2.23323 35.2538C1.44361 34.4203 1 33.2899 1 32.1111V12.1111C1 10.9324 1.44361 9.80191 2.23323 8.96841C3.02286 8.13492 4.09383 7.66667 5.21053 7.66667H7.31579C8.43249 7.66667 9.50345 7.19841 10.2931 6.36492C11.0827 5.53142 11.5263 4.40096 11.5263 3.22222C11.5263 2.63285 11.7481 2.06762 12.1429 1.65087C12.5377 1.23413 13.0732 1 13.6316 1H26.2632C26.8215 1 27.357 1.23413 27.7518 1.65087C28.1466 2.06762 28.3684 2.63285 28.3684 3.22222C28.3684 4.40096 28.812 5.53142 29.6017 6.36492C30.3913 7.19841 31.4622 7.66667 32.5789 7.66667H34.6842C35.8009 7.66667 36.8719 8.13492 37.6615 8.96841C38.4511 9.80191 38.8947 10.9324 38.8947 12.1111V19.8889"
                    stroke="var(--main-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path class="stroke-white"
                    d="M34.6854 41.0026V27.6693M34.6854 27.6693L41.0012 34.3359M34.6854 27.6693L28.3697 34.3359M19.9486 27.6693C21.6237 27.6693 23.2301 26.9669 24.4145 25.7166C25.599 24.4664 26.2644 22.7707 26.2644 21.0026C26.2644 19.2345 25.599 17.5388 24.4145 16.2886C23.2301 15.0383 21.6237 14.3359 19.9486 14.3359C18.2736 14.3359 16.6671 15.0383 15.4827 16.2886C14.2982 17.5388 13.6328 19.2345 13.6328 21.0026C13.6328 22.7707 14.2982 24.4664 15.4827 25.7166C16.6671 26.9669 18.2736 27.6693 19.9486 27.6693Z"
                    stroke="var(--main-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                อัปโหลดรูปภาพ
              </button>
            </div>
          </div>
        </div>

        <div class="col ms-5 align-self-center">
          <span class="row h5 mb-3">ข้อมูลส่วนตัวเกี่ยวกับบริษัท</span>

          <div class="row mb-1 grid mb-3">
            <div class="col-md-6">
              <label for="" class="form-label text-gray">รหัสพนักงาน <span class="text-danger">*</span></label>
              <div class="col me-5">
                <input id="id" placeholder="INT-XXXXXX" v-model="formData.code" type="text" class="form-control"
                 :class="{ 'is-invalid': v$.code.$error }" />
                <span v-for="error in v$.code.$errors" :key="error.$uid" class="invalid-feedback">
                  กรุณากรอกข้อมูล
                </span>
              </div>
            </div>

            <div class="col-md-6">
              <label for="" class="form-label text-gray">สถานะพนักงาน <span class="text-danger">*</span></label>
              <div class="col">
                <select id="status" v-model="formData.status" class="form-select"
                  :class="{ 'is-invalid': v$.status.$error }" required>
                  <option disabled selected value=""> เลือก </option>
                  <option v-for="(status, index) in statusList.list" :value="status">
                    {{ status }}
                  </option>
                </select>
                <span v-for="error in v$.status.$errors" :key="error.$uid" class="invalid-feedback">
                  กรุณากรอกข้อมูล
                </span>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="" class="form-label text-gray">อีเมลพนักงาน</label>
              <div class="col me-5">
                <div class="input-group">
                  <input v-model="formData.intern_email" id="internemail" type="text" class="form-control"
                    placeholder="660000" />
                  <span class="input-group-text">@clicknext.com</span>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <label for="" class="form-label text-gray">ตำแหน่งงาน <span class="text-danger">*</span></label>

              <select id="role" class="form-select" v-model="formData.role" required
                :class="{ 'is-invalid': v$.role.$error }">
                <option disabled selected value=""> เลือก </option>
                <option v-for="role in roles" :value="role">{{ role.role_name }}</option>
              </select>
              <span v-for="error in v$.role.$errors" :key="error.$uid" class="invalid-feedback">
                กรุณากรอกข้อมูล
              </span>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="" class="form-label text-gray">ฝ่าย <span class="text-danger">*</span></label>
              <div class="col me-5">
                <select @change="setMentor" id="section" class="form-select" v-model="formData.section"
                  :class="{ 'is-invalid': v$.section.$error }" required>
                  <option disabled selected value=""> เลือก </option>
                  <option v-for="section in sections" :value="section">{{ section.sec_name }}</option>
                </select>
                <span v-for="error in v$.section.$errors" :key="error.$uid" class="invalid-feedback">
                  กรุณากรอกข้อมูล
                </span>
              </div>
            </div>

            <div class="col-md-6">
              <label for="" class="form-label text-gray">พี่เลี้ยง <span class="text-danger">*</span></label>
              <div class="col">
                <select id="mentor" class="form-select" v-model="formData.mentor"
                  :class="{ 'is-invalid': v$.mentor.$error }" required>
                  <option disabled selected value=""> เลือก (ต้องเลือกฝ่ายก่อน) </option>
                  <option v-for="mentor in mentors" :value="mentor">{{ mentor.ment_fname + ' ' + mentor.ment_lname }}
                  </option>
                </select>
                <span v-for="error in v$.mentor.$errors" :key="error.$uid" class="invalid-feedback">
                  กรุณากรอกข้อมูล
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="row border-bottom">
        <span class="h5 mb-3">ข้อมูลส่วนตัว</span>

        <div class="row mb-2">
          <div class="col-md-2 ms-1 mb-2">
            <label for="" class="form-label text-gray">คำนำหน้า (ไทย) <span class="text-danger">*</span></label>
            <select id="thprefix" class="form-select" v-model="formData.prefix"
              :class="{ 'is-invalid': v$.prefix.$error }" required>
              <option disabled selected :value="['', '']"> เลือก </option>
              <option v-for="(prefix, index) in prefixList.list" :value="prefix">
                {{ prefix[0] }}
              </option>
            </select>
            <span v-for="error in v$.prefix.$errors" :key="error.$uid" class="invalid-feedback">
              กรุณากรอกข้อมูล
            </span>
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">ชื่อจริง (ไทย) <span class="text-danger">*</span></label>
            <input id="fname_th" v-model="formData.fname[0]" type="text" placeholder="สมศรี" name="fname"
              class="form-control" :class="{ 'is-invalid': v$.fname.$error }" required />
            <span v-for="error in v$.fname.$errors" :key="error.$uid" class="invalid-feedback">
              กรุณากรอกข้อมูล
            </span>
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">นามสกุล (ไทย) <span class="text-danger">*</span></label>
            <input id="lname_th" v-model="formData.lname[0]" placeholder="ลามากุล" type="text" name="lname"
              class="form-control" :class="{ 'is-invalid': v$.lname.$error }" required />
            <span v-for="error in v$.lname.$errors" :key="error.$uid" class="invalid-feedback">
              กรุณากรอกข้อมูล
            </span>
          </div>

          <div class="col-md-2">
            <label for="" class="form-label text-gray">ชื่อเล่น (ไทย) <span class="text-danger">*</span></label>
            <input id="nickname_th" v-model="formData.nickname[0]" placeholder="นวล" type="text" class="form-control"
              :class="{ 'is-invalid': v$.nickname.$error }" required />
            <span v-for="error in v$.nickname.$errors" :key="error.$uid" class="invalid-feedback">
              กรุณากรอกข้อมูล
            </span>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-2 ms-1">
            <label for="" class="form-label text-gray">คำนำหน้า
              (อังกฤษ)
            </label>
            <input :value="formData.prefix[1]" type="text" class="form-control" id="enprefix" readonly />
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">ชื่อจริง (อังกฤษ)</label>
            <input id="fname_en" placeholder="Somsri" v-model="formData.fname[1]" type="text" class="form-control" />
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">นามสกุล (อังกฤษ)</label>
            <input id="lname_en" placeholder="Lamakul" v-model="formData.lname[1]" type="text" class="form-control" />
          </div>

          <div class="col-2">
            <label for="" class="form-label text-gray">ชื่อเล่น (อังกฤษ)</label>
            <input id="nickname_en" v-model="formData.nickname[1]" placeholder="Nual" type="text"
              class="form-control" />
          </div>
        </div>

        <div class="row mb-2">
          <div class="col-md-6 ms-1">
            <label for="" class="form-label text-gray">เลขบัตรประชาชน/พาสปอร์ต</label>
            <div class="col me-5">
              <input id="citizenid" v-model="formData.citizen_id" maxlength="13" type="text"
                class="form-control mb-2" />
            </div>
          </div>

          <div class="col-md-5">
            <label for="" class="form-label text-gray">วันเกิด </label>
            <input id="birthdate" v-model="formData.birth_date" type="date" class="col form-control mb-2" />
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">อายุ (ปี)</label>
            <input type="text" class="col form-control mb-2" :value="getAge(formData.birth_date) || 0" readonly
              disabled />
          </div>
        </div>

        <div class="row mb-2">
          <div class="col ms-1">
            <label for="" class="form-label text-gray">เพศ <span class="text-danger">*</span></label>
            <div class="col me-5">
              <select id="gender" v-model="formData.gender" class="form-select"
                :class="{ 'is-invalid': v$.gender.$error }" required>
                <option disabled selected value=""> เลือก </option>
                <option v-for="gender in genderList.list" :value="gender">
                  {{ gender }}
                </option>
              </select>
              <span v-for="error in v$.gender.$errors" :key="error.$uid" class="invalid-feedback">
                กรุณากรอกข้อมูล
              </span>
            </div>
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">หมู่เลือด</label>
            <div class="col">
              <select id="bloodtype" v-model="formData.blood_type" class="form-select mb-2">
                <option disabled selected value=""> เลือก </option>
                <option v-for="bloodType in bloodTypeList.list" :value="bloodType">
                  {{ bloodType }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="row mb-2">
          <div class="col ms-1">
            <label for="" class="form-label text-gray">น้ำหนัก (กิโลกรัม)</label>
            <div class="col me-5">
              <input id="weight" v-model="formData.weight" type="number" class="form-control mb-2" />
            </div>
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">ส่วนสูง (เซนติเมตร)</label>
            <div class="col">
              <input id="height" v-model="formData.height" type="number" class="form-control mb-2" />
            </div>
          </div>
        </div>

        <div class="row mb-2">
          <div class="col ms-1">
            <label for="" class="form-label text-gray">สัญชาติ</label>
            <div class="col me-5">
              <input id="nationality" placeholder="ไทย" v-model="formData.nationality" type="text"
                class="form-control mb-2" />
            </div>
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">เชื้อชาติ</label>
            <div class="col">
              <input id="nation" placeholder="ไทย" v-model="formData.nation" type="text" class="form-control mb-2" />
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col ms-1">
            <label for="" class="form-label text-gray">ศาสนา</label>
            <div class="col me-5">
              <input id="religion" placeholder="พุทธ" v-model="formData.religion" type="text"
                class="form-control mb-2" />
            </div>
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">สถานภาพสมรส</label>
            <div class="col">
              <select id="martial" v-model="formData.martial_status" class="form-select mb-2">
                <option disabled selected value=""> เลือก </option>
                <option v-for="martialStatus in martialStatusList.list" :value="martialStatus">
                  {{ martialStatus }}
                </option>
              </select>
            </div>
          </div>
        </div>

      </div>

      <div class="row border-bottom">
        <span class="h5 mb-3">สถานศึกษา</span>

        <div class="row mb-4">
          <div class="col ms-1">
            <label for="" class="form-label text-gray">ชื่อสถานศึกษา <span class="text-danger">*</span></label>
            <select id="university" class="form-select" v-model="formData.university" @change="setFaculty"
              :class="{ 'is-invalid': v$.university.$error }" required>
              <option disabled selected value=""> เลือก </option>
              <option v-for="university in universities" :value="university">
                {{ university.uni_name }}
              </option>
            </select>
            <span v-for="error in v$.university.$errors" :key="error.$uid" class="invalid-feedback">
              กรุณากรอกข้อมูล
            </span>
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">คณะ <span class="text-danger">*</span></label>
            <select id="faculty" class="form-select" v-model="formData.faculty" @change="setMajor"
              :class="{ 'is-invalid': v$.faculty.$error }" required>
              <option disabled selected value=""> เลือก (ต้องเลือกสถานศึกษาก่อน) </option>
              <option v-for="faculty in faculties" :value="faculty">
                {{ faculty.fac_name }}
              </option>
            </select>
            <span v-for="error in v$.faculty.$errors" :key="error.$uid" class="invalid-feedback">
              กรุณากรอกข้อมูล
            </span>
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">สาขาวิชา <span class="text-danger">*</span></label>
            <select id="major" class="form-select" v-model="formData.major" :class="{ 'is-invalid': v$.major.$error }"
              required>
              <option disabled selected value=""> เลือก (ต้องเลือกคณะก่อน) </option>
              <option v-for="major in majors" :value="major">{{ major.maj_name }}</option>
            </select>
            <span v-for="error in v$.major.$errors" :key="error.$uid" class="invalid-feedback">
              กรุณากรอกข้อมูล
            </span>
          </div>
        </div>

      </div>

      <div class="row border-bottom">
        <span class="h5 mb-3">สัญญาการจ้างงาน</span>

        <div class="row mb-2">
          <div class="col-md-6 ms-1">
            <label for="" class="form-label text-gray">ประเภทพนักงาน <span class="text-danger">*</span></label>
            <select id="interntype" v-model="formData.intern_type" class="form-select"
              :class="{ 'is-invalid': v$.intern_type.$error }" required>
              <option disabled value=""> เลือก </option>
              <option v-for="internType in internTypeList.list" :value="internType">
                {{ internType }}
              </option>
            </select>
            <span v-for="error in v$.intern_type.$errors" :key="error.$uid" class="invalid-feedback">
              กรุณากรอกข้อมูล
            </span>
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">เลขที่สัญญาจ้าง</label>
            <input id="contractnum" v-model="formData.contract_number" type="text" class="form-control mb-2" />
          </div>

        </div>

        <div class="row mb-4">
          <div class="col ms-1">
            <label for="" class="form-label text-gray">วันที่เริ่มฝึกงาน <span class="text-danger">*</span></label>
            <input id="startdate" v-model="formData.start_date" type="date" class="form-control"
              :class="{ 'is-invalid': v$.start_date.$error }" required />
            <span v-for="error in v$.start_date.$errors" :key="error.$uid" class="invalid-feedback">
              กรุณากรอกข้อมูล
            </span>
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">วันที่ผ่านทดลองงาน</label>
            <input id="enddate" v-model="formData.end_date" type="date" class="form-control mb-2" />
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">วันสุดท้ายที่มาทำงาน</label>
            <input id="lastwork" v-model="formData.last_work_date" type="date" class="form-control mb-2" />
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">วันที่สิ้นสุดสัญญา</label>
            <input id="contractend" v-model="formData.contract_end_date" type="date" class="form-control mb-2" />
          </div>
        </div>
      </div>



      <div class="row border-bottom">
        <span class="h5 mb-3">ข้อมูลที่อยู่ / ติดต่อ</span>

        <div class="row mb-3">
          <div class="col ms-1">
            <label for="" class="form-label text-gray">บ้านเลขที่</label>
            <div class="col me-5">
              <input v-model="formData.house_number" type="text" class="form-control" />
            </div>
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">ซอย</label>
            <div class="col">
              <input v-model="formData.alley" type="text" class="form-control" />
            </div>
          </div>
        </div>

        <div class="row mb-2 me-5">
          <div class="col ms-1">
            <label for="" class="form-label text-gray">หมู่</label>
            <div class="col me-5">
              <input v-model="formData.village_number" type="number" class="form-control mb-2" />
            </div>
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">ถนน</label>
            <div class="col">
              <input v-model="formData.street" type="text" class="form-control mb-2" />
            </div>
          </div>
        </div>

        <div class="row mb-2">
          <div class="col ms-1">
            <label for="" class="form-label text-gray">ตำบล / แขวง</label>
            <div class="col me-5">
              <input id="district" v-model="formData.subdistrict" type="text" class="form-control mb-2" />
            </div>
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">อำเภอ / เขต</label>
            <div class="col">
              <input id="amphoe" v-model="formData.district" type="text" class="form-control mb-2" />
            </div>
          </div>
        </div>

        <div class="row mb-2">
          <div class="col ms-1">
            <label for="" class="form-label text-gray">จังหวัด</label>
            <div class="col me-5">
              <input id="province" v-model="formData.province" type="text" class="form-control mb-2" />
            </div>
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">รหัสไปรษณีย์</label>
            <div class="col">
              <input id="zipcode" v-model="formData.post_code" type="number" class="form-control mb-2" />
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col ms-1">
            <label for="" class="form-label text-gray">เบอร์โทรศัพท์ <span class="text-danger">*</span></label>
            <div class="col me-5">
              <input id="tel" placeholder="xxx-xxx-xxxx" v-model="formData.tel" maxlength="10" type="text"
                class="form-control" :class="{ 'is-invalid': v$.tel.$error }" required />
              <span v-for="error in v$.tel.$errors" :key="error.$uid" class="invalid-feedback">
                กรุณากรอกข้อมูล
              </span>
            </div>
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">อีเมลส่วนตัว <span class="text-danger">*</span></label>
            <div class="col">
              <input id="email" placeholder="example@gmail.com" name="email" v-model="formData.email" type="text"
                class="form-control" :class="{ 'is-invalid': v$.email.$error }" required />
              <span v-for="error in v$.email.$errors" :key="error.$uid" class="invalid-feedback">
                กรุณากรอกข้อมูล
              </span>
            </div>

          </div>
        </div>

      </div>

      <div class="row border-bottom">
        <span class="h5 mb-3">สถานภาพทางทหาร</span>

        <div class="row mb-4">
          <div class="col ms-1">
            <label for="" class="form-label text-gray">สถานภาพทางทหาร</label>
            <div class="col me-5">
              <select id="military" v-model="formData.military_status" class="form-select mb-2">
                <option disabled selected value=""> เลือก </option>
                <option v-for="militaryStatus in militaryStatusList.list" :value="militaryStatus">
                  {{ militaryStatus }}
                </option>
              </select>
            </div>
          </div>

          <div class="col">
            <label for="" class="form-label text-gray">เหตุผล</label>
            <div class="col">
              <input id="reason" v-model="formData.reason" type="text" class="form-control mb-2" />
            </div>
          </div>
        </div>
      </div>

      <div class="row border-bottom">
        <span class="h5 mb-3">หมายเหตุอื่น ๆ เกี่ยวกับนักศึกษา</span>

        <div class="row">
          <label for="" class="col ms-1 form-label text-gray">หมายเหตุ</label>
        </div>

        <div class="row mb-4">
          <textarea name="" class="form-control mb-2 col ms-1" id="" rows="2"></textarea>
        </div>
      </div>


      <div class="row my-4">
        <button type="button" class="col-md-2 btn outline-gray" @click="$router.push({ name: 'index' })">
          ย้อนกลับ
        </button>
        <button type="reset" class="col-md-2 ms-auto btn outline-red me-4" @click="formData = null">รีเซ็ต</button>
        <button type="button" class="col-md-2 align-self-end btn outline-red" @click="confirmation">
          บันทึก
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { onUnmounted, onMounted } from "vue";
  import Swal from "sweetalert2";
  import {
    usePrefixData,
    useStatusData,
    useMilitaryStatus,
    useGenderData,
    useMartialStatus,
    useInternType,
    useBloodType,
  } from "../../stores/constData";
  import { useInternFormData } from "../../stores/addInternFormData";
  import { getAge, isRequire } from "../../assets/js/func";
  import apiService from "../../services/api";
  import router from '@/router';
  import useVuelidate from '@vuelidate/core' // validate
  import { required } from '@vuelidate/validators' // validate

  const formData = ref(useInternFormData());
  const apiCall = new apiService();
  const roles = ref({})
  const sections = ref({});
  const mentors = ref()
  const universities = ref({});
  const faculties = ref();
  const majors = ref();
  const prefixList = ref(usePrefixData());
  const statusList = ref(useStatusData());
  const internTypeList = ref(useInternType());
  const militaryStatusList = ref(useMilitaryStatus());
  const genderList = ref(useGenderData());
  const martialStatusList = ref(useMartialStatus());
  const bloodTypeList = ref(useBloodType());
  const valid = ref(false) // validate

  // validate
  const rules = {
    code: { required },
    status: { required },
    role: { required },
    section: { required },
    mentor: { required },
    prefix: {
      "0": { required },
    },
    fname: {
      "0": { required },
    },
    lname: {
      "0": { required },
    },
    nickname: {
      "0": { required },
    },
    gender: { required },
    university: { required },
    faculty: { required },
    major: { required },
    tel: { required },
    email: { required },
    intern_type: { required },
    start_date: { required },
  }

  const v$ = useVuelidate(rules, formData.value) // validate

  async function submitForm() {
    await apiCall.createIntern(formData.value)
      .then(() => {
        Swal.fire({
          icon: 'success',
          text: 'บันทึกข้อมูลเสร็จสิ้น',
          showConfirmButton: false,
          timer: 3000
        }).then(() => {
          router.push({ name: 'index' })
        })
      })
  }

  async function confirmation() {
    const result = await v$.value.$validate()
    if (result) {
      console.log(formData.value)
      Swal.fire({
        text: "คุณต้องการบันทึกข้อมูลหรือไม่",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        confirmButtonColor: "var(--main-color)",
        reverseButtons: true,
        focusConfirm: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          submitForm()
        }
      });
    }
  }

  function setFaculty() {
    faculties.value = formData.value.university.faculties;
    formData.value.major = '';
    formData.value.faculty = '';
  }

  function setMajor() {
    majors.value = formData.value.faculty.majors;
    formData.value.major = '';
  }

  function setMentor() {
    mentors.value = formData.value.section.mentors
    formData.value.mentor = '';
  }

  function showImg() {
    const imgUpload = document.getElementById("img-upload");

    if (imgUpload.files[0] != undefined) {
      formData.value.image = imgUpload.files[0];
    }

    if (formData.value.image) {
      blah.src = URL.createObjectURL(formData.value.image);
    }
  }

  onMounted(async () => {
    universities.value = await apiCall.getAllUniversity();
    sections.value = await apiCall.getSectionWithMentor();
    roles.value = await apiCall.getAllRole();
    setMentor();
    setFaculty();
    setMajor();

    $.Thailand({
      $district: $('#district'), // input ของตำบล
      $amphoe: $('#amphoe'), // input ของอำเภอ
      $province: $('#province'), // input ของจังหวัด
      $zipcode: $('#zipcode'), // input ของรหัสไปรษณีย์
      onDataFill: function (data) {

        console.info('Data Filled', data);

      },

      onLoad: function () {

        console.info('Autocomplete is ready!');

        $('#loader, .demo').toggle();

      }
    });
  });
</script>

<style scoped>
  .bg-grays-200 {
    background-color: #8d969b30 !important;
  }

  hr {
    border: none;
    height: 1px;
    background-color: var(--main-color);
  }

  .img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    border: 1px solid var(--main-color);
  }

  .text-gray {
    color: #90969e !important;
  }

  .border-bottom {
    border-color: var(--main-color) !important;
    margin-bottom: 12px;
  }
</style>