console.log("Signup frontend javascript file");

$(function () {
    
});

// frontend validationni tekshirib beradigon function
function validateSignupForm () {
    const memberNick = $(".member-nick").val();
    const memberPhone = $(".member-phone").val();
    const memberPassword = $(".member-password").val();
    const confirmPassword = $(".confirm-password").val();

    if(memberNick === "" || 
        memberPhone === "" ||
        memberPassword === "" || 
        confirmPassword === "" 
    ) {
        alert("Please insert all required inputs")
        return false
    }

    if (memberPassword !== confirmPassword) {
        alert("Password differs, please check!")
        return false
    }
   // return false;    // form submit qilganda backendga malumot yubormaydi
}