<template>
    <div class="col-2 img rounded-circle mb-3">
        <img src="" alt="">
    </div>

    <div class="col ms-5">
        <span class="row h5">ข้อมูลส่วนตัวเกี่ยวกับบริษัท</span>

        <div class="row mb-2">
            <label for="" class="col-2 col-form-label text-gray">รหัสพนักงาน</label>
            <div class="col">
                <input type="text" class="form-control-plaintext" value="123456" readonly>
            </div>

            <label for="" class="col-2 col-form-label text-gray">สถานะพนักงาน</label>
            <div class="col">
                <input type="text" class="form-control-plaintext" value="123456" readonly>
            </div>
        </div>

        <div class="row mb-2">
            <label for="" class="col-2 col-form-label text-gray">อีเมลพนักงาน</label>
            <div class="col">
                <input type="text" class="form-control-plaintext" value="123456" readonly>
            </div>

            <label for="" class="col-2 col-form-label text-gray">ตำแหน่งงาน</label>
            <div class="col">
                <input type="text" class="form-control-plaintext" value="123456" readonly>
            </div>
        </div>
    </div>

    <hr>

    <span class="h5">ข้อมูลส่วนตัว</span>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">ชื่อ-นามสกุล (ไทย)</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">ชื่อเล่น (ไทย)</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">ชื่อ-นามสกุล (อังกฤษ)</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">ชื่อเล่น (อังกฤษ)</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">เลขบัตรประชาชน / พาสปอร์ต</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>

        <div class="col-2">
            <div class="row">
                <label for="" class="col-4 col-form-label text-gray">วันเกิด</label>
                <input type="text" class="col form-control-plaintext" value="123456" readonly>
            </div>
        </div>


        <div class="col">
            <div class="row">
                <label for="" class="col-2 col-form-label text-gray">อายุ</label>
                <input type="text" class="col form-control-plaintext" value="123456" readonly>
            </div>
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">เพศ</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">หมู่เลือด</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">น้ำหนัก (กิโลกรัม)</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">ส่วนสูง (เซนติเมตร)</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">สัญชาติ</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">เชื้อชาติ</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>
    </div>

    <div class="row mb-4">
        <label for="" class="col-2 col-form-label ms-5 text-gray">ศาสนา</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">สถานภาพสมรส</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>
    </div>

    <hr>

    <span class="h5">สถานศึกษา</span>

    <div class="row mb-4">
        <div class="col ms-5">
            <label for="" class="form-label text-gray">ชื่อสถานศึกษา <font color="#e1032b">*</font></label>
            <input type="text" class="form-control-plaintext" value="123456" required readonly>
        </div>

        <div class="col">
            <label for="" class="form-label text-gray">คณะ <font color="#e1032b">*</font></label>
            <input type="text" class="form-control-plaintext" value="123456" required readonly>
        </div>

        <div class="col">
            <label for="" class="form-label text-gray">สาขาวิชา <font color="#e1032b">*</font></label>
            <input type="text" class="form-control-plaintext" value="123456" required readonly>
        </div>
    </div>

    <hr>

    <span class="h5">ข้อมูลที่อยู่ / ติดต่อ</span>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">บ้านเลขที่</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">ซอย</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">หมู่</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">ถนน</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">จังหวัด</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">อำเภอ / เขต</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">ตำบล / แขวง</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">รหัสไปรษณีย์</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>
    </div>

    <div class="row mb-4">
        <label for="" class="col-2 col-form-label ms-5 text-gray">เบอร์โทรศัพท์</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">อีเมลส่วนตัว</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>
    </div>

    <hr>

    <span class="h5">สถานภาพทางทหาร</span>

    <div class="row mb-4">
        <label for="" class="col-2 col-form-label ms-5 text-gray">สถานภาพทางทหาร</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
        </div>

        <label for="" class="col-2 col-form-label text-gray">เหตุผล</label>
        <div class="col">
            <input type="text" class="form-control-plaintext" value="123456" readonly>
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

<script setuo>

</script>

<style scoped>
.img {
    width: 150px;
    height: 150px;
    background-color: #90969E;
}
</style>