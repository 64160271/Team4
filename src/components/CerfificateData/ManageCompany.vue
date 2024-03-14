<template>
    <LayoutMenuName page-name="จัดการข้อมูลบริษัท" />
</template>

<script>

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
