$(document).ready(function () {
    var DivCount = 0;
    //var tipoDadoSelecionado;

    //===========================================================================
    // Criação da Popup (Div Dinâmica) ao clicar no botão na tela
    $('#btnAdicionarDiv').click(function () {
        DivCount++;

        // Cria a div dinamicamente
        var novaDiv = $('<div class="minhaDiv">');
        var leEscreveDiv = $('<div class="leEscreveDiv">');
        var enderecoDiv = $('<div class="enderecoDiv" id="enderecoId' + DivCount + '">');
        var valIntRealDiv = $('<div class"selIntRealDiv" id="selIntReal' + DivCount + '">');
        var valBoolDiv = $('<div class"selBoolDiv" id="selBool' + DivCount + '">');


        //***********************************************************************
        // Adicionar o campo de Seleção de Leitura ou Escrita para o PLC
        var SelLeitura = $('<input>').attr({
            type: 'radio',
            name: 'SelAcao_' + DivCount,
            value: 'leitura',
            class: 'RadioBtnAcao'
        });
        var SelEscrita = $('<input>').attr({
            type: 'radio',
            name: 'SelAcao_' + DivCount,
            value: 'escrita',
            class: 'RadioBtnAcao'
        });
        leEscreveDiv.append(SelLeitura).append('Leitura');
        leEscreveDiv.append(SelEscrita).append('Escrita');
        novaDiv.append(leEscreveDiv);
        //***********************************************************************


        //***********************************************************************
        // Seleciona qual tipo de dado será enviado ao PLC
        var selTipoDados = $('<select>', {
            class: 'selectTipoDados',
            name: 'tipoDadosDiv' + DivCount,
            id: 'selTipoDados'
        });

        // Criação das opções e adição ao elemento <select>
        var tipoDado = $('<option>', {
            value: 'tipo',
            text: 'Tipo de Dado'
        });
        var selReal = $('<option>', {
            value: 'real',
            text: 'Real'
        });
        var selInt = $('<option>', {
            value: 'int',
            text: 'Int'
        });
        var selBool = $('<option>', {
            value: 'bool',
            text: 'Bool'
        });

        selTipoDados.append(tipoDado);
        selTipoDados.append(selReal);
        selTipoDados.append(selInt);
        selTipoDados.append(selBool);
        novaDiv.append(selTipoDados);
        //***********************************************************************


        //***********************************************************************
        // Cria o campo input para definir o endereço de leitura ou escrita no PLC
        var enderecoLabel = document.createElement("label").textContent = "Endereço";
        enderecoDiv.append(enderecoLabel);

        // Cria Campo para inserir a DB
        var enderecoDB = $('<input type="text" name="enderecoDBDiv' + DivCount + '">');

        // Cria segundo campo do endereço apra inserir se será DBW, DBD ou DBX
        var enderecoTxt = $('<p name="enderecoTxtDiv' + DivCount + '">');
        var endereco = $('<input type="text" name="enderecoDiv' + DivCount + '">');

        // Insere um valor inicial para que o campo não fique vazio e confunda o operador
        $(enderecoTxt).text("DB_");

        //Adicionando Div e valores para Endereço do PLC
        enderecoDiv.append('DB').append(enderecoDB);
        enderecoDiv.append(enderecoTxt).append(endereco);
        novaDiv.append(enderecoDiv);
        //***********************************************************************


        //***********************************************************************
        // Adiciona na popup o campo para acionamento quando dado for Bool
        var valorBoolLabel = document.createElement("label").textContent = "Valor";

        // Monta Popup na tela para Escrita de dados do tipo Bool, ou outros
        var SelValTrue = $('<input>').attr({
            type: 'radio',
            name: 'valorBoolDiv' + DivCount,
            value: 'true',
            class: 'RadioBtnValPlc'
        });
        var SelValFalse = $('<input>').attr({
            type: 'radio',
            name: 'valorBoolDiv' + DivCount,
            value: 'false',
            class: 'RadioBtnValPlc'
        });


        //Adicionando Div e valores para Endereço do PLC
        valBoolDiv.append(valorBoolLabel);
        valBoolDiv.append(SelValTrue).append('True');
        valBoolDiv.append(SelValFalse).append('False');
        novaDiv.append(valBoolDiv);

        // Esconde o campo ao cirar a Popup
        $(valBoolDiv).hide();
        //***********************************************************************


        //***********************************************************************
        // Adiciona na popup o campo para acionamento quando dado for Int ou Real
        var valorIntRealLabel = document.createElement("label").textContent = "Valor";
        var valorIntReal = $('<input id="valorPlc' + DivCount + '" type="text" name="valorIntRealDiv' + DivCount + '">');

        //Adicionando Div e valores para Endereço do PLC
        valIntRealDiv.append(valorIntRealLabel);
        valIntRealDiv.append(valorIntReal);
        novaDiv.append(valIntRealDiv);

        // Esconde o campo ao cirar a Popup
        $(valIntRealDiv).hide();
        //***********************************************************************


        //***********************************************************************
        // Cria o botão de envio
        var btnEnviar = $('<button class="btnEnviarDiv" data-divindex="' + DivCount + '">Enviar</button>');

        novaDiv.append(btnEnviar);
        //***********************************************************************

        // Adiciona a div ao container
        $('#divContainer').append(novaDiv);
    });
    //===========================================================================



    //===========================================================================
    // Atualiza campos do Popup quando selecionado um tipo de dado
    $(document).on("change", "#selTipoDados", function () {

        var dadoSelecionado = $('select[name="tipoDadosDiv' + DivCount + '"]').val();   // Coleta o dado vindo do Popup, se é Int, Real ou Bool
        var SelAcao = $('input[name=SelAcao_' + DivCount + ']:checked').val();  // Coleta o dado vindo da popu, se será escrita ou leitura
        var endText = $('p[name="enderecoTxtDiv' + DivCount + '"]');

       // var txtEndereco = $('p[name="enderecoTxtDiv' + DivCount + '"]').val();  // Envia para a popup o texto referente ao endereço selecionado

        // Tira visibilidade dos campos toda vez que entrar nesta condição
        $('div[id="selBool' + DivCount + '"]').hide();
        $('div[id="selIntReal' + DivCount + '"]').hide();

        // Condição para mostrar na tela se os campos serão para dados tipo Bool, ou Int / Real
        if (dadoSelecionado == 'bool') {
            $(endText).text("DBX");

            if (SelAcao == 'escrita') {
                $('div[id="selBool' + DivCount + '"]').show();
            }
        }
        else {
            $('div[id="selIntReal' + DivCount + '"]').show();

            if (dadoSelecionado == 'real') {
                $(endText).text("DBD");
            }
            else {
                $(endText).text("DBW");
            }
        }
    });
    //===========================================================================


    //===========================================================================
    // Manipula o evento de clique no botão de envio
    $(document).on('click', '.btnEnviarDiv', function () {
        var divIndex = $(this).data('divindex');

        // Recupera os valores dos campos da div específica
        var valAcao = $('input[name=SelAcao_' + divIndex + ']:checked').val();
        var valEnderecoDB = $('input[name="enderecoDBDiv' + divIndex + '"]').val();
        var valEndereco = $('input[name="enderecoDiv' + divIndex + '"]').val();
        var tipoDadosPlc = $('select[name="tipoDadosDiv' + divIndex + '"]').val();
        var idValPlc;

        if (tipoDadosPlc == 'bool') {
            var valPlc = $('input[name="valorBoolDiv' + divIndex + '"]:checked').val();
            idValPlc = "valorPlc" + divIndex;
        }
        else if (tipoDadosPlc == 'int' | tipoDadosPlc == 'real') {
            var valPlc = $('input[name="valorIntRealDiv' + divIndex + '"]').val();
            idValPlc = "valorPlc" + divIndex;
        }

        // Cria o objeto com os dados da div
        var dadosDiv = {
            EnderecoDB: valEnderecoDB,
            Endereco: valEndereco,
            ValorPlc: valPlc,
            TipoDados: tipoDadosPlc
        };


        if (valAcao == 'escrita') {

            // Envia os dados para o backend usando uma requisição AJAX
            $.ajax({
                url: '/ReadWrite/WritePLC',
                type: 'POST',
                data: dadosDiv,
                dataType: 'json',
                success: function (response) {
                    // Lida com a resposta do backend
                    alert(response.message);
                },
                error: function (error) {
                    // Lida com erros de requisição
                    console.log(error);
                }
            });

        } else {

            // Recebe os dados para o backend usando uma requisição AJAX
            $.ajax({
                url: '/ReadWrite/ReadPLC',
                type: 'GET',
                data: dadosDiv,
                dataType: 'json',
                success: function (response) {
                    document.getElementById(idValPlc).value = response.value;
                },
                error: function (error) {
                    // Lida com erros de requisição
                    console.log(error);
                }
            });

        }
        
    });
});
//===========================================================================