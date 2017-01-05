var tempoInicial = $('#tempo-digitacao').text();
var campo = $(".campo-digitacao");

$(document).ready(() => {
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaMarcadores();
	$('#botao-reiniciar').click(reiniciaJogo);
	$('.botao-remover').click(removeLinha);
});

function atualizaTamanhoFrase() {
	let frase = $(".frase").text();
	let numPalavras = frase.split(" ").length;
	let tamanhoFrase = $("#tamanho-frase");
	tamanhoFrase.text(numPalavras);
}


function inicializaContadores() {
	campo.on("input", () => {
		let conteudo = campo.val();

		let qtdPalavras = conteudo.split(/\S+/).length - 1;
		$("#contador-palavras").text(qtdPalavras);

		let qtdCaracteres = conteudo.length;
		$("#contador-caracteres").text(qtdCaracteres);
	});
}

function inicializaMarcadores() {
	campo.on("input", () => {

		let frase = $(".frase").text();
		let digitado = campo.val();
		let comparavel = frase.substr(0, digitado.length);

		/*if (digitado == comparavel) {
			campo.addClass('borda-verde');
			campo.removeClass('borda-vermelha');
		}
		else {
			campo.addClass('borda-vermelha');
			campo.removeClass('borda-verde');
		}*/
		if( frase.startsWith(digitado)) {
			campo.addClass("borda-verde");
			campo.removeClass('borda-vermelha');
		} 
		else {
			campo.addClass("borda-vermelha");
			campo.removeClass('borda-verde');
		}

	});
}


function inicializaCronometro() {
	let tempoRestante = tempoInicial;
	campo.one('focus', () => {
		let id = setInterval(() => {
			tempoRestante--;
			$('#tempo-digitacao').text(tempoRestante);
			if (tempoRestante < 1) {
				finalizaJogo(id);
			}
		}, 1000);
	});
}

function finalizaJogo(id) {
	campo.attr('disabled', true);
	clearInterval(id);
	/* campo.css('background-color', 'lightgray'); */
	campo.toggleClass('campo-desativado');
	inserePlacar();
}

function reiniciaJogo() {
	campo.attr('disabled', false);
	campo.val('');
	$("#contador-palavras").text('0');
	$("#contador-caracteres").text('0');
	$('#tempo-digitacao').text(tempoInicial);
	campo.toggleClass('campo-desativado');
	campo.removeClass('borda-vermelha');
	campo.removeClass('borda-verde');
	inicializaCronometro();
}