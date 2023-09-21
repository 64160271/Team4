export function getAge(birthdate) {
    birthdate = new Date(birthdate)
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear() -
        (today.getMonth() < birthdate.getMonth() ||
            (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
    return age
}