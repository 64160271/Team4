<template>
    <div>
        <div class="d-flex">
            <div class="">
                <button class="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                        <path
                            d="M11.4008 1.70312L3.10078 10.0031L11.4008 18.3031L10.0008 19.7031L0.300781 10.0031L10.0008 0.303123L11.4008 1.70312Z"
                            fill="black" />
                        <path d="M1.69922 11L1.69922 9L18.6992 9V11L1.69922 11Z" fill="black" />
                    </svg>
                </button>
            </div>

            <div class="" style="margin-left: 5%; margin-top: 5px;">
                <label style="font-size: 20px; color: var(--main-color); font-weight: bold;" for="">
                    จัดการข้อมูลเอกสารรับรอง > ลายเซ็น
                </label>
            </div>
        </div>

        <div class="d-flex search_box">
            <div style="margin: 4px 10px 0px 10px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                    d="M26.5 26.5L20.4681 20.4681M20.4681 20.4681C21.4999 19.4363 22.3184 18.2115 22.8767 16.8634C23.4351 15.5153 23.7225 14.0704 23.7225 12.6113C23.7225 11.1521 23.4351 9.70725 22.8767 8.35917C22.3184 7.01109 21.4999 5.78619 20.4681 4.75442C19.4363 3.72264 18.2115 2.90419 16.8634 2.3458C15.5153 1.7874 14.0704 1.5 12.6113 1.5C11.1521 1.5 9.70725 1.7874 8.35917 2.3458C7.01109 2.90419 5.78619 3.72264 4.75442 4.75442C2.67065 6.83818 1.5 9.66438 1.5 12.6113C1.5 15.5582 2.67065 18.3844 4.75442 20.4681C6.83818 22.5519 9.66438 23.7225 12.6113 23.7225C15.5582 23.7225 18.3844 22.5519 20.4681 20.4681Z"
                    stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            </div>
            <input type="search" placeholder="| Search" style="outline-style: none; border-style: hidden; padding-left: 5px;">
        </div>
    </div>

    <!-- Modal -->
    <div>
        <div class="card card_sign outline-card ">
            <div class="card-body">
                <div class="">
                    <label class="card-title" for="">ClickNext Co.,Ltd.</label>
                    <br /><br />
                    <label class="card-text" for="">กรุงเทพมหานคร ฯ</label>
                    <br /><br />
                    <label class="card-content" for="">พญาไท พลาซ่า 128/323-333
                        ชั้น
                        30 ถ. พญาไท แขวงทุ่งพญาไทย เขตราชเทวี
                        กรุงเทพมหานคร 10400</label>
                </div>
                <div class=" ">
                    <button class="btn btn_choose ">เลือก</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.search_box {
    width: 300px;
    height: 40px;
    border: 2px solid black;
    border-radius: 10px;
    margin-top: 30px;
    margin-left: 10px;

}

.card_sign {
    border: 1px solid black;
    width: 15rem;
    height: 20rem;
    border-radius: 20px;
    text-align: center;
    margin-top: 30px;
    margin-left: 10px;
}
.card-title {
    font-size: 20px
}
.card-text {
    font-size: 14px; 
    font-weight: bold;
}
.card-content {
    font-size: 14px; 
    text-align: left;
}
.btn_choose {
    outline-style: none;
    border-style: hidden;
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