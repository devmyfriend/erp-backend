export const fechaCorta = fecha => {
	const dia = String(fecha.getDate()).padStart(2, '0');
	const mes = String(fecha.getMonth() + 1).padStart(2, '0');
	const ano = fecha.getFullYear();
	return `${ano}-${mes}-${dia}`;
};

export const fechaLarga = fecha => {
	const dia = String(fecha.getDate()).padStart(2, '0');
	const mes = String(fecha.getMonth() + 1).padStart(2, '0');
	const ano = fecha.getFullYear();
	const hora = String(fecha.getHours()).padStart(2, '0');
	const minutos = String(fecha.getMinutes()).padStart(2, '0');
	const segundos = String(fecha.getSeconds()).padStart(2, '0');

	return `${ano}-${mes}-${dia}T${hora}:${minutos}:${segundos}`;
};