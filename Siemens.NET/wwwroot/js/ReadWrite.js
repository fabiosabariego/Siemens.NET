$(document).ready(function () {
    var DivCount = 0;

    $('#btnAdicionarDiv').click(function () {
        DivCount++;

        // Cria a div dinamicamente
        var novaDiv = $('<div class="minhaDiv">');
        var leEscreveDiv = $('<div class="leEscreveDiv">');
        var enderecoDiv = $('<div class="enderecoDiv">');
        var valorPlcDiv = $('<div class"valorPlcDiv">');

        //***********************************************************************
        // Recebe dados vindo da Seleção do tipo de dados do HTML
        var tipoDadosHtml = document.getElementById('selTipoDados').value;
        var tipoDados = $('<input type="text" name="tipoDados' + DivCount + '">');
        //***********************************************************************

        //***********************************************************************
        // Carrega texto para o Popup
        var txtPopup = document.createElement("p").textContent = 'Dados Tipo - ' + tipoDadosHtml;
        novaDiv.append(txtPopup);
        //***********************************************************************

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
        // Cria o campo input para definir o endereço de leitura ou escrita no PLC
        var enderecoLabel = document.createElement("label").textContent = "Endereço";
        var endereco = $('<input type="text" name="enderecoDiv' + DivCount + '">');

        //Adicionando Div e valores para Endereço do PLC
        enderecoDiv.append(enderecoLabel);
        enderecoDiv.append(endereco);
        novaDiv.append(enderecoDiv);
        //***********************************************************************


        //***********************************************************************
        // Coleta o valor selecionado no campo de Tipo de Dados
        
        if (tipoDadosHtml == 'Bool') {

            // Monta Popup na tela para Escrita de dados do tipo Bool, ou outros
            var SelValTrue = $('<input>').attr({
                type: 'radio',
                name: 'valorPlcDiv' + DivCount,
                value: 'true',
                class: 'RadioBtnValPlc'
            });
            var SelValFalse = $('<input>').attr({
                type: 'radio',
                name: 'valorPlcDiv' + DivCount,
                value: 'false',
                class: 'RadioBtnValPlc'
            });
            valorPlcDiv.append(SelValTrue).append('True');
            valorPlcDiv.append(SelValFalse).append('False');
            novaDiv.append(valorPlcDiv);
        //***********************************************************************

        } else if (tipoDadosHtml == 'Real' | tipoDadosHtml == 'Int') {


            //***********************************************************************
            // Cria o campo input com valor a ser enviado ou lido do PLC
            var valorPlcLabel = document.createElement("label").textContent = "Valor";
            var valorPlc = $('<input id="valorPlc' + DivCount + '" type="text" name="valorPlcDiv' + DivCount + '">');

            //Adicionando Div e valores para Endereço do PLC
            valorPlcDiv.append(valorPlcLabel);
            valorPlcDiv.append(valorPlc);
            novaDiv.append(valorPlcDiv);
        //***********************************************************************

        };
        //***********************************************************************


        //***********************************************************************
        // Cria o botão de envio
        var btnEnviar = $('<button class="btnEnviarDiv" data-divindex="' + DivCount + '">Enviar</button>');

        novaDiv.append(btnEnviar);
        //***********************************************************************

        // Adiciona a div ao container
        $('#divContainer').append(novaDiv);
    });

    // Manipula o evento de clique no botão de envio
    $(document).on('click', '.btnEnviarDiv', function () {
        var divIndex = $(this).data('divindex');

        // Recupera os valores dos campos da div específica
        var valAcao = $('input[name=SelAcao_' + divIndex + ']:checked').val();
        var valEndereco = $('input[name="enderecoDiv' + divIndex + '"]').val();
        var valPlc = $('input[name="valorPlcDiv' + divIndex + '"]').val();
        var tipoDadosPlc = $('input[name="tipoDados' + divIndex + '"]').val();

        // Cria o objeto com os dados da div
        var dadosDiv = {
            //ValorSelect: valAcao,
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
                    console.log(response);
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
                success: function (resLeitura) {
                    document.getElementById(idValorPlc).value = resLeitura.value;
                },
                error: function (error) {
                    // Lida com erros de requisição
                    console.log(error);
                }
            });

        }
        
    });
});