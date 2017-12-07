function onClickResult_bt(result_dv) {
    $(result_dv).show();
}

function getMatrice(nbLine, twoChr) {
    matrice = [
        []
    ];
    for (var i = 0; i < nbLine; i++) {
        vec = [];
        for (var j = 0; j < nbLine; j++) {
            id = twoChr + "" + i + "" + j;
            valeur = document.getElementById(id).value;
            if (isNaN(valeur) || valeur == null || valeur == "") {
                return false;
            }
            vec.push(Number(valeur));
        }
        matrice.push(vec);
    }
    //console.log(matrice);
    return matrice;
}

function generateTable(html, nbLine, twoChr) {
    matName = twoChr == "m1" ? "A" : "B";
    html.innerHTML += "<th colspan='" + nbLine + "'>MATRICE " + matName + "</th>"
    for (var i = 0; i < nbLine; i++) {
        td = "";
        for (var j = 0; j < nbLine; j++) {
            td += '<td><input type="number" step="0.001" id="' + matName +""+ i + "" + j + '" class="cells" ></td>';
            //<input type='" + text + "' id='e" + i + "" + j + "'>
            //console.log(i + "" + j)
        }
        html.innerHTML += "<tr>" + td + "</tr>";
    }
}

function generateResultView(Matrice, nbLine, view_dv_html, opType) {
    view_dv_html.innerHTML += "<th colspan='" + nbLine + "'>" + opType + "</th>"
    for (var i = 1; i <= nbLine; i++) {
        td = "";
        for (var j = 0; j < nbLine; j++) {
            td += '<td class="resultCells_td">' + Matrice[i][j] + '</td>';
        }
        view_dv_html.innerHTML += "<tr>" + td + "</tr>";
    }
}

function sommeMatrice(A, B, nbLine) {
    resultat = [
        []
    ];
    for (var i = 1; i <= nbLine; i++) {
        vec = [];
        for (var j = 0; j < nbLine; j++) {
            somme = Number(A[i][j]) + Number(B[i][j]);
            vec.push(somme)
        }
        resultat.push(vec);
    }
    return resultat;
}

function produitMatrice(A, B, nbLine) {
    resultat = [
        []
    ];
    for (var i = 0; i < nbLine; i++) {
        vec = [];
        for (var j = 0; j < nbLine; j++) {
            produit = 0;
            for (k = 0; k < nbLine; k++) {
                produit += Number(A[i + 1][k]) * Number(B[k + 1][j]);
            }
            vec.push(produit);
        }
        resultat.push(vec);
    }
    return resultat;
}

function verifyIfNumber(Matrice, nbLine) {
    for (var i = 0; i < nbLine; i++) {
        for (var j = 0; j < nbLine; j++) {
            if (isNaN(Matrice[i + 1][j])) {
                return false;
            }
        }
    }
    return true;
}