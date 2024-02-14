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
    <div class="d-flex mb-3" style="width: 100%;">
        <div style="width: 80%;">
            <label style="font-size: 20px" for="">จัดการข้อมูลเอกสารรับรอง
                <font style="font-size: 20px; color: var(--main-color)"> > บริษัท</font>
            </label>
        </div>
        <div style="width: 20%;">
            <!-- Button trigger modal -->
            <button type="button" class="btn_add btn outline-red" data-bs-toggle="modal" data-bs-target="#add">
                เพิ่มข้อมูล
            </button>
        </div>
    </div>
    <div>
        <div class="card card_sign outline-card stroke_edit">
            <div class="">
                <button class="btn" style="margin-left: 80%" data-bs-toggle="modal" data-bs-target="#edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 23 22" fill="none">
                        <path
                            d="M5.02942 5.70312H3.85294C3.2289 5.70313 2.63042 5.95102 2.18916 6.39229C1.7479 6.83355 1.5 7.43204 1.5 8.05608V18.6444C1.5 19.2684 1.7479 19.8669 2.18916 20.3082C2.63042 20.7494 3.2289 20.9973 3.85294 20.9973H14.4412C15.0652 20.9973 15.6637 20.7494 16.105 20.3082C16.5462 19.8669 16.7941 19.2684 16.7941 18.6444V17.4679" />
                        <path
                            d="M15.6181 3.35308L19.1475 6.88251M20.7769 5.2178C21.2403 4.75444 21.5006 4.126 21.5006 3.47073C21.5006 2.81545 21.2403 2.18701 20.7769 1.72366C20.3136 1.26031 19.6852 1 19.0299 1C18.3746 1 17.7462 1.26031 17.2828 1.72366L7.38281 11.5884V15.1178H10.9122L20.7769 5.2178Z" />
                    </svg>
                </button>
            </div>
            <div class="card-body">
                <div class="card-content">
                    <label class="card-title" style="font-size: 14px" for="">ClickNext Co.,Ltd.</label>
                    <br /><br />
                    <label class="card-text" style="font-size: 14px; font-weight: bold" for="">กรุงเทพมหานคร ฯ</label>
                    <br /><br />
                    <label class="card-content" style="font-size: 14px; text-align: left" for="">พญาไท พลาซ่า 128/323-333
                        ชั้น
                        30 ถ. พญาไท แขวงทุ่งพญาไทย เขตราชเทวี
                        กรุงเทพมหานคร 10400</label>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Add sign-->
    <div class="modal" id="add" tabindex="-1" aria-labelledby="add" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-5">
                <div class="modal-body" style="margin: 2rem 0rem 2rem 0rem;">
                    <div>
                        <label class="size_font_modal" for="">ชื่อบริษัท</label>
                    </div>
                    <div>
                        <input class="size_input_modal" type="text" placeholder="ชื่อบริษัท" />
                    </div>
                    <div>
                        <label class="size_font_modal" for="">สาขา</label>
                    </div>
                    <div>
                        <input class="size_input_modal" type="text" placeholder="สาขา" />
                    </div>
                    <div>
                        <label class="size_font_modal" for="">ที่อยู่</label>
                    </div>
                    <div>
                        <textarea class="size_font_modal" name="" id="" cols="30" rows="4" placeholder="ที่อยู่"></textarea>
                    </div>
                    <div class="d-flex mb-2" style="margin-left: 10%; margin-top: 20px">
                        <div class="">
                            <button type="button" class="btn btn-secondary size_btn_modal" data-bs-dismiss="modal">
                                ยกเลิก
                            </button>
                        </div>
                        <div class="" style="margin-left: 18%">
                            <button type="button" class="btn btn-primary size_btn_modal_save" data-bs-toggle="modal"
                                data-bs-target="#add-confirm">
                                บันทึก
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Add-Confirm-add sign-->
    <div class="modal" id="add-confirm" tabindex="-1" aria-labelledby="add-confirm" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-5">
                <div class="modal-body">
                    <div style="width: 100%; text-align: center; padding-top: 30%; padding-bottom: 30%;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-exclamation-triangle-fill mb-3" viewBox="0 0 16 16"
                            style="color: rgb(243, 207, 0); width: 50px; height: 50px;">
                            <path
                                d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        <div class="mb-3" style="width: 100%;">
                            <h3>คุณต้องการบันทึกข้อมูลหรือไม่</h3>
                        </div>
                        <div>
                            <button type="button" class="btn btn-secondary size_btn_modal" data-bs-dismiss="modal" style="margin-right: 10%;">
                                ยกเลิก
                            </button>

                            <button id="SUCCESS" @click="out()" type="button" class="btn btn-primary size_btn_modal_save"
                                data-bs-toggle="modal" data-bs-target="#add-success">
                                ยืนยัน
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Add-Success sign-->
    <div class="modal" id="add-success" tabindex="-1" aria-labelledby="add-success" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-5">
                <div class="modal-body">
                    <div style="width: 100%; text-align: center; padding-top: 30%; padding-bottom: 30%;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-check-circle-fill" viewBox="0 0 16 16"
                            style="color: rgb(0, 160, 0); width: 100px; height: 100px;">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>

                        <div>
                            <br>
                            <h3>บันทึกข้อมูลเสร็จสิ้น</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Edit sign-->
    <div class="modal" id="edit" tabindex="-1" aria-labelledby="edit" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-5">
                <div class="modal-body">
                    <div style="margin-top: 10%">
                        <label class="size_font_modal" for="">ชื่อบริษัท</label>
                    </div>
                    <div>
                        <input class="size_input_modal" type="text" placeholder="ClickNext Co.,Ltd." />
                    </div>
                    <div>
                        <label class="size_font_modal" for="">สาขา</label>
                    </div>
                    <div>
                        <input class="size_input_modal" type="text" placeholder="กรุงเทพมหานคร ฯ" />
                    </div>
                    <div>
                        <label class="size_font_modal" for="">ที่อยู่</label>
                    </div>
                    <div>
                        <textarea class="size_font_modal" name="" id="" cols="30" rows="4"
                            placeholder="เลขที่ 22/14-15 ถนนบางแสน สาย4 เหนือ ตำบลแสนสุข อำเภอเมืองชลบุรี จังหวัดชลบุรี 20130"></textarea>
                    </div>
                    <div class="d-flex mb-2" style="margin-left: 10%; margin-top: 20px">
                        <div class="">
                            <button type="button" class="btn btn-secondary size_btn_modal" data-bs-dismiss="modal">
                                ยกเลิก
                            </button>
                        </div>
                        <div class="" style="margin-left: 18%">
                            <button type="button" class="btn size_btn_modal_save" data-bs-toggle="modal"
                                data-bs-target="#edit-confirm">
                                บันทึก
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Edit-Confirm-add sign-->
    <div class="modal" id="edit-confirm" tabindex="-1" aria-labelledby="edit-confirm" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-5">
                <div class="modal-body">
                    <div style="width: 100%; text-align: center; padding-top: 30%; padding-bottom: 30%;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-exclamation-triangle-fill mb-3" viewBox="0 0 16 16"
                            style="color: rgb(243, 207, 0); width: 50px; height: 50px;">
                            <path
                                d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        <div class="mb-3" style="width: 100%;">
                            <h3>คุณต้องการบันทึกข้อมูลหรือไม่</h3>
                        </div>
                        <div>
                            <button type="button" class="btn btn-secondary size_btn_modal" data-bs-dismiss="modal" style="margin-right: 10%;">
                                ยกเลิก
                            </button>

                            <button type="button" class="btn btn-primary size_btn_modal_save" data-bs-toggle="modal"
                                data-bs-target="#edit-success">
                                ยืนยัน
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Edit-Success sign-->
    <div class="modal" id="edit-success" tabindex="-1" aria-labelledby="edit-success" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-5">
                <div class="modal-body">
                    <div style="width: 100%; text-align: center; padding-top: 30%; padding-bottom: 30%;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-check-circle-fill" viewBox="0 0 16 16"
                            style="color: rgb(0, 160, 0); width: 100px; height: 100px;">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>

                        <div>
                            <br>
                            <h3>บันทึกข้อมูลเสร็จสิ้น</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mathods: {
        out() {
            const showModalButton = document.getElementById('SUCCESS');
            const modal = document.getElementById('add-success');

            showModalButton.addEventListener('click', () => {
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 1);
            });
        }
    }
}
</script>

<style scoped>
.btn_add {
    background-color: white;
    border: 1px solid red;
    border-radius: 5px;
    color: red;
    width: 150px;
    height: 35px;
    outline: none;
}

.card_sign {
    border: 1px solid black;
    width: 15rem;
    height: 20rem;
    border-radius: 20px;
    text-align: center;
}

.card-content {
    margin: 0rem 1rem 0rem 1rem;
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
    /* margin-right: 3rem; */
}

.size_btn_modal_save {
    border: 1px solid black;
    border-radius: 20px;
    width: 150px;
    color: var(--main-color);
    border: 1px solid var(--main-color);
    background-color: white;
}

.size_btn_modal_save:hover {
    border: 1px solid black;
    border-radius: 20px;
    width: 150px;
    color: white;
    border: 1px solid var(--main-color);
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
