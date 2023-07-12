/*
function adicionarDiv() {
    // Criando nova DIV
    var novaDiv = document.createElement('div');

    //Adicionamdno classes ou atributos à DIV
    novaDiv.className = 'minhaDiv'

    // Criar elementos filhos e adicioná-los à DIV
    var texto = document.createElement('p');
    texto.textContent = 'Elemento PLC';
    texto.className = 'txtPrincipal';
    novaDiv.appendChild(texto);

    //Criando DropDownList para definir o que será feito no PLC
    var select = document.createElement('select');
    var opt1 = new Option('Selecione Ação', 'acao');
    select.appendChild(opt1);
    var opt2 = new Option('Escrita', 'Escrita');
    select.appendChild(opt2);
    var opt3 = new Option('Leitura', 'Leitura');
    select.className = 'elementos';
    select.appendChild(opt3);
    novaDiv.appendChild(select);

    //Criando um campo de Input para Endereços
    var endereco = document.createElement('input');
    var enderecoTexto = document.createElement('label');
    enderecoTexto.textContent = "Area PLC";
    endereco.type = "text";
    enderecoTexto.className = 'txt';
    endereco.className = 'elementos';
    novaDiv.appendChild(enderecoTexto);
    novaDiv.appendChild(endereco);


    //Criando um campo de Input para Valores
    var valor = document.createElement('input');
    var valorLabel = document.createElement('label');
    valorLabel.textContent = "Valor PLC";
    valor.type = "text";
    valorLabel.className = 'txt';
    valor.className = 'elementos';
    novaDiv.appendChild(valorLabel);
    novaDiv.appendChild(valor);

    //Criando um Botão para enviar os dados para PLC
    var btnSubmit = document.createElement('button');
    btnSubmit.textContent = "Executar";
    btnSubmit.className = 'btbExec';
    novaDiv.appendChild(btnSubmit);


    // Adicionar a DIV à div existente no documento
    var divExistente = document.getElementById('divDinamica');
    divExistente.appendChild(novaDiv);
}

*/

function adicionarDiv() {
    // Criando nova DIV
    var novaDiv = document.createElement('div');

    //Adicionamdno classes ou atributos à DIV
    novaDiv.className = 'minhaDiv'

    // Criar elementos filhos e adicioná-los à DIV
    var texto = document.createElement('p');
    texto.textContent = 'Elemento PLC';
    texto.className = 'txtPrincipal';
    novaDiv.appendChild(texto);

    //Criando DropDownList para definir o que será feito no PLC
    var selecReadWrite = document.createElement('select');
    var opt1 = new Option('Selecione Ação', 'acao');
    selecReadWrite.appendChild(opt1);
    var opt2 = new Option('Escrita', 'Escrita');
    selecReadWrite.appendChild(opt2);
    var opt3 = new Option('Leitura', 'Leitura');
    selecReadWrite.className = 'elementos';
    selecReadWrite.appendChild(opt3);
    novaDiv.appendChild(selecReadWrite);

    //Criando um campo de Input para Endereços
    var endereco = document.createElement('input');
    var enderecoTexto = document.createElement('label');
    enderecoTexto.textContent = "Area PLC";
    endereco.type = "text";
    enderecoTexto.className = 'txt';
    endereco.className = 'elementos';
    novaDiv.appendChild(enderecoTexto);
    novaDiv.appendChild(endereco);


    //Criando um campo de Input para Valores
    var valor = document.createElement('input');
    var valorLabel = document.createElement('label');
    valorLabel.textContent = "Valor PLC";
    valor.type = "text";
    valorLabel.className = 'txt';
    valor.className = 'elementos';
    novaDiv.appendChild(valorLabel);
    novaDiv.appendChild(valor);

    //Criando um Botão para enviar os dados para PLC
    var btnSubmit = document.createElement('button');
    btnSubmit.textContent = "Executar";
    btnSubmit.click = executarDados;
    btnSubmit.className = 'btbExec';
    novaDiv.appendChild(btnSubmit);


    // Adicionar a DIV à div existente no documento
    var divExistente = document.getElementById('divDinamica');
    divExistente.appendChild(novaDiv);
}

// Enviando Dados para o Back End, usando JQuery
function executarDados() {
    var selAcao = select.
}