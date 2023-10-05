<template>
    <div class="row mb-3">

        <LayoutMenu />

        <div class="row mx-auto my-3" style="width: 80%;">
            <div class="col-auto">
                <img id="blah" :src="getImage()" alt="" class="img bg-grays-200" />
            </div>

            <div class="col ms-5 align-self-center">

                <div class="row mb-2 ms-2">
                    <label for="" class="col-md-2 col-form-label text-gray"> ฝ่าย </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" readonly required />
                    </div>

                    <label for="" class="col-md-2 col-form-label text-gray"> แผนก </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" readonly required />
                    </div>
                </div>

                <div class="row mb-2 ms-2">
                    <label for="" class="col-md-2 col-form-label text-gray"> ตำแหน่งงาน </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" readonly required />
                    </div>

                    <label for="" class="col-md-2 col-form-label text-gray"> พี่เลี้ยง </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" readonly required />
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-2">
            <table class="table table-borderless table-striped">
                <thead class="bg-red">
                    <tr class="text-center tr-custom">
                        <th scope="col" class="th-custom border-left">วันที่แก้ไข</th>
                        <th scope="col" class="th-custom">วันที่เริ่มโปรเจกต์</th>
                        <th scope="col" class="th-custom">วันที่โปรเจกต์เสร็จสิ้น</th>
                        <th scope="col" class="th-custom">ชื่อโปรเจกต์</th>
                        <th scope="col" class="th-custom">พี่เลี้ยง</th>
                        <th scope="col" class="th-custom">ผู้ทำการแก้ไข</th>
                        <th scope="col" class="th-custom border-right">หลักฐาน</th>
                    </tr>
                </thead>

                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import LayoutMenu from './LayoutMenu.vue'
import { useRoute } from 'vue-router';

const internId = useRoute().params.id;

function getImage(img) {
    if (img != null || img != '') {
        return `../src/assets/images/interns/${img}`
    }
}
</script>

<style scoped></style>