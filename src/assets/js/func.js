import Swal from "sweetalert2";

/*
 * getAge
 * คำนวนอายุจากวันที่
 * param: วันที่รูปแบบ yyyy-mm-dd
 * return: ตัวเลขวันเกิด
 */
export function getAge(birthdate) {
    if (!birthdate) {
        return 0
    }

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
export async function confirmation(str) {
    let result = await Swal.fire({
        text: str || "คุณต้องการบันทึกข้อมูลหรือไม่",
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
export async function successAlert(str) {
    await Swal.fire({
        icon: "success",
        text: str || "บันทึกข้อมูลเสร็จสิ้น",
        showConfirmButton: false,
        timer: 3000,
    }).then(() => {
        return
    })
}

export async function errorAlert(message, noDelay=false) {
    await Swal.fire({
        icon: "error",
        text: message,
        timer: noDelay ? undefined : 3000
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

export function getImageFromBuffer2(type, buffer) {
    let b64encoded = btoa(buffer.reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''));
    return 'data:' + type + ';base64,' + b64encoded;
}


export function changeTimestampToDate(value) {
    if (value) {
        const date = new Date(value)
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (day < 10) {
            day = 0 + `${day}`
        }
        if (month < 10) {
            month = 0 + `${month}`
        }
        return `${day}/${month}/${year + 543}`
    }
    return ''
}

export function formatDate(strdate) {
    if (!strdate || strdate == '-') {
        return null
    }

    let part = strdate.split('-')

    let date = new Date(part[2], part[1] - 1, part[0]),
        month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear() - 543;

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export function diffDate(from, to) {
    let date1 = new Date(from);
    let date2 = new Date(to);

    // To calculate the time difference of two dates
    let Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    return Math.round(Difference_In_Time / (1000 * 3600 * 24));
}

export function diffTime(from, to) {
    if (!from || !to) return 0

    var fromDate = new Date(`2000-01-01T${from}Z`); // 9:00 AM
    var toDate = new Date(`2000-01-01T${to}Z`); // 5:00 PM

    // the following is to handle cases where the times are on the opposite side of
    // midnight e.g. when you want to get the difference between 9:00 PM and 5:00 AM

    if (toDate < fromDate) {
        toDate.setDate(toDate.getDate() + 1);
    }

    console.log(fromDate)
    
    return toDate - fromDate;
}

export function parseTime(s) {
    var part = s.match(/(\d+):(\d+)(?: )?(am|pm)?/i);
    var hh = parseInt(part[1], 10);
    var ap = part[3] ? part[3].toUpperCase() : null;
    if (ap === "AM") {
        if (hh == 12) {
            hh = 0;
        }
    }
    if (ap === "PM") {
        if (hh != 12) {
            hh += 12;
        }
    }
    return hh
}   

export function slashDtoDashY(strDate) {
    if (!strDate) return null

    let format = strDate.replaceAll('/', '-')
    let splitted = format.split('-')

    let result = `${splitted[2]-543}-${splitted[1]}-${splitted[0]}`
    return result
}

export function getCurrentThaiDate() {
    const date = new Date();
    const formatedDate = date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });

    return formatedDate
}

export function getDefaultImage() {
    return `${import.meta.env.VITE_BASE_URL}/src/assets/images/person-nm.png`
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