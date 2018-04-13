const getEachElementsMatrix = (state) => {
    const elementsMatrix = [];
    state.incidences.map((incidence, incidenceIndex) => {
        const firstNode = state.coordinates[incidence[1]];
        const secondNode = state.coordinates[incidence[2]];
        const l = Math.pow(firstNode[1] - secondNode[1], 2) + Math.pow(firstNode[2] - secondNode[2], 2);
        const a = state.geometric_properties[0][0]; // considerando que só existe um tipo de elemento no projeto
        const e = state.materials[0][0]; // considerando que só existe um tipo de elemento no projeto
        const cos = (firstNode[1] - secondNode[1])/l;
        const sin = (firstNode[2] - secondNode[2]) / l;
        const firstRow = [Math.pow(cos, 2), cos * sin, -(Math.pow(cos, 2)), - (cos * sin)];
        const secondRow =  [cos * sin, Math.pow(sin, 2), -(cos * sin), -(Math.pow(sin, 2))];
        const thirdRow = [-(Math.pow(cos,2)), -(cos*sin), Math.pow(cos,2), cos*sin];
        const fourthRow = [-(cos*sin), -(Math.pow(sin,2)), cos*sin, Math.pow(sin,2)];
        let k =  [firstRow, secondRow, thirdRow, fourthRow];
        const multi = (e*a)/l;
        k  = k.map((row) => {
            row[0] *= multi;
            row[1] *= multi;
            row[2] *= multi;
            row[3] *= multi;
            return row;
        });
        elementsMatrix.push(k);
        return k;
    });
    return elementsMatrix;
};

const inicializeMatrix = (height,width,elementToInicialize) => {
    const matrix = [];
    for(var i =0;i < height;i++) {
        const row = [];
        for (var j = 0; j < width; j++) {
            row.push(elementToInicialize);
        }
        matrix.push(row);
    }
    return matrix;
};

const getSuperMatrixIndexes = (index,i, j) => {
    if(index === 0) {
        return i,j;
    } else if (index === 1) {
        return i+3,j+3
    }
    let a = i;
    let b = j;
    if(a > 1) {
        a +=2;
    }
    if(b > 1) {
        b +=2;
    }
    return a,b;
};

const superposeMatrix = (elementsMatrix) => {
    const superMatrixSize = elementsMatrix.length * 2;
    const superMatrix = inicializeMatrix(superMatrixSize,superMatrixSize,0);
    elementsMatrix.map((elementMatrix, index) => {
        for(var i =0; i < elementMatrix.length; i++) {
            for(var j =0; j < elementMatrix[i].length; j++) {
                const a,b =  getSuperMatrixIndexes(index,i,j);
                superMatrix[a][b] = elementMatrix[i][j];
            }
        }
    });
    return superMatrix;
};

const inicializeGlobalForcesVector = (elementGroups) => {
    const vect = [];
    for(var i =0; i < elementGroups.length; i++) {
        vect.push(0);
    }
    return vect;
};

const getGlobalForcesVector = (state) => {
    const loads = state.loads;
    const globalForcesVector = inicializeGlobalForcesVector(state.element_groups);
    loads.map((load, index) => {
        const loadNumber =load[0];
        const direction = load[1];
        const force =  load[2];
        globalForcesVector[(loadNumber-1)*2 + direction -1] = force;
    });
    return globalForcesVector;m                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     bkvjchccjxxjk
};

export const doEverything = (state) => {
    const elementsMatrix =  getEachElementsMatrix(state);
    const superposedMatrix = superposeMatrix(elementsMatrix);
    const globalForcesVector = getGlobalForcesVector(state);
};