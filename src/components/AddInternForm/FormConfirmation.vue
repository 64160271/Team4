<template>
    <div class="col-2 img-size rounded-circle mb-3">
        <img src="" alt="" id="blah" class="img rounded-circle">
    </div>

    <div class="col ms-5">
        <span class="row h5">ข้อมูลส่วนตัวเกี่ยวกับบริษัท</span>

        <div class="row mb-2">
            <label for="" class="col-2 col-form-label text-gray">รหัสพนักงาน</label>
            <div class="col">
                <input type="text" class="form-control-plaintext" v-model="mergedData.id" readonly>
            </div>

            <label for="" class="col-2 col-form-label text-gray">สถานะพนักงาน</label>
            <div class="col">
                <input type="text" class="form-control-plaintext" v-model="mergedData.status" readonly>
            </div>
        </div>

        <div class="row mb-2">
            <label for="" class="col-2 col-form-label text-gray">อีเมลพนักงาน</label>
            <div class="col">
                <input type="text" class="form-control-plaintext" v-model="mergedData.emp_email" readonly>
            </div>

            <label for="" class="col-2 col-form-label text-gray">ตำแหน่งงาน</label>
            <div class="col">
                <input type="text" class="form-control-plaintext" v-model="mergedData.role" readonly>
            </div>
        </div>
    </div>

    <hr>

    <span class="h5">ข้อมูลส่วนตัว</span>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">ชื่อ-นามสกุล (ไทย)</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="fullName.thai" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">ชื่อเล่น (ไทย)</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="fullName.nickname_th"  readonly>
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">ชื่อ-นามสกุล (อังกฤษ)</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="fullName.eng" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">ชื่อเล่น (อังกฤษ)</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="fullName.nickname_en" readonly>
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">เลขบัตรประชาชน / พาสปอร์ต</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.citizen_id" readonly>
        </div>

        <div class="col-2">
            <div class="row">
                <label for="" class="col-4 col-form-label text-gray">วันเกิด</label>
                <input type="text" class="col form-control-plaintext" v-model="mergedData.birth_date" readonly>
            </div>
        </div>


        <div class="col">
            <div class="row">
                <label for="" class="col-2 col-form-label text-gray">อายุ</label>
                <input type="text" class="col form-control-plaintext" v-model="mergedData.age" readonly>
            </div>
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">เพศ</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.gender" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">หมู่เลือด</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.blood_type" readonly>
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">น้ำหนัก (กิโลกรัม)</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.weight" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">ส่วนสูง (เซนติเมตร)</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.height" readonly>
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">สัญชาติ</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.nationality" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">เชื้อชาติ</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.nation" readonly>
        </div>
    </div>

    <div class="row mb-4">
        <label for="" class="col-2 col-form-label ms-5 text-gray">ศาสนา</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.religion" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">สถานภาพสมรส</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.marital_status" readonly>
        </div>
    </div>

    <hr>

    <span class="h5">สถานศึกษา</span>

    <div class="row mb-4">
        <div class="col ms-5">
            <label for="" class="form-label text-gray">ชื่อสถานศึกษา <font color="#e1032b">*</font></label>
            <input type="text" class="form-control-plaintext" v-model="mergedData.university" required readonly>
        </div>

        <div class="col">
            <label for="" class="form-label text-gray">คณะ <font color="#e1032b">*</font></label>
            <input type="text" class="form-control-plaintext" v-model="mergedData.faculty" required readonly>
        </div>

        <div class="col">
            <label for="" class="form-label text-gray">สาขาวิชา <font color="#e1032b">*</font></label>
            <input type="text" class="form-control-plaintext" v-model="mergedData.major" required readonly>
        </div>
    </div>

    <hr>

    <span class="h5">ข้อมูลที่อยู่ / ติดต่อ</span>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">บ้านเลขที่</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.house_number" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">ซอย</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.alley" readonly>
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">หมู่</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.village_number" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">ถนน</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.street" readonly>
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">จังหวัด</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.province" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">อำเภอ / เขต</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.district" readonly>
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">ตำบล / แขวง</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.subdistrict" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">รหัสไปรษณีย์</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.post_code" readonly>
        </div>
    </div>

    <div class="row mb-4">
        <label for="" class="col-2 col-form-label ms-5 text-gray">เบอร์โทรศัพท์</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.tel" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">อีเมลส่วนตัว</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.email" readonly>
        </div>
    </div>

    <hr>

    <span class="h5">สถานภาพทางทหาร</span>

    <div class="row mb-4">
        <label for="" class="col-2 col-form-label ms-5 text-gray">สถานภาพทางทหาร</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.military_status" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">เหตุผล</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" v-model="mergedData.reason" readonly>
        </div>
    </div>

    <hr>

    <span class="h5">หมายเหตุอื่น ๆ เกี่ยวกับนักศึกษา</span>

    <div class="row">
        <label for="" class="col form-label ms-5 text-gray">หมายเหตุ</label>
    </div>

    <div class="row mb-4">
        <textarea name="" class="form-control col ms-5" id="" rows="2"></textarea>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onUnmounted, onMounted } from 'vue'

const fullName = ref(
    {
        thai: "",
        eng: "",
        nickname_th: "",
        nickname_en: "",
    }
)

const mergedData = ref({})
const prop = defineProps({
    formData: Array
});

onMounted(() => {
    prop.formData.forEach((data) => {
        mergedData.value = Object.assign(mergedData.value, data)

        if (data.fname) {
            fullName.value = {
                thai: data.prefix[0] + data.fname[0] + " " + data.lname[0],
                eng: data.prefix[1] + data.fname[1] + " " + data.lname[1],
                nickname_th: data.nickname[0],
                nickname_en: data.nickname[1]
            }
        }
    })

    const file = mergedData.value.img

    if (file) {
        blah.src = URL.createObjectURL(file)
    }

})
</script>

<style scoped>
.img {
    height: 100%;
    width: 100%;
    object-fit: fill;
}
.img-size {
    width: 150px;
    height: 150px;
    background-color: #90969E;
}
</style>