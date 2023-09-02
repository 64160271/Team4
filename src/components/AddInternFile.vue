<template>
    <div class="d-flex flex-column mb-3">
        <span class="h5 my-auto">เพิ่มไฟล์ Excel</span>

        <form action="">
            <div contenteditable="true" class="d-flex mt-3 upload-box">
                <div class="m-auto btn">
                    <svg width="200" height="200" viewBox="0 0 250 251" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M239.116 21.8392H148.67V0.5L0 23.4751V224.861L148.67 250.5V218.871H239.116C241.855 219.01 244.538 218.057 246.578 216.221C248.617 214.385 249.848 211.815 250 209.073V31.6282C249.845 28.8878 248.614 26.3201 246.575 24.4859C244.535 22.6517 241.854 21.7002 239.116 21.8392ZM240.545 210.7H148.366L148.214 193.813H170.42V174.146H148.045L147.938 162.524H170.42V142.857H147.768L147.661 131.235H170.42V111.567H147.589V99.9457H170.42V80.2783H147.589V68.6566H170.42V48.9892H147.589V31.1097H240.545V210.7Z"
                            fill="black" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M39.1405 77.1959L57.9091 76.0951L69.7073 109.29L83.6481 74.7258L102.417 73.625L79.625 120.754L102.417 168L82.5724 166.631L69.1738 130.617L55.7664 165.261L37.5312 163.615L58.7137 121.882L39.1405 77.1959Z"
                            fill="white" />
                    </svg>

                    <span class="row h5 mt-3">เลือกไฟล์ Excel หรือลากไฟล์ที่นี่</span>
                </div>
            </div>

            <div class="d-flex mt-5">
                <button class="outline-red btn ms-auto">Import</button>
            </div>
        </form>
    </div>
</template>

<script setup>

</script>

<style scoped>
.upload-box {
    border: 1px black dotted;
    height: 70vh;
}

.btn {
    width: 15vw;
}
</style>