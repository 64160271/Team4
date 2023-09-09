<template>
    <div class="row mb-3">
        <span>ข้อมูลส่วนตัว</span>
    </div>

    <hr>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">คำนำหน้า (ไทย) <font color="#e1032b">*</font></label>
            <select name="prefix_thai" id="prefix_thai" class="form-control" required>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
            </select>
        </div>

        <div class="col">
            <label for="" class="form-label">คำนำหน้า (อังกฤษ)<font color="#e1032b">*</font></label>
            <select name="prefix_eng" id="prefix_eng" class="form-control" required>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
            </select>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">ชื่อจริง (ไทย) <font color="#e1032b">*</font></label>
            <input type="text" class="form-control" placeholder="พนิดา" required>
        </div>

        <div class="col">
            <label for="" class="form-label">ชื่อจริง (อังกฤษ) <font color="#e1032b">*</font></label>
            <input type="text" class="form-control" placeholder="Phanida" required>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">นามสกุล (ไทย) <font color="#e1032b">*</font></label>
            <input type="text" class="form-control" placeholder="ถำวาปี" required>
        </div>

        <div class="col">
            <label for="" class="form-label">นามสกุล (อังกฤษ) <font color="#e1032b">*</font></label>
            <input type="text" class="form-control" placeholder="Thamwapee" required>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">ชื่อเล่น (ไทย) <font color="#e1032b">*</font></label>
            <input type="text" class="form-control" placeholder="ไอซ์" required>
        </div>

        <div class="col">
            <label for="" class="form-label">ชื่อเล่น (อังกฤษ) <font color="#e1032b">*</font></label>
            <input type="text" class="form-control" placeholder="Ice" required>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">เลขบัตรประชาชน/พาสปอร์ต <font color="#e1032b">*</font></label>
            <input type="text" class="form-control" placeholder="xxxxxxxxxxxxx" required>
        </div>
    </div>
    
    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">วัน/เดือน/ปีเกิด <font color="#e1032b">*</font></label>
            <input type="date" class="form-control" placeholder="DD/MM/YYYY" required>
        </div>

        <div class="col">
            <label for="" class="form-label">อายุ</label>
            <input type="text" class="form-control" placeholder="0" disabled>
        </div>
        
        <div class="col">
            <label for="" class="form-label">เพศ <font color="#e1032b">*</font></label>
            <select name="gender" id="gender" class="form-control" required>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
                <option value="ไม่ระบุ">ไม่ระบุ</option>
            </select>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">หมู่เลือด <font color="#e1032b">*</font></label>
            <select name="blood" id="blood" class="form-control" required>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="O">O</option>
                <option value="AB">AB</option>
            </select>
        </div>

        <div class="col">
            <label for="" class="form-label">น้ำหนัก (กิโลกรัม)</label>
            <input type="text" class="form-control" placeholder="50.00">
        </div>

        <div class="col">
            <label for="" class="form-label">ส่วนสูง (เซนติเมตร)</label>
            <input type="text" class="form-control" placeholder="170.00">
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">สัญชาติ <font color="#e1032b">*</font></label>
            <input type="text" class="form-control" placeholder="ไทย" required>
        </div>

        <div class="col">
            <label for="" class="form-label">เชื้อชาติ <font color="#e1032b">*</font></label>
            <input type="text" class="form-control" placeholder="ไทย" required>
        </div>

        <div class="col">
            <label for="" class="form-label">ศาสนา <font color="#e1032b">*</font></label>
            <input type="text" class="form-control" placeholder="พุทธ" required>
        </div>
    </div>

    <div class="row mb-5">
        <div class="col">
            <label for="" class="form-label">สถานภาพสมรส <font color="#e1032b">*</font></label>
            <select name="marital_status" id="marital_status" class="form-control" required>
                <option value="โสด">โสด</option>
                <option value="มีแฟนแล้ว">มีแฟนแล้ว</option>
                <option value="หมั้น">หมั้น</option>
                <option value="สมรส">สมรส</option>
                <option value="แยกกันอยู่">แยกกันอยู่</option>
                <option value="หย่าร้าง">หย่าร้าง</option>
                <option value="หม้าย">หม้าย</option>
                <option value="ซับซ้อน">ซับซ้อน</option>
            </select>
        </div>
    </div>

    <div class="row mb-3">
        <span>ข้อมูลสถานศึกษา</span>
    </div>

    <hr>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">ชื่อสถานศึกษา <font color="#e1032b">*</font></label>
            <select name="university" id="university" class="form-control" required>
                <option value="-">-</option>
            </select>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">คณะ <font color="#e1032b">*</font></label>
            <select name="faculty" id="faculty" class="form-control" required>
                <option value="-">-</option>
            </select>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">สาขาวิชา <font color="#e1032b">*</font></label>
            <select name="major" id="major" class="form-control" required>
                <option value="-">-</option>
            </select>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped></style>