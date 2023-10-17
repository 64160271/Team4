<template>
    <LayoutMenuName page-name="เอกสารรับรองการฝึกงาน" />
    
  <div class="row mb-3 me-1">
    <div class="col-md-4 my-auto">
<div class="search_box input-group">
            <span style="margin: 5px 10px 0px 35px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                    d="M26.5 26.5L20.4681 20.4681M20.4681 20.4681C21.4999 19.4363 22.3184 18.2115 22.8767 16.8634C23.4351 15.5153 23.7225 14.0704 23.7225 12.6113C23.7225 11.1521 23.4351 9.70725 22.8767 8.35917C22.3184 7.01109 21.4999 5.78619 20.4681 4.75442C19.4363 3.72264 18.2115 2.90419 16.8634 2.3458C15.5153 1.7874 14.0704 1.5 12.6113 1.5C11.1521 1.5 9.70725 1.7874 8.35917 2.3458C7.01109 2.90419 5.78619 3.72264 4.75442 4.75442C2.67065 6.83818 1.5 9.66438 1.5 12.6113C1.5 15.5582 2.67065 18.3844 4.75442 20.4681C6.83818 22.5519 9.66438 23.7225 12.6113 23.7225C15.5582 23.7225 18.3844 22.5519 20.4681 20.4681Z"
                    stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            </span>
            <input class="search"  id="search" type="search" placeholder="| Search" >
 
        </div>
    </div>
<BaseButton/>
            <button class="col-auto btn ms-auto outline-red" @click="$router.push('/certificates/selectCompany')">ออกเอกสารรับรอง</button>
        
  </div>
        
        
        
    
        

</template>

<script setup>

import BaseButton from '../Component/BaseButton.vue';
</script>

<style scoped>
#search::placeholder { /* สำหรับ Chrome, Firefox, Opera, Safari */
  color: rgb(255, 255, 255);
  opacity: 1;
}
.search {
    background-color: #8D969B;
    outline-style: none;
    border-style: hidden;
    width: 310px;
    color: white;
}
.search_box {
    width: 400px;
    height: 40px;
    background-color: #8D969B;
    border-radius: 10px;
    opacity: 70%;
}
</style>