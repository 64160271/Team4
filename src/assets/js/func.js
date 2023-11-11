import Swal from "sweetalert2";

export function getAge(birthdate) {
    birthdate = new Date(birthdate)
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear() -
        (today.getMonth() < birthdate.getMonth() ||
            (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
    return age
}

export function getAgeBuddisht(birthdate) {
    if (!birthdate) return

    birthdate = new Date(birthdate)
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear() + 543 -
        (today.getMonth() < birthdate.getMonth() ||
            (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
    return age
}

export function isRequire() {
    let form = $("#form")[0]

    if (form.reportValidity() &&
        !($('select').filter(['required']).find('option:selected').attr('disabled'))) {
        return true
    }

    return false
}

export function formatDate(strDate) {
    if (!strDate) {
        return
    }

    strDate = new Date(strDate)

    const day = strDate.getDate()
    const month = strDate.getMonth() + 1
    const year = strDate.getFullYear()

    return day + "/" + month + "/" + year
}

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

export function successAlert() {
    Swal.fire({
        icon: "success",
        text: "บันทึกข้อมูลเสร็จสิ้น",
        showConfirmButton: false,
        timer: 3000,
    })

    return
}