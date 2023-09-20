<!-- <template>
    <div class="navigator">
        <p>
            <span> จัดการข้อมูลเอกสารรับรอง <span class="navigator-now">> บริษัท</span> </span>
            <button class="btn-insert">เพิ่มข้อมูล</button>
        </p>
    </div>

    <div class="content">
        <li class="icon" style="margin-left: 80%; " data-bs-toggle="modal" data-bs-target="#edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square"
                viewBox="0 0 16 16">
                <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
        </li>

        <br>
        <p>ClickNext Co.,Ltd.</p>
        <br />
        <p class="province">กรุงเทพมหานคร ฯ</p>
        <br />
        <p class="con-p">
            พญาไท พลาซ่า 128/323-333 ชั้น 30 ถ. พญาไท แขวงทุ่งพญาไทย เขตราชเทวี
            กรุงเทพมหานคร 10400
        </p>
    </div>
</template>

<script setup>

</script>

<style scoped>
.icon svg {
    float: right;
    width: 20px;
    height: 20px;
}

.content {
    border: 1px solid black;
    width: 300px;
    height: 360px;
    padding: 20px 40px 20px 40px;
    border-radius: 30px;
    text-align: center;
    margin: 40px 0px 0px 40px;
    list-style: none;
}

.province {
    font-weight: bold;
}

.btn-insert:hover {
    color: white;
    background-color: var(--main-color);
    transition: transform 0.5s;
}

.navigator button {
    border-radius: 30px;
    padding: 10px 50px 10px 50px;
    border: 2px solid var(--main-color);
    color: var(--main-color);
    background-color: white;
    float: right;
    vertical-align: middle;
}

.navigator-now {
    color: var(--main-color);
}

.con-p {
    text-align: left;
}
</style> -->

<template>
    <div class="d-flex mb-3">
        <div>
            <label style="font-size: 20px;" for="">จัดการข้อมูลเอกสารรับรอง<font style="font-size: 20px; color: var(--main-color);"> >
                    บริษัท</font></label>
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
            <div class="card-body">
                <label class="card-title " style="font-size: 14px;" for="">ClickNext Co.,Ltd.</label>
                <br><br>
                <label class="card-text " style="font-size: 14px; font-weight: bold;" for="">กรุงเทพมหานคร ฯ</label>
                <br><br>
                <label class="card-content " style="font-size: 14px; text-align: left;" for="">พญาไท พลาซ่า 128/323-333 ชั้น 30 ถ. พญาไท แขวงทุ่งพญาไทย เขตราชเทวี
            กรุงเทพมหานคร 10400</label>
            </div>
        </div>
    </div>

    <!-- Modal add sign-->
    <div class="modal " id="add" tabindex="-1" aria-labelledby="add" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content rounded-5 ">

                <div class="modal-body">
                    <div style="margin-top: 10%;">
                        <label class="size_font_modal" for="">ชื่อบริษัท</label>
                    </div>
                    <div>
                        <input class="size_input_modal" type="text" placeholder="ชื่อบริษัท">
                    </div>
                    <div>
                        <label class="size_font_modal" for="">สาขา</label>
                    </div>
                    <div>
                        <input class="size_input_modal" type="text" placeholder="สาขา">
                    </div>
                    <div>
                        <label class="size_font_modal" for="">ที่อยู่</label>
                    </div>
                    <div>
                        <textarea class="size_font_modal" name="" id="" cols="30" rows="4" placeholder="ที่อยู่"></textarea>
                    </div>
                    <div class="d-flex mb-2 " style="margin-left: 10%; margin-top: 20px;">
                        <div class="">
                            <button type="button" class="btn btn-secondary size_btn_modal"
                                data-bs-dismiss="modal">ยกเลิก</button>
                        </div>
                        <div class="" style="margin-left: 18%;">
                            <button type="button" class="btn btn-primary size_btn_modal_save">บันทึก</button>
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
                        <label class="size_font_modal" for="">ชื่อบริษัท</label>
                    </div>
                    <div>
                        <input class="size_input_modal" type="text" placeholder="ClickNext Co.,Ltd.">
                    </div>
                    <div>
                        <label class="size_font_modal" for="">สาขา</label>
                    </div>
                    <div>
                        <input class="size_input_modal" type="text" placeholder="กรุงเทพมหานคร ฯ">
                    </div>
                    <div>
                        <label class="size_font_modal" for="">ที่อยู่</label>
                    </div>
                    <div>
                        <textarea class="size_font_modal" name="" id="" cols="30" rows="4" placeholder="เลขที่ 22/14-15 ถนนบางแสน สาย4 เหนือ ตำบลแสนสุข อำเภอเมืองชลบุรี จังหวัดชลบุรี 20130"></textarea>
                    </div>
                    <div class="d-flex mb-2 " style="margin-left: 10%; margin-top: 20px;">
                        <div class="">
                            <button type="button" class="btn btn-secondary size_btn_modal"
                                data-bs-dismiss="modal">ยกเลิก</button>
                        </div>
                        <div class="" style="margin-left: 18%;">
                            <button type="button" class="btn size_btn_modal_save">บันทึก</button>
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
    height: 280px;
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
    color: gray;
    background-color: white;
}

.size_btn_modal_save{
    border: 1px solid black;
    border-radius: 20px;
    width: 150px;
    color: var(--main-color);
    background-color: white;
}

.size_btn_modal_save:hover {
    border: 1px solid black;
    border-radius: 20px;
    width: 150px;
    color: white;
    background-color: var(--main-color);
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