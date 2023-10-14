<template>
    <LayoutMenuName page-name="จัดการข้อมูลลายเซ็น" />
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