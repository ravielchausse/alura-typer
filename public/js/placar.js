function inserePlacar() {
	let tabela = $('.placar').find('table');
	let corpo = $('.placar').find('tbody');
	let usuario = 'Raviel';
	let numPalavras = $("#contador-palavras").text();
	let linha = novaLinha(usuario, numPalavras);
	linha.find('.botao-remover').click(removeLinha);
	corpo.prepend(linha);
}

function novaLinha(usuario, numPalavras) {
	let linha = $('<tr>');
	let colunaUsuario = $('<td>').text(usuario);
	let colunaPalavras = $('<td>').text(numPalavras);
	let colunaRemover = $('<td>');
	let link = $('<a>').addClass('botao-remover').attr('href', '#');
	let icone = $('<i>').addClass('small').addClass('material-icons').text('delete');

	colunaRemover.append(link.append(icone));

	linha.append(colunaUsuario);
	linha.append(colunaPalavras);
	linha.append(colunaRemover);

	return linha;

}

function removeLinha (event) {
	event.preventDefault();
	$(this).parent().parent().remove();
}