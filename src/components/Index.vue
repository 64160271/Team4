<template>
    <div class="page">
        <div class="center-content overflow-auto">
            <div class="relative mb-2 flex w-full flex-wrap">
                <!-- Search icon -->
                <div class="mb-3">
                    <span
                        class="search input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="h-5 w-5">
                            <path fill-rule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clip-rule="evenodd" />
                        </svg>
                        <input type="search" placeholder="Search" aria-label="Search" fill="currentColor"
                            class="relative flex w-full h-full flex-wrap items-stretch bg-white text-black search_box"
                            aria-describedby="button-addon2" />
                    </span>
                </div>
            </div>
        </div>

    </div>
    <div class="button_input">
        <span>
            <div class="relative max-w-xs overflow-hidden bg-cover bg-no-repeat add_intern search_box">
                <button type="button" class="add_intern search_box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 41 40">
                        <path
                            d="M24.28 12.5749H6.75929C6.42738 12.5749 6.10906 12.4424 5.87436 12.2066C5.63966 11.9708 5.50781 11.651 5.50781 11.3176V6.28852C5.50781 5.95507 5.63966 5.63528 5.87436 5.3995C6.10906 5.16371 6.42738 5.03125 6.75929 5.03125H24.28C24.6119 5.03125 24.9302 5.16371 25.1649 5.3995C25.3996 5.63528 25.5314 5.95507 25.5314 6.28852V11.3176C25.5314 11.651 25.3996 11.9708 25.1649 12.2066C24.9302 12.4424 24.6119 12.5749 24.28 12.5749ZM8.01077 10.0603H23.0285V7.47035H8.01077V10.0603Z"
                            fill="#D21402" />
                        <path
                            d="M24.28 15.1875H6.75929C6.42738 15.1875 6.10906 15.32 5.87436 15.5557C5.63966 15.7915 5.50781 16.1113 5.50781 16.4448V21.3733C5.50781 21.7067 5.63966 22.0265 5.87436 22.2623C6.10906 22.4981 6.42738 22.6305 6.75929 22.6305H20.9761L25.5314 17.9786V16.4448C25.5314 16.1113 25.3996 15.7915 25.1649 15.5557C24.9302 15.32 24.6119 15.1875 24.28 15.1875ZM23.0285 20.116H8.01077V17.6015H23.0285V20.116Z"
                            fill="#D21402" />
                        <path
                            d="M11.8384 37.102V37.0266L12.2388 35.279H3.00295V2.51454H28.0325V15.4016L30.5354 13.0253V1.25727C30.5354 0.923821 30.4036 0.60403 30.1689 0.368246C29.9342 0.132462 29.6159 0 29.284 0H1.75148C1.41956 0 1.10125 0.132462 0.866549 0.368246C0.631852 0.60403 0.5 0.923821 0.5 1.25727V36.4608C0.5 36.7943 0.631852 37.1141 0.866549 37.3498C1.10125 37.5856 1.41956 37.7181 1.75148 37.7181H11.7633C11.7736 37.5112 11.7987 37.3053 11.8384 37.102Z"
                            fill="#D21402" />
                        <path
                            d="M25.5308 21.5859L24.5547 22.5792C24.7969 22.529 25.0188 22.4079 25.1926 22.2311C25.3663 22.0544 25.484 21.8299 25.5308 21.5859Z"
                            fill="#D21402" />
                        <path
                            d="M5.50781 31.3594C5.50781 31.6928 5.63966 32.0126 5.87436 32.2484C6.10906 32.4842 6.42738 32.6166 6.75929 32.6166H12.8164L13.1919 30.9822L13.3546 30.2907V30.2278H8.01077V27.663H15.9451L18.4481 25.1484H6.75929C6.42738 25.1484 6.10906 25.2809 5.87436 25.5167C5.63966 25.7525 5.50781 26.0723 5.50781 26.4057V31.3594Z"
                            fill="#D21402" />
                        <path
                            d="M39.9099 18.4412L35.6925 14.2042C35.5053 14.0157 35.2829 13.8661 35.0381 13.764C34.7933 13.6619 34.5308 13.6094 34.2658 13.6094C34.0007 13.6094 33.7383 13.6619 33.4934 13.764C33.2486 13.8661 33.0263 14.0157 32.8391 14.2042L15.6813 31.542L14.2672 37.5894C14.2142 37.8503 14.213 38.1192 14.2637 38.3805C14.3143 38.6419 14.4158 38.8906 14.5622 39.1125C14.7087 39.3344 14.8973 39.5251 15.1173 39.6737C15.3372 39.8222 15.5842 39.9257 15.844 39.9782C15.973 39.9913 16.103 39.9913 16.232 39.9782C16.3853 40.0033 16.5417 40.0033 16.695 39.9782L22.7647 38.633L39.9099 21.3707C40.0972 21.1837 40.2459 20.9614 40.3473 20.7165C40.4487 20.4715 40.501 20.2089 40.501 19.9436C40.501 19.6784 40.4487 19.4157 40.3473 19.1708C40.2459 18.9259 40.0972 18.7036 39.9099 18.5166V18.4412ZM21.4882 36.3447L16.9078 37.3631L18.0216 32.7992L30.8868 19.7362L34.4159 23.2817L21.4882 36.3447ZM35.8301 21.861L32.301 18.3155L34.2908 16.3416L37.845 19.9122L35.8301 21.861Z"
                            fill="#D21402" />
                    </svg>เพิ่มแบบฟอร์ม</button>
                <div
                    class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-gradient-to-r from-red-500 via-500 to-500 opacity-0 transition duration-300 ease-in-out hover:opacity-70">
                </div>
            </div>
        </span>
        <span>
            <div class="relative max-w-xs overflow-hidden bg-cover bg-no-repeat add_intern search_box">
                <button type="button" class="add_intern search_box"><svg xmlns="http://www.w3.org/2000/svg" width="30"
                        height="30" viewBox="0 0 40 40" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M38.2586 3.41427H23.7871V0L0 3.67602V35.8977L23.7871 40V34.9394H38.2586C38.6968 34.9616 39.1261 34.8092 39.4524 34.5154C39.7788 34.2216 39.9756 33.8104 40 33.3717V4.98051C39.9753 4.54205 39.7782 4.13121 39.4519 3.83774C39.1257 3.54427 38.6966 3.39203 38.2586 3.41427ZM38.4871 33.632H23.7386L23.7143 30.9301H27.2671V27.7833H23.6871L23.67 25.9238H27.2671V22.777H23.6429L23.6257 20.9176H27.2671V17.7708H23.6143V15.9113H27.2671V12.7645H23.6143V10.9051H27.2671V7.75827H23.6143V4.89755H38.4871V33.632Z"
                            fill="#D21402" />
                        <path
                            d="M29.2656 7.75781H35.4413V10.9046H29.2656V7.75781ZM29.2656 12.7655H35.4413V15.9123H29.2656V12.7655ZM29.2656 17.7732H35.4413V20.92H29.2656V17.7732ZM29.2656 22.7809H35.4413V25.9277H29.2656V22.7809ZM29.2656 27.7886H35.4413V30.9354H29.2656V27.7886Z"
                            fill="#D21402" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M6.20817 12.3832L9.27388 12.2073L11.201 17.5125L13.4782 11.9884L16.5439 11.8125L12.821 19.3448L16.5439 26.8956L13.3025 26.6768L11.1139 20.921L8.92388 26.4579L5.94531 26.1948L9.40531 19.525L6.20817 12.3832Z"
                            fill="white" />
                    </svg>เพิ่มไฟล์ Excel</button>
                <div
                    class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-gradient-to-r from-red-500 via-500 to-500 opacity-0 transition duration-300 ease-in-out hover:opacity-70">
                </div>
            </div>
        </span>
    </div>
    <div class="flex flex-col">
        <div>
            <div class="inline-block min-w-full py-2 sm:px-3 lg:px-6">
                <div class="overflow-hedden">
                    <table class="min-w-full text-center font-light mt-3">
                        <thead class=" bg-red-800 font-medium text-white dark:border-red-500 dark:bg-red-900">
                            <tr class="">
                                <th scope="col" class=" px-6 py-4 rounded-left">รหัสนักศึกษาฝึกงาน</th>
                                <th scope="col" class=" px-6 py-4">ชื่อ - นามสกุล</th>
                                <th scope="col" class=" px-6 py-4">ชื่อเล่น</th>
                                <th scope="col" class=" px-6 py-4">ตำแหน่ง</th>
                                <th scope="col" class=" px-6 py-4">มหาวิทยาลัย</th>
                                <th scope="col" class=" px-6 py-4">วันที่เริ่มฝึกงาน</th>
                                <th scope="col" class=" px-6 py-4 rounded-right">วันที่สิ้นสุดการฝึกงาน</th>
                            </tr>
                        </thead>
                        <tbody v-for="index in 10">
                            <tr>
                                <td scope="row" class="whitespace-nowrap font-medium px-6 py-4">{{ index }}</td>
                                <td scope="row" class="text-left whitespace-nowrap px-6 py-4"><router-link to="/interns/view">ชื่อจริงบางคน</router-link></td>
                                <td scope="row" class="text-left whitespace-nowrap px-6 py-4">นามสกุลบางคน</td>
                                <td scope="row" class="whitespace-nowrap px-6 py-4">{{ currentDate }}</td>
                                <td scope="row" class="whitespace-nowrap px-6 py-4">บูรพา</td>
                                <td scope="row" class="whitespace-nowrap px-6 py-4">{{ currentDate }}</td>
                                <td scope="row" class="whitespace-nowrap  px-6 py-4">{{ currentDate }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
    const date = new Date()
    const currentDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
</script>
  
<style scoped>
.page {
    display: flex;
    justify-content: center;
}

.button_input {
    display: flex;
    justify-content: flex-start;
    margin-left: 60%;
}

.rounded-left {
    border-radius: 50px 0px 0px 50px;
}

.rounded-right {
    border-radius: 0px 50px 50px 0px;
}

.add_intern {
    display: flex;
    margin: 5px;
    width: 180px;
    height: 40px;
    justify-content: center;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
    border-radius: 50px;
    border: 1.5px solid #D21402;
    color: #D21402;

}

.center-content {
    text-align: center;
    margin-bottom: 2px;
}

.search {
    border-radius: 50px;
    width: 1000px;
    height: 40px;
    border: 1px solid #000000;
    background-color: rgb(255, 255, 255);
    align-items: center;
    padding: 10px 10px;
}

.search_box {
    padding: 15px 5px;

}
</style>
  