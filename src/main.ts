// Lógica sencilla: reloj en vivo y botón interactivo

const reloj = document.getElementById('reloj') as HTMLParagraphElement;
const boton = document.getElementById('btn-saludo') as HTMLButtonElement;
const mensaje = document.getElementById('mensaje') as HTMLParagraphElement;

function actualizarReloj(): void {
  reloj.textContent = new Date().toLocaleTimeString('es-EC');
}

actualizarReloj();
setInterval(actualizarReloj, 1000);

let clics = 0;
boton.addEventListener('click', () => {
  clics++;
  mensaje.textContent = `✅ ¡Funciona! Has hecho clic ${clics} ${clics === 1 ? 'vez' : 'veces'}.`;
});
