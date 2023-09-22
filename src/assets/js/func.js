export function getAge(birthdate) {
    birthdate = new Date(birthdate)
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear() -
        (today.getMonth() < birthdate.getMonth() ||
            (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
    return age
}

export function isRequire() {
    let form = $("#form")[0]

    if (form.reportValidity()) {
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