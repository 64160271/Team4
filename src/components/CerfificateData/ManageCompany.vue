<template>
    <LayoutMenuName page-name="จัดการข้อมูลเอกสารรับรอง > บริษัท" /> 
        <div class="header me-1">
            <div class="col-md-4 my-auto">
                <div class="input-group">
                    <span class="bg-grays-200 input-group-text" id="basic-addon1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                            viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </span>
                <input v-model="searchData" type="text" id="search-bar" class="bg-grays-200 form-control"
                    placeholder="Search" aria-label="" aria-describedby="basic-addon1">
                </div>
            </div>

            <button class="btn_add ms-auto" @click="$router.push('#')">
                เพิ่มข้อมูล
            </button>
        </div>

    <BaseCard class="outline-card mt-5"
        title="ClickNext Co.,Ltd."
        sub="กรุงเทพมหานคร ฯ" 
        content="พญาไท พลาซ่า 128/323-333 ชั้น 30
            ถ. พญาไท แขวงทุ่งพญาไท เขตราชเทวี 
            กรุงเทพมหานคร 10400">
        <EditIcon class="stroke_edit position-absolute top-0 end-0 m-1 p-1"/>
    </BaseCard>
</template>

<script setup>
    import BaseCard from '../Component/BaseCard.vue';
    import EditIcon from '../icons/EditIcon.vue';
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

.btn_add:hover {
    background-color: red;
    border: 1px solid white;
    border-radius: 5px;
    color: white;
    width: 150px;
    height: 35px;
    outline: none;
}

.card_sign {
    border: 1px solid black;
    width: 15rem;
    height: 18rem;
    border-radius: 20px;
    text-align: center;
}

.card-content {
    margin: 0rem 5px 0rem 5px;
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
    color: rgb(0, 0, 0) !important;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.stroke_edit:hover {
    color: var(--main-color);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.outline-card {
    border: 1px solid black;
    color: black;
    border-radius: 33px;
}

.outline-card:hover {
    border: 1px solid var(--main-color);
    color: var(--main-color);
}

.header {
    display: flex;
    width: 90%;
}
</style>
