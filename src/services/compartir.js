// Compartir: usa el menú de compartir del celular (Web Share API) si existe;
// si no (por ejemplo en la compu), copia el texto al portapapeles.
// Devuelve 'compartido', 'copiado' o 'cancelado'.
export async function compartir({ titulo, texto, url }) {
  if (navigator.share) {
    try {
      await navigator.share({ title: titulo, text: texto, url });
      return 'compartido';
    } catch (error) {
      if (error.name === 'AbortError') return 'cancelado'; // la persona cerró el menú
    }
  }
  await navigator.clipboard.writeText(`${texto}\n${url}`);
  return 'copiado';
}

// Dirección de invitación a un club: al abrirla, la app completa el código automáticamente.
export function enlaceDeClub(codigo) {
  return `${window.location.origin}/?club=${codigo}`;
}
