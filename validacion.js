document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.formcontato__form');
    const inputs = form.querySelectorAll('input, textarea');
    const botonSubmit = form.querySelector('button[type="submit"]');
    const interactedInputs = new Set(); // Keep track of interacted inputs

    inputs.forEach(input => {
        // Crea el span de error para este input
        const mensajeError = document.createElement('span');
        mensajeError.id = input.id + '-error'; // Agrega el id del input con '-error' al final
        mensajeError.style.display = 'none'; // Oculta el mensaje de error inicialmente
        input.parentNode.appendChild(mensajeError); // Añadir el span de error como child de cada input

        input.addEventListener('blur', function () {
            interactedInputs.add(this.id); // Mark this input as interacted
            validarInput(this.value, this.id) // Obtiene el valor del input actual y su id
            validarBoton()
        });

        input.addEventListener('input', function () {
            validarInput(this.value, this.id);
            validarBoton(); // Chequea si el boton está activo
        });

    });

    function validarBoton() {
        let allValid = true;

        inputs.forEach(input => {
            if (!validarInput(input.value, input.id, false)) { // Pass a third parameter to skip showing error messages
                allValid = false;
            }
        });

        if (allValid) {
            botonSubmit.removeAttribute('disabled'); // Enable the button
        } else {
            botonSubmit.setAttribute('disabled', 'true'); // Disable the button
        }

    }

    function validarInput(valorIngresado, idParaError, showError = true) {
        const mensajeError = document.getElementById(idParaError + '-error'); // Obtiene el span de error correspondiente
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (valorIngresado === '') {
            if (showError && interactedInputs.has(idParaError)) {
                mensajeError.textContent = `El campo para "${idParaError}" no puede estar vacío`;
                mensajeError.style.display = 'block';
            }
            return false;
        } else if (idParaError === "email") {
            if (!emailRegex.test(valorIngresado)) {
                if (showError && interactedInputs.has(idParaError)) {
                    mensajeError.textContent = 'El correo electrónico no es válido (ejemplo@mail.com)';
                    mensajeError.style.display = 'block';
                }
                return false;
            } else {
                mensajeError.style.display = 'none';
                return true;
            }
        } else if (valorIngresado.length < 3) {
            if (showError && interactedInputs.has(idParaError)) {
                mensajeError.textContent = `El campo para "${idParaError}" debe tener al menos 3 caracteres`;
                mensajeError.style.display = 'block';
            }
            return false;
        } else {
            mensajeError.style.display = 'none'; // Oculta el mensaje de error
            return true;
        }
    }
});