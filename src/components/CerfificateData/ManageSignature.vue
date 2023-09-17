<template>
    <div class="d-flex mb-3">
        <div>
            <label style="font-size: 20px;" for="">จัดการข้อมูลเอกสารรับรอง<font color="#e1032b" style="font-size: 20px;"> >
                    ลายเซ็น</font></label>
        </div>
        <div style="margin-left: 55%;">
            <!-- Button trigger modal -->
            <button type="button" class="btn_add  btn outline-red btn-primary" data-bs-toggle="modal" data-bs-target="#add">
                เพิ่มข้อมูล
            </button>
        </div>
    </div>
    <div>
        <div class="card card_sign outline-card stroke_edit">
            <div class="">
                <button class="btn" style="margin-left: 80%; " data-bs-toggle="modal" data-bs-target="#edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 23 22" fill="none">
                        <path
                            d="M5.02942 5.70312H3.85294C3.2289 5.70313 2.63042 5.95102 2.18916 6.39229C1.7479 6.83355 1.5 7.43204 1.5 8.05608V18.6444C1.5 19.2684 1.7479 19.8669 2.18916 20.3082C2.63042 20.7494 3.2289 20.9973 3.85294 20.9973H14.4412C15.0652 20.9973 15.6637 20.7494 16.105 20.3082C16.5462 19.8669 16.7941 19.2684 16.7941 18.6444V17.4679" />
                        <path
                            d="M15.6181 3.35308L19.1475 6.88251M20.7769 5.2178C21.2403 4.75444 21.5006 4.126 21.5006 3.47073C21.5006 2.81545 21.2403 2.18701 20.7769 1.72366C20.3136 1.26031 19.6852 1 19.0299 1C18.3746 1 17.7462 1.26031 17.2828 1.72366L7.38281 11.5884V15.1178H10.9122L20.7769 5.2178Z" />
                    </svg>
                </button>
            </div>
            <div style="text-align: center;">
                <img class="card-img-top " src="src\assets\images\sign.png" alt="" style="width:150px">
            </div>
            <div class="card-body">
                <label class="card-title " style="font-size: 14px; font-weight: bold;" for="">นายปริญญา ก้อนจันทึก
                    (แมน)</label>
                <label class="card-text " style="font-size: 14px;" for="">Senior Human Resources</label>
            </div>
        </div>
    </div>

    <!-- Modal add sign-->
    <div class="modal " id="add" tabindex="-1" aria-labelledby="add" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content rounded-5 ">

                <div class="modal-body">
                    <div style="margin-top: 10%;">
                        <label class="size_font_modal" for="">ชื่อ - นามสกุล</label>
                    </div>
                    <div>
                        <input class="size_input_modal" type="text" placeholder="ชื่อ - นามสกุล">
                    </div>
                    <div>
                        <label class="size_font_modal" for="">ตำแหน่ง</label>
                    </div>
                    <div>
                        <input class="size_input_modal" type="text" placeholder="ตำแหน่ง">
                    </div>
                    <div>
                        <label class="size_font_modal" for="">ลายเซ็นผู้รับรอง</label>
                    </div>
                    <div>
                        <button class=" btn " style="margin: 10px 0px 0px 22%; border-radius: 20px;" id="picture">
                            <input type="file" id="img-upload" accept="image/*" />
                        </button>
                    </div>
                    <div class="d-flex mb-2 " style="margin-left: 10%; margin-top: 20px;">
                        <div class="">
                            <button type="button" class="btn btn-secondary size_btn_modal"
                                data-bs-dismiss="modal">ยกเลิก</button>
                        </div>
                        <div class="" style="margin-left: 18%;">
                            <button type="button" class="btn btn-primary size_btn_modal">บันทึก</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <!-- Modal edit sign-->
    <div class="modal " id="edit" tabindex="-1" aria-labelledby="edit" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content rounded-5 ">

                <div class="modal-body">
                    <div style="margin-top: 10%;">
                        <label class="size_font_modal" for="">ชื่อ - นามสกุล</label>
                    </div>
                    <div>
                        <input class="size_input_modal" type="text" placeholder="ชื่อ - นามสกุล">
                    </div>
                    <div>
                        <label class="size_font_modal" for="">ตำแหน่ง</label>
                    </div>
                    <div>
                        <input class="size_input_modal" type="text" placeholder="ตำแหน่ง">
                    </div>
                    <div>
                        <label class="size_font_modal" for="">ลายเซ็นผู้รับรอง</label>
                    </div>
                    <div>
                        <button class=" btn " style="margin: 10px 0px 0px 22%; border-radius: 20px;" id="picture">
                            <input type="file" id="img-upload" accept="image/*" />
                        </button>
                    </div>
                    <div class="d-flex mb-2 " style="margin-left: 10%; margin-top: 20px;">
                        <div class="">
                            <button type="button" class="btn btn-secondary size_btn_modal"
                                data-bs-dismiss="modal">ยกเลิก</button>
                        </div>
                        <div class="" style="margin-left: 18%;">
                            <button type="button" class="btn btn-primary size_btn_modal">บันทึก</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.btn_add {
    background-color: white;
    border: 1px solid red;
    border-radius: 20px;
    color: red;
    width: 150px;
    height: 35px;
    outline: none;
}

.card_sign {
    border: 1px solid black;
    width: 200px;
    height: 250px;
    border-radius: 20px;
    text-align: center;
}


.size_font_modal {
    font-size: 16px;
    font-weight: bold;
    margin-top: 15px;
    margin-left: 25%;
}

.size_input_modal {
    border: 1px solid black;
    border-radius: 5px;
    margin-left: 25%;
    margin-top: 10px;
}

.size_btn_modal {
    border: 1px solid black;
    border-radius: 20px;
    width: 150px;
}


.stroke_edit {
    stroke: black;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.stroke_edit:hover {
    stroke: var(--main-color);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.outline-card {
    border: 1px solid black;
    color: black;
}

.outline-card:hover {
    border: 1px solid var(--main-color);
    color: var(--main-color);
}
</style>