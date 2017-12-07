offSet = 10;

function moveRight(view) {
    var dvSize = $(view).position();
    elemWidth = $(view).width();
    WinWidth = $(window).width();
    positionX = dvSize.left + elemWidth + 10;
    if (positionX <= WinWidth) {
        $(view).css({
            left: '+=' + offSet + 'px',
        });
    } else {
        $(view).css({
            left: WinWidth - eleleWidthm + 'px',
        });
    }
}

function moveUp(view) {
    var dvSize = $(view).position();
    positionY = dvSize.top - 10;

    if (positionY >= 0) {
        $(view).css({
            top: '-=' + offSet + 'px',
        });
    } else {
        $(view).css({
            top: '0px',
        });
    }
}

function moveLeft(view) {
    var dvSize = $(view).position();
    positionX = dvSize.left - 10;

    if (positionX > 0) {
        $(view).css({
            left: '-=' + offSet + 'px',
        });
    } else {
        $(view).css({
            left: '0px',
        });
    }
}

function moveDown(view) {
    var dvSize = $(view).position();
    elemHeight = $(view).height();
    winHeight = $(window).height();
    positionX = dvSize.top + elemHeight + 10;

    if (positionX <= winHeight) {
        $(view).css({
            top: '+=' + offSet + 'px',
        });
    } else {
        $(view).css({
            top: winHeight - elemHeight + 'px',
        });
    }
}

function keyDirectionPressed(e, result_dv) {
    switch (e.which) {
        case 37: //vers la gauche
            moveLeft(result_dv);
            break;
        case 38: //vers le haut
            moveUp(result_dv);
            break;
        case 39: //vers la droite
            moveRight(result_dv);
            break;
        case 40: //vers le bas
            moveDown(result_dv);
    }
}

// $(document).ready(function() {
//     $("button").click(function() {
//         var div = $("div");
//         div.animate({
//             height: '300px',
//             opacity: '0.4'
//         }, "slow");
//         div.animate({
//             width: '300px',
//             opacity: '0.8'
//         }, "slow");
//         div.animate({
//             height: '100px',
//             opacity: '0.4'
//         }, "slow");
//         div.animate({
//             width: '100px',
//             opacity: '0.8'
//         }, "slow");
//     });
// });