﻿$(document).ready(function () {
    var DivCount = 0;

    $('#btnAdicionarDiv').click(function () {
        DivCount++;

        // Cria a div dinamicamente
        var novaDiv = $('<div class="minhaDiv">');

        // Adicionar o campo de radiobutton
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
        novaDiv.append(SelLeitura).append('Leitura');
        novaDiv.append(SelEscrita).append('Escrita');





        /*


        // Cria o campo select
        var select = $('<select name="selectDiv' + DivCount + '">');
        // Adicione as opções desejadas ao select
        select.append($('<option value="opcao1">Opção 1</option>'));
        select.append($('<option value="opcao2">Opção 2</option>'));

        */




        // Cria o campo input
        var input = $('<input type="text" name="inputDiv' + DivCount + '">');

        // Cria o botão de envio
        var btnEnviar = $('<button class="btnEnviarDiv" data-divindex="' + DivCount + '">Enviar</button>');

        // Adiciona os campos à div
        //novaDiv.append(select);
        novaDiv.append(input);
        novaDiv.append(btnEnviar);

        // Adiciona a div ao container
        $('#divContainer').append(novaDiv);
    });

    // Manipula o evento de clique no botão de envio
    $(document).on('click', '.btnEnviarDiv', function () {
        var divIndex = $(this).data('divindex');

        // Recupera os valores dos campos da div específica
        var valorSelect = $('input[name=SelAcao_' + divIndex + ']:checked').val();
        var valorInput = $('input[name="inputDiv' + divIndex + '"]').val();

        // Cria o objeto com os dados da div
        var dadosDiv = {
            ValorSelect: valorSelect,
            ValorInput: valorInput
        };

        // Envia os dados para o backend usando uma requisição AJAX
        $.ajax({
            url: '/ReadWrite/Action', // Substitua "Controller" pelo nome real do seu controlador e "Action" pela ação que receberá os dados
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
    });
});