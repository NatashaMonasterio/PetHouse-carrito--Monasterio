
function linkSinFuncinonamiento(){
    Swal.fire ({
        icon: "error",
        text: "Este enlace aún no esta habilitado",
        footer: "Disculpe el inconveniente",
        showConfirmButton: false,
        timer: 2000,
        background: "black",
        color: "white",
    })
}

let botonVeterinario = document.getElementById("botonVeterinario");
botonVeterinario.addEventListener('click', linkSinFuncinonamiento);

let botonPacientes = document.getElementById("botonPacientes");
botonPacientes.addEventListener('click', linkSinFuncinonamiento);

let botonContacto = document.getElementById("botonContacto");
botonContacto.addEventListener('click', linkSinFuncinonamiento);