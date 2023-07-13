$(document).ready(function () {
    var DivCount = 0;

    $('#btnAdicionarDiv').click(function () {
        DivCount++;

        // Cria a div dinamicamente
        var novaDiv = $('<div class="minhaDiv">');

        // Cria o campo de ComboBox
        //var comboBox = $('<select name="combobox' + DivCount + '">');
        // Adicione as opções desejadas ao select
        //comboBox.append($('<option value="leitura">Ler Dados</option>'));
        //comboBox.append($('<option value="escrita">Escrever Dados</option>'));


        // Cria um campo do tipo Radio Button
       
        var rbSelRead = $('<input>').attr({
            type: 'radio',
            name: 'SelAcao_' + DivCount,
            value: 'escrita',
            class: 'btnRadio'
        });
        var rbSelWrite = $('<input>').attr({
            type: 'radio',
            name: 'SelAcao_' + DivCount,
            value: 'leitura',
            class: 'btnRadio'
        });
        novaDiv.append(rbSelRead).append('Escrita');
        novaDiv.append(rbSelWrite).append('Leitura');

        



        // Cria o campo input
        var input = $('<input type="text" name="inputDiv' + DivCount + '">');

        // Cria o botão de envio
        var btnEnviar = $('<button class="btnEnviarDiv" data-divindex="' + DivCount + '">Enviar</button>');

        // Adiciona os campos à div
        novaDiv.append(rbSelRead);
        novaDiv.append(rbSelWrite);
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
            url: '/ReadWrite/Action',   // Controler e método que os dados serão enviados 
            type: 'POST',               // Tipo de Requisição feita para o Back-End
            dataType: "json",           // Formato de dados que será enviado
            data: dadosDiv,             // Dados coletados do Front-End e enviados para o Back-end
            success: function (response) {      // Respostas para o cliente do Back-end
                console.log(response);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});