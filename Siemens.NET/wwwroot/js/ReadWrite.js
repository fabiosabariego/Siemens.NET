$(document).ready(function () {
    var DivCount = 0;
    //var tipoDadoSelecionado;

    //===========================================================================
    // Criação da Popup (Div Dinâmica) ao clicar no botão na tela
    $('#btnAdicionarDiv').click(function () {
        DivCount++;

        // Cria a div dinamicamente
        var novaDiv = $('<div class="minhaDiv">');


        //***********************************************************************
        //Criando DIVs para campo de leitura e escrita
        var leituraDiv = $('<div class="leituraDiv">');
        var escritaDiv = $('<div class="escritaDiv">');
        var leEscreveDiv = $('<div class="leEscreveDiv">');

        // Adicionar o campo de Seleção de Leitura ou Escrita para o PLC
        var SelLeitura = $('<input>').attr({
            type: 'radio',
            name: 'SelAcao_' + DivCount,
            value: 'leitura',
            class: 'RadioBtnAcao',
            id: 'idLeitura'
        });
        var SelEscrita = $('<input>').attr({
            type: 'radio',
            name: 'SelAcao_' + DivCount,
            value: 'escrita',
            class: 'RadioBtnAcao',
            id: 'idEscrita'
        });
        leituraDiv.append(SelLeitura).append('Leitura');
        escritaDiv.append(SelEscrita).append('Escrita');
        leEscreveDiv.append(leituraDiv).append(escritaDiv);
        novaDiv.append(leEscreveDiv);
        //***********************************************************************


        //***********************************************************************
        // Seleciona qual tipo de dado será enviado ao PLC
        var selTipoDados = $('<select>', {
            class: 'selectTipoDados form-select form-select-md mb-1',
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
        // Criando DIVs para Endereços
        var enderecoDivDB = $('<div class="endDivDB input-group mb-1" id="endDivDBId' + DivCount + '">');
        var enderecoDivValue = $('<div class="endDivVal input-group mb-2" id="endDivValId' + DivCount + '">');

        // Cria o campo input para definir o endereço de leitura ou escrita no PLC
        var enderecoLabel = $('<label class="enderecoLabel">Endereço</label>');
        novaDiv.append(enderecoLabel);

        // Cria Campo para inserir a DB
        var labelEnderecoDB = $('<span class="input-group-text" id="basic-addon1">DB</span>');
        var enderecoDB = $('<input type="text" name="enderecoDBDiv' + DivCount + '" class="form-control" placeholder="Valor DB" aria-label="Valor DB" aria-describedby="basic-addon1">');

        // Cria segundo campo do endereço apra inserir se será DBW, DBD ou DBX
        var enderecoTxt = $('<span name="enderecoTxtDiv' + DivCount + '" class="input-group-text" id="basic-addon1">DB_</span>');
        var endereco = $('<input type="text" name="enderecoDiv' + DivCount + '" class="form-control" placeholder="Endereço DB" aria-label="Endereço DB" aria-describedby="basic-addon1">');

        //Adicionando Div e valores para Endereço do PLC
        enderecoDivDB.append(labelEnderecoDB).append(enderecoDB);
        enderecoDivValue.append(enderecoTxt).append(endereco);
        novaDiv.append(enderecoDivDB);
        novaDiv.append(enderecoDivValue);
        //***********************************************************************


        //***********************************************************************
        // Adiciona DIVs de True ou False
        var valBoolDiv = $('<div class="valBoolDiv" id="selBool' + DivCount + '">');
        var boolLabelDiv = $('<div class="boolLabelDiv" id="boolLabel' + DivCount + '">');
        var trueDiv = $('<div class="trueDiv">');
        var falseDiv = $('<div class="falseDiv">');

        // Adiciona na popup o campo para acionamento quando dado for Bool
        var valorBoolLabel = document.createElement("label").textContent = "Valor";
        boolLabelDiv.append(valorBoolLabel);

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
        trueDiv.append(SelValTrue).append('True');
        falseDiv.append(SelValFalse).append('False');
        valBoolDiv.append(trueDiv).append(falseDiv);
        novaDiv.append(boolLabelDiv).append(valBoolDiv);

        // Esconde o campo ao cirar a Popup
        $(valBoolDiv).hide();
        $(boolLabelDiv).hide();
        //***********************************************************************


        //***********************************************************************
        //Adicionando DIVs
        var valIntRealDiv = $('<div class"selIntRealDiv" id="selIntReal' + DivCount + '">');

        // Adiciona na popup o campo para acionamento quando dado for Int ou Real
        var valorIntRealLabel = document.createElement("label").textContent = "Valor";
        var valorIntReal = $('<input type="text" name="valorIntRealDiv' + DivCount + '" class="form-control mb-2" placeholder="Valor PLC" aria-label="Valor PLC" aria-describedby="basic-addon1" id="valorPlc' + DivCount + '">');

        //Adicionando Div e valores para Endereço do PLC
        valIntRealDiv.append(valorIntRealLabel);
        valIntRealDiv.append(valorIntReal);
        novaDiv.append(valIntRealDiv);

        // Esconde o campo ao cirar a Popup
        $(valIntRealDiv).hide();
        //***********************************************************************


        //***********************************************************************
        // Cria o botão de envio
        var btnEnviar = $('<button class="btnEnviarDiv btn btn-primary" data-divindex="' + DivCount + '">Enviar</button>');

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
        var endText = $('span[name="enderecoTxtDiv' + DivCount + '"]');


        // Tira visibilidade dos campos toda vez que entrar nesta condição
        $('div[id="selBool' + DivCount + '"]').hide();
        $('div[id="selIntReal' + DivCount + '"]').hide();
        $('div[id="boolLabel' + DivCount + '"]').hide();

        // Condição para mostrar na tela se os campos serão para dados tipo Bool, ou Int / Real
        if (dadoSelecionado == 'bool') {
            $(endText).text("DBX");

            if (SelAcao == 'escrita') {
                $('div[id="selBool' + DivCount + '"]').show();
                $('div[id="boolLabel' + DivCount + '"]').show();
            }
            else if (SelAcao == 'leitura') {
                $('div[id="selIntReal' + DivCount + '"]').show();
            }
        }
        else if (dadoSelecionado == 'real' | dadoSelecionado == 'int') {
            $('div[id="selIntReal' + DivCount + '"]').show();

            if (dadoSelecionado == 'real') {
                $(endText).text("DBD");
            }
            else {
                $(endText).text("DBW");
            }
        }
        else if (dadoSelecionado == 'tipo') {
            $('div[id="selBool' + DivCount + '"]').hide();
            $('div[id="selIntReal' + DivCount + '"]').hide();
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