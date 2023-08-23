<template>
    <div class="">
        <div
            class="mx-auto w-2/3 px-7 pb-6 mt-12 bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700">
            <div>
                <img src="https://image.makewebeasy.net/makeweb/m_1920x0/m14BHwk4P/Home/clicknext_logo2x.png"
                    class="h-24 mt-2" alt="clicknextlogo" />
            </div>

            <div class="absolute right-1/4">
                <img src="../assets/images/login_img.png" class="w-96" alt="">
            </div>

            <label class="mb-3 font-normal text-gray-700 dark:text-gray-400">Internship Management System</label>

            <div class="m-5">
                <form action="" method="POST">
                    <label for="" class="font-bold">Username</label>
                    <div class="flex flex-row gap-2 my-3 w-1/2 mb-6">
                        <svg class="my-auto" width="50" height="30" viewBox="0 0 42 50" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M21 25C27.6281 25 33 19.4043 33 12.5C33 5.5957 27.6281 0 21 0C14.3719 0 9 5.5957 9 12.5C9 19.4043 14.3719 25 21 25ZM29.9812 28.1836L25.5 46.875L22.5 33.5938L25.5 28.125H16.5L19.5 33.5938L16.5 46.875L12.0187 28.1836C5.33437 28.5156 0 34.209 0 41.25V45.3125C0 47.9004 2.01562 50 4.5 50H37.5C39.9844 50 42 47.9004 42 45.3125V41.25C42 34.209 36.6656 28.5156 29.9812 28.1836Z"
                                fill="#8D969B" />
                        </svg>
                        <input
                            class="delay-100 appearance-none border border-gray-400 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                            type="text" placeholder="Username">
                    </div>

                    <label for="" class="font-bold">Password</label>
                    <div class="flex flex-row gap-2 my-3 w-1/2 mb-6">
                        <svg class="my-auto" width="50" height="35" viewBox="0 0 60 70" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M30 48.0952C31.3261 48.0952 32.5979 47.5935 33.5355 46.7005C34.4732 45.8075 35 44.5963 35 43.3333C35 42.0704 34.4732 40.8592 33.5355 39.9662C32.5979 39.0731 31.3261 38.5714 30 38.5714C28.6739 38.5714 27.4021 39.0731 26.4645 39.9662C25.5268 40.8592 25 42.0704 25 43.3333C25 44.5963 25.5268 45.8075 26.4645 46.7005C27.4021 47.5935 28.6739 48.0952 30 48.0952ZM45 26.6667C46.3261 26.6667 47.5979 27.1684 48.5355 28.0614C49.4732 28.9544 50 30.1656 50 31.4286V55.2381C50 56.501 49.4732 57.7122 48.5355 58.6053C47.5979 59.4983 46.3261 60 45 60H15C13.6739 60 12.4021 59.4983 11.4645 58.6053C10.5268 57.7122 10 56.501 10 55.2381V31.4286C10 30.1656 10.5268 28.9544 11.4645 28.0614C12.4021 27.1684 13.6739 26.6667 15 26.6667H17.5V21.9048C17.5 18.7474 18.817 15.7194 21.1612 13.4868C23.5054 11.2542 26.6848 10 30 10C31.6415 10 33.267 10.3079 34.7835 10.9062C36.3001 11.5045 37.6781 12.3814 38.8388 13.4868C39.9996 14.5923 40.9203 15.9047 41.5485 17.349C42.1767 18.7934 42.5 20.3414 42.5 21.9048V26.6667H45ZM30 14.7619C28.0109 14.7619 26.1032 15.5145 24.6967 16.854C23.2902 18.1935 22.5 20.0104 22.5 21.9048V26.6667H37.5V21.9048C37.5 20.0104 36.7098 18.1935 35.3033 16.854C33.8968 15.5145 31.9891 14.7619 30 14.7619Z"
                                fill="#8D969B" />
                        </svg>
                        <input
                            class="delay-100 appearance-none border border-gray-400 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                            type="password" placeholder="Password">
                    </div>

                    <div class="flex flex-row gap-2 my-9 w-1/2">
                        <svg class="ms-auto" width="50" height="35" viewBox="0 0 60 70" fill="none"
                            xmlns="http://www.w3.org/2000/svg"></svg>
                        <router-link to="/"
                            class=" btn px-3 py-2 w-full font-medium text-sm text-white bg-red-600 rounded-2xl hover:bg-red-800 focus:outline-none focus:bg-red-900 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            LOGIN
                        </router-link>
                    </div>

                    <div class="w-1/2 mx-auto">
                        <router-link to="#" class="items-center text-gray-500 underline">
                            ลืมรหัสผ่าน
                        </router-link>
                    </div>
                </form>
            </div>
        </div>

        <div class="fixed bottom-0">
            <svg width="1920" height="200" viewBox="0 0 1920 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M0 0L79.5 7.51445C160.5 15.0289 319.5 30.0578 480 55.4913C640.5 81.5029 799.5 118.497 960 126.012C1120.5 133.526 1279.5 110.983 1440 104.046C1600.5 96.5318 1759.5 104.046 1840.5 107.514L1920 110.983V200H1840.5C1759.5 200 1600.5 200 1440 200C1279.5 200 1120.5 200 960 200C799.5 200 640.5 200 480 200C319.5 200 160.5 200 79.5 200H0V0Z"
                    fill="#F9D7DC" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M0 80L64 96C128 112 256 144 384 136C512 128 640 80 768 48C896 16 1024 0 1152 0C1280 0 1408 16 1536 44C1664 72 1792 112 1856 132L1920 152V200H1856C1792 200 1664 200 1536 200C1408 200 1280 200 1152 200C1024 200 896 200 768 200C640 200 512 200 384 200C256 200 128 200 64 200H0V80Z"
                    fill="#C3131C" fill-opacity="0.88" />
            </svg>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>