import Swal from "sweetalert2";

/*
 * getAge
 * คำนวนอายุจากวันที่
 * param: วันที่รูปแบบ yyyy-mm-dd
 * return: ตัวเลขวันเกิด
 */
export function getAge(birthdate) {
    birthdate = new Date(birthdate)
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear() -
        (today.getMonth() < birthdate.getMonth() ||
            (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
    return age
}

/*
 * getAgeBuddisht
 * คำนวนอายุจากวันที่
 * param: วันที่รูปแบบ yyyy-mm-dd ที่เป็นปี พ.ศ.
 * return: ตัวเลขวันเกิด
 */
export function getAgeBuddisht(birthdate) {
    if (!birthdate) return

    birthdate = birthdate.replaceAll('-', '/')

    birthdate = new Date(birthdate)
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear() + 543 -
        (today.getMonth() < birthdate.getMonth() ||
            (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
    return age
}

/*
 * isRequire
 * validate แบบฟอร์มทั้ง input text และ select
 * param: -
 * return: boolean (ผ่าน = true)
 */
export function isRequire() {
    let form = $("#form")[0]

    if (form.reportValidity() &&
        !($('select').filter(['required']).find('option:selected').attr('disabled'))) {
        return true
    }

    return false
}


/*
 * confirmation
 * แสดง Pop-up ยืนยันการเพิ่มข้อมูล
 * param: -
 * return: ผลลัพธ์ของปุ่มที่กด (หากกดยืนยันจะคืนค่า true)
 */
export async function confirmation() {
    let result = await Swal.fire({
        text: "คุณต้องการบันทึกข้อมูลหรือไม่",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        confirmButtonColor: "var(--main-color)",
        reverseButtons: true,
        focusConfirm: false,
    });

    return result.isConfirmed
}

/*
 * successAlert
 * แสดง Pop-up บันทึกข้อมูลสำเร็จ
 * param: -
 * return: null
 */
export async function successAlert() {
    await Swal.fire({
        icon: "success",
        text: "บันทึกข้อมูลเสร็จสิ้น",
        showConfirmButton: false,
        timer: 3000,
    }).then(() => {
        return
    })
}

export async function errorAlert(message) {
    await Swal.fire({
        icon: "error",
        text: message,
        timer: 3000
    })

    return
}

export function getImageFromBuffer(type, buffer) {
    let binary = ''
    let bytes = new Uint8Array(buffer)
    let len = bytes.byteLength
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
    }

    return `data:${type};base64,${binary}`
}

export function formatDate(strdate) {
    if (!strdate || strdate == '-') {
        return null
    }

    let part = strdate.split('-')

    let date = new Date(part[2], part[1] - 1, part[0]),
        month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear() -543;

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

/* function convertToArrayBuffer(data) {
    let reader = new FileReader()
    let contentType = 'image/*'
    let binary = atob(data)
    let bytes = new Uint8Array(binary.length)
    for (var i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    let blob = new Blob([bytes], { type: contentType })
    personalInfo.value.intn_image = blob
}

function convertToBase64(img) {
    let result = new String
    let reader = new FileReader()
    reader.readAsDataURL(img)
    reader.onload = function () {
        convertToArrayBuffer((reader.result.split(',')[1]))
    }
}

function toImage(buffer) {
    let reader = new FileReader()
    let blob = new Blob(buffer.data)
    reader.readAsDataURL(blob)
    reader.onload = function () {
        console.log(reader.result)
    }
} */