function initializeMatriceIdn(nbLine) {
    matrice = [
        []
    ];
    for (var i = 0; i < nbLine; i++) {
        vec = [];
        for (var j = 0; j < nbLine; j++) {
            if (i != j) {
                vec.push(0);
            } else vec.push(1);
        }
        matrice.push(vec);
    }
    //console.log("Initialisation:: = " + matrice);
    //console.log(matrice);
    return matrice;
}

function permuteLines(matrice, nbLine, numL1, numL2) {
    A = matrice;
    vec = [];
    for (var i = 0; i < nbLine; i++) {
        vec.push(A[numL1][i]);
    }

    for (var i = 0; i < nbLine; i++) {
        A[numL1][i] = A[numL2][i];
    }
    for (var i = 0; i < nbLine; i++) {
        A[numL2][i] = vec[i];
    }
    return A;
}

function lineOfFirstZero(matrice, nbLine, colNumber, startLine) { //return a first line of the column where we have 0 or false if not;
    for (var i = startLine; i <= nbLine; i++) {
        if (matrice[i][colNumber - 1] == 0) return i;
    }
    return false;
}

function firstPivotLine(matrice, nbLine, colNumber, startLine) { //return a first line of the column where we haven't 0 or false if all column have 0;
    for (var i = startLine; i <= nbLine; i++) {
        if (matrice[i][colNumber - 1] != 0) return i;
    }
    return false;
}

function getCoefToAnnule(matrice, colNumber, lineToAnnuleCol, lineToUse) {
    return -(matrice[lineToAnnuleCol][colNumber - 1] / matrice[lineToUse][colNumber - 1]);
}

function kMultiplicationLine(matrice, nbLine, lineMult, k) {
    A = matrice;
    vec = [];
    for (var i = 0; i < nbLine; i++) {
        vec.push(A[lineMult][i] * k);
    }
    return vec;
}

function sommeLines(matrice, nbLine, vec, lineToAnnuleCol, lineToUse) {
    A = matrice;
    for (var i = 0; i < nbLine; i++) {
        A[lineToAnnuleCol][i] = Number(Number(A[lineToAnnuleCol][i]) + Number(vec[i]));
        //console.log("A[" + lineToAnnuleCol + "," + i + "]=" + A[lineToAnnuleCol][i] + "   A[" + lineToUse + "," + i + "]=" + A[lineToUse][i] + "  vec=" + vec[i]);
    }
    return A;
}

function cleanMatrice(matrice, nbLine){
    for(var i = 0; i<nbLine; i++){
        for(var j = 0; j<nbLine; j++){
            nb=matrice[i+1][j];
            matrice[i+1][j]=Math.round(matrice[i+1][j]*1000)/1000;
            console.log("avant : "+nb+" apres : "+matrice[i+1][j]);
        }
    }

    return matrice;
}

function inverseMatrice(matrice, nbLine) {
    matInitiale = matrice;
    matInverse = initializeMatriceIdn(nbLine);
    for (var i = 1; i < nbLine; i++) { //les ligne de pivot
        linePivot = firstPivotLine(matInitiale, nbLine, i, i); //We chearch the first line where the column is not null
        if (!linePivot) return false; //we return false if all columns is null
        matInitiale = permuteLines(matInitiale, nbLine, i, linePivot); //if we fine the line we permute it with line number i
        matInverse = permuteLines(matInverse, nbLine, i, linePivot);
        linePivot = i; //and line number i become the line pivot
        for (var sideLines = i + 1; sideLines <= nbLine; sideLines++) {
            k = getCoefToAnnule(matInitiale, i, sideLines, i);
            vecInitial = kMultiplicationLine(matInitiale, nbLine, i, k);
            //console.log("vecInitiale = " + vecInitial);
            vecInverse = kMultiplicationLine(matInverse, nbLine, i, k);

            matInitiale = sommeLines(matInitiale, nbLine, vecInitial, sideLines, i);
            matInverse = sommeLines(matInverse, nbLine, vecInverse, sideLines, i);
            matInitiale[sideLines][i - 1] = 0;
            //console.log("___________________________");
        }
    }
    if (matInitiale[nbLine][nbLine - 1] == 0) return false;

    for (var i = 0; i < nbLine; i++) {

        k = 1 / matInitiale[i + 1][i];
        vec = kMultiplicationLine(matInitiale, nbLine, i + 1, k);
        //console.log("init : k= " + k);
        //console.log("init : vec= " + vec);
        matInitiale[i + 1] = vec;
        vec = kMultiplicationLine(matInverse, nbLine, i + 1, k);
        //console.log("invers : k= " + k);
        //console.log("invers : vec= " + vec);
        matInverse[i + 1] = vec;
    }
    //console.log("apres matInitiale = " + matInitiale);
    //console.log("pares matInverse = " + matInverse);
    //console.log(matInitiale);

    //console.log("*********************************");
    for (var i = nbLine - 1; i >= 1; i--) {
        nbRightCol = nbLine - i;
        for (var j = i + 1; j <= nbLine; j++) {
            nbSideLine = j; //nbLeftCol = nbSideLine
            k = -matInitiale[i][j - 1];
            vec = kMultiplicationLine(matInverse, nbLine, j, k);
            //console.log("vecteurInv de ligne " + j + " " + vec);
            matInverse = sommeLines(matInverse, nbLine, vec, i, j);

        }

    }
    //console.log("fin matInverse = " + matInverse);

    return matInverse;

}