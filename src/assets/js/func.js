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

    birthdate = birthdate.replaceAll('-', '/')

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

function convertToArrayBuffer(data) {
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
    reader.onload = function() {
        console.log(reader.result)
    }
}