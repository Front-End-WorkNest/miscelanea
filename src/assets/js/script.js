$(function() {

    //    $("button").click(function() {
    //        $('#box').fadeOut(1000);
    //    });

    //    $('h1,h2,h3').css('border', 'solid 1px red');

    //    $('div#container').css('border', 'solid 1px red');

    //    $('p.lead').css('border', 'solid 1px red');

    //    $('li:first').css('border', 'solid 1px red');

    //    $('p:even').css('border', 'solid 1px red');

    //    $('div em').css('border', 'solid 1px red');

    //    $('div > p').css('border','solid 1px red');

    //    $(':header').css('border', 'solid 1px red');

    //    $('div:contains("fredd")').css('border', 'solid 1px red');

    /*    $('#box').click(function() {
                alert('you just cicked the box');
            });

            //lost focus ↓
            $("input").blur(function() {
                if ($(this).val() == "") {
                    $(this).css('border', 'solid 1px red');
                    $('#box').text('Forgot to add text?');
                }
            });


            $("input").keydown(function() {
                if ($(this).val() !== "") {
                    $(this).css('border', 'solid 1px #777');
                    $('#box').text('Thanks for that');
                }
            });

            para cuando se entra en un objeto parecido al focus
            $('#box').hover(function() {
                $(this).text('You hovered!');
            }, function() {
                $(this).text('you hovered out');
            });


            chaining↓↓↓
            $('.notification-bar').delay(1000).slideDown().delay(1000).fadeOut();

        //    $('div.hidden').hide();

        //    $('div.hidden').fadeIn(4000);

        $('#box1').click(function() {
            $(this).fadeTo(1000, 0.20, function() {
                //animation is competed
                $(this).slideUp();
            });
        });

        $('div.hidden').hide().slideDown(1000);

        $('button').click(function() {
            $('#box1').slideToggle();
        });


        $('#left').click(function() {
            $('.box').animate({
                left: "-=40px",
                fontSize: "+=2px"
            }, function() {

            });
        });

        $('#up').click(function() {
            $('.box').animate({
                top: "-=40px",
                opacity: "+=.03"
            }, function() {

            });
        });

        $('#right').click(function() {
            $('.box').animate({
                left: "+=40px",
                fontSize: "-=2px"
            }, function() {

            });
        });

        $('#down').click(function() {
            $('.box').animate({
                top: "+=40px",
                opacity: "-=.03"
            }, function() {

            });
        });

        $('#circle2').css({
            'background': '#8a8d22',
            'display': 'inline-block',
            'color': 'white',
            'text-align': 'center',
            'line-height': '140px',
            'heigth': '140px',
            'width': '140px',
            'margin': '40px'
        }).addClass('circleShape');
    */

    //click go button
    $('#go').click(function() {

        //functions to see if the car has won the race
        function checkIfcomplete() {
            if (isComplete == false) {
                isComplete = true;
            } else {
                place = 'second';
            }
        }
        //get the width of the cars
        var carWidth = $('#car1').width();

        //get the width of the racetrack
        var raceTrackWidth = $(window).width() - carWidth;

        //generate a random number from 1 to 5000 ish
        var raceTime1 = Math.floor((Math.random() * 5000) + 1);
        var raceTime2 = Math.floor((Math.random() * 5000) + 1);

        //set a flag variable to false by default
        var isComplete = false;

        //set a flag cariable to first bt default
        var place = 'first';

        //animate car1
        $('#car1').animate({
            //move the car width of the racetrack
            left: raceTrackWidth
        }, raceTime1, function() {
            //animation ios comlpete
            //run a function
            checkIfcomplete();
            $('#raceInfo1 span').text('Finished in ' + place + ' place and clocked in at ' + raceTime1 + ' milliseconds!');
        });

        //animate car2
        $('#car2').animate({
            //move the car width of the racetrack
            left: raceTrackWidth
        }, raceTime2, function() {
            //animation ios comlpete
            //run a function
            checkIfcomplete();
            $('#raceInfo2 span').text('Finished in ' + place + ' place and clocked in at ' + raceTime2 + ' milliseconds!');
        });

    });

    $('#reset').click(function() {
        $('.car').css('left', '0');
        $('.raceInfo span').text('');
    });

    $('body').scrollspy({ target: '#espia' });

    $('#espia').on('activate.bs.scrollspy', function() {
        // do something…
    });

    genPDF = function() {
        var doc = new jsPDF();
        doc.text(20, 20, 'test message');
        doc.addPage();
        doc.text(20, 20, 'test page 2');
        doc.save('Test.pdf');
    }
    genPDF2 = function() {
        var campo = document.getElementById('campo1').value;
        console.log(elem);
        var doc = new jsPDF();
        doc.text(campo);
        doc.fromHTML($('#campos').get(0), 10, 10, {
            'width': 500
        });
        // doc.fromHTML($('#campo2').get(0), 30, 30, {
        //     'width': 500
        // });
        doc.save('Test.pdf');
    }

    function tableToJson(table) {
        var data = [];
        var headers = [];
        for (var i = 0; i < table.rows[0].cells.length; i++) {
            headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
        }
        data.push(headers);

        for (var i = 1; i < table.rows.lenght; i++) {
            var tableRow = table.rows[i];
            var rowData = [];
            for (var j = 0; j < tableRow.cells.lenght; i++) {
                rowData[headers[j]] = tableRow.cells[j].innerHTMLM
            }
            data.push(rowData);
        }
        return data;
    }
    gentabla = function() {

        //las 2 lineas de codigo cson para tomar texto de un input
        //     var campo = document.getElementById('campo1').value;
        //     doc.text(campo);

        //La siguiente linea de codigo sirve para tomar del html diversas cosas en este caso de una etiqueta <p>
        // doc.fromHTML($('#texto').get(0), 10, 10, {
        //     'width': 500
        // });

        //Se crea la variable table, recupera desde el HTML la tabla con el id carrito y se transforma en JSON para luego poder ser utilizado
        var table = $('#carrito').tableToJSON();
        console.log(table);
        //variable doc del objeto jsPDF con los parametros
        //  p=portrait (orientacion de la pagina)
        //  pt=?
        //  letter=tamaño de la hoja
        var doc = new jsPDF('p', 'pt', 'letter', true);
        doc.setFontSize(28);
        doc.text(220, 80, 'La Miscelanea');
        doc.setFontSize(14);
        doc.rect(385, 97, 205, 59);
        doc.text(388, 110, "Total:                      $");
        doc.text(388, 130, "Cantidad Recibida: $");
        doc.text(388, 150, "Cambio:                  $");

        //se recuperan los datos como el total, cantidad recibida y el cambio
        doc.fromHTML($('#total').get(0), 528, 92, {});
        doc.fromHTML($('#recibido').get(0), 528, 110, {});
        doc.fromHTML($('#cambio').get(0), 528, 130, {});
        doc.text(42, 175, 'Código de Barras    Nombre                      Precio               Cantidad     Subtotal');
        doc.setFontSize(12);

        //se inicializa doc para la generacion de la tabla usando el JSON anteriormete generado
        //en cada if se define el tamaño de cada celda
        doc.cellInitialize();
        let a = 0,
            b = 0,
            c = 0;
        $.each(table, function(i, row) {
            $.each(row, function(j, cell) {


                if (j == "Código de barras") {
                    doc.cell(40, 186, 115, 26, cell, i);
                }
                if (j == "Nombre") {
                    doc.cell(40, 186, 143, 26, cell, i);
                }
                if (j == "Descripción") {

                    //doc.cell(40, 186, 140, 26, cell, i);
                }
                if (j == "Precio venta") {
                    a = Number(cell);
                    doc.cell(40, 186, 91, 26, cell, i);
                }
                if (j == "Cantidad") {
                    b = Number(cell);
                    doc.cell(40, 186, 88, 26, cell, i);
                }
                if (j == "Acciones") {
                    c = a * b;
                    doc.cell(40, 186, 88, 26, (c.toString()), i);
                    // doc.cell(1, 10, 190, 20, cell, i);
                }
            });
        });
        //por ultimo se guarda el archivo para impresion
        doc.save('ticket.pdf');
    }
});