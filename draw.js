$(document).ready(function() {
    var drawContainer = $('#draw-container');
    var currentColor = "";
    var canvas, ctx;
    var mousePressed = false;

    createCanvas(drawContainer);
    createColorTool();
    createColors();
    /*
     *  Injéction des éléments dans le DOM
     */

    function createCanvas(drawContainer) {
        /*
         * Cette fonction permet la création du canvas hors du DOM
         * Par défaut, le canvas ira se créer dans une DIV 
         * dont l'ID est "#draw-container"
         * les attributs CSS peuvent être modifiés ici
         */
        var canvas = $('<canvas></canvas>');
        drawContainer.append(canvas);

        canvas.attr({
            'class': 'canvas',
            'id': 'canvas',
            'width': '500px',
            'height': '400px'
        });

        $('.canvas').css({
            'border': '1px solid black',
            'cursor': 'crosshair'
        });
        //alert(x,y);
        canvas = document.getElementById('canvas');
        //on récupère le contexte du canvas (ici, en 2D)
        ctx = canvas.getContext("2d");

    }

    function createColorTool() {
        /*
         * Cette fonction permet la création d'une palette de couleurs
         * Par défaut, elle ira se créer dans une DIV 
         * dont l'ID est "#draw-container", elle se placera apres le canevas
         * les attributs CSS peuvent être modifiés ici
         */
        var colorTool = $('<div></div>');
        $('#draw-container').append(colorTool);

        colorTool.attr('class', 'colorTool');
        $('.colorTool').css({
            'margin': '0 auto',
            'margin-top': '15px',
            'height': '90px',
            'width': '500px'
        });

    }

    function createColors() {
        //tableau des couleurs
        var colors = ({
            'noir': '#000000',
            'blanc': '#FFFFFF',
            'rouge': '#FF0000',
            'magenta': '#FE2E64',
            'rose': '#FE2EF7',
            'violet': '#9A2EFE',
            'bleu': '#2E2EFE',
            'cyan': '#2EFEF7',
            'lime': '#64FE2E',
            'jaune': '#F7FE2E'
        });

        //création dynamique de la palette de couleurs
        for (var color in colors) {
            var div = $('<div></div>');
            div.attr({
                'id': color,
                'class': 'colorPick'
            });
            div.css({
                'height': '40px',
                'margin': '0 4px 0 4px',
                'border': '1px solid grey',
                'width': '40px',
                'float': 'left',
                'cursor': 'pointer',
                'background-color': colors[color]
            });
            $('.colorTool').append(div);
        }
    }


    /*
     * Mise en place des listeners
     */


    $('.colorPick').click(function() {
        //au clic sur une couleur, on l'affecte à la variable globale
        currentColor = $(this).css('background-color');
    });


    $('.canvas').mousedown(function(e) {
        //au clic de la souris, on appelle une fois la fonction de dessin
        // puis on définie la variable mousePressed à true
        getPixelPosition(e);
        mousePressed = true;
    });


    $('.canvas').mouseup(function(e) {
        //quand on relahe la souris, mousePressed passe à false
        //ce qui arrete le dessin
        mousePressed = false;
    });


    $('.canvas').on("mousemove", function(e) {
        //si la souris bouge alors que mousePressed est vrai
        //alors on appelle la fonction de dessin
        if (mousePressed) {
            getPixelPosition(e);
        }
    });

    function getPixelPosition(e) {

        //récupère la position du canvas par rapport au dom
        var position = $('.canvas').position();
        var color = currentColor;
        //on regarde la position du clic par rapport au canvas
        // position de l'evenement (moins) positionnement du canevas
        var posX = e.pageX - position.left;
        var posY = e.pageY - position.top;
        //var posY = ($(this).height()) - posY;
        console.log("x = "+posX + ' | y = ' + posY);

        colorizePxl(posX, posY, color);
    }
    /*
     *Appliquer la couleur sur le pixel selectionné 
     */

    function colorizePxl(x, y, color) {
    
        //ctx.beginPath();      // Debut du chemin
        //ctx.moveTo(x-10, y+10);    // Le trace part du point x,y
        //ctx.lineTo(x, y);   // Puis on trace jusqua� x,y
        ctx.lineWidth = 9;         // Definition de la largeur 

        //ctx.closePath();    //fermeture du trace
        ctx.fillStyle = color; // Definition de la couleur de contour
        ctx.fillRect((x-3),(y-3),6,6);   //on declenche le trace
    }
});