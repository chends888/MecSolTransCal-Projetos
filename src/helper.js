//codeshare.io/hugoisaechen
var math = require('mathjs');


export const getDemoState = (method, iterations, tolerance) => {
  return {
    method,
    iterations,
    tolerance,
    step: 1,
    showInputsModal: true,
    coordinates: [[1, 0, 0], [2, 0, 0.4], [3, 0.3, 0.4]],
    element_groups: [[1, 1, "BAR"], [2, 1, "BAR"], [3, 1, "BAR"]],
    incidences: [[1, 1, 2], [2, 2, 3], [3, 3, 1]],
    materials: [
      [Math.pow(210, 9), Math.pow(1570, 6), Math.pow(1570, 6)],
      [Math.pow(210, 9), Math.pow(1570, 6), Math.pow(1570, 6)],
      [Math.pow(210, 9), Math.pow(1570, 6), Math.pow(1570, 6)]
    ],
    geometric_properties: [
      [Math.pow(2, -4)],
      [Math.pow(2, -4)],
      [Math.pow(2, -4)]
    ],
    bcnodes: [[1, 1], [2, 1], [2, 2]],
    loads: [[3, 1, 150], [3, 2, -100]]
  };
};

export const savefile = state => {
  return;
  console.log("SALVAR ARQUIVO");
  var txtFile = "entrada.txt";
  var file = new File([" "], txtFile);
  //coordinates right
  file.writeln("*Coordinates");
  file.writeln(state.coordinates.length.toString());
  state.coordinates.map((coord, index) => {
    file.writeln(`${index + 1} ${coord[1]} ${coord[2]}`);
  });
  file.writeln("");
  //elements right
  file.writeln("*ELEMENT_GROUPS");
  file.writeln(state.element_groups.length.toString());
  state.element_groups.map((ele, index) => {
    file.writeln(`${index + 1} ${ele[1]} ${ele[2]}`);
  });
  file.writeln("");
  //incidences right
  file.writeln("*INCIDENCES");
  file.writeln(state.incidences.length.toString());
  state.incidences.map((inc, index) => {
    file.writeln(`${index + 1} ${inc[1]} ${inc[2]}`);
  });
  file.writeln("");
  //materials right
  file.writeln("*MATERIALS");
  file.writeln(state.materials.length.toString());
  state.materials.map((mat, index) => {
    file.writeln(`${mat[0]} ${mat[1]} ${mat[2]}`);
  });
  file.writeln("");
  //geometric properties right
  file.writeln("*GEOMETRIC_PROPERTIES");
  file.writeln(state.geometric_properties.length.toString());
  state.geometric_properties.map((geo, index) => {
    file.writeln(`${geo[0]}`);
  });
  file.writeln("");
  //bcnodes right
  file.writeln("*BCNODES");
  file.writeln(state.bcnodes.length.toString());
  state.bcnodes.map((bc, index) => {
    file.writeln(`${bc[0]} ${bc[1]}`);
  });
  file.writeln("");
  //loads right
  file.writeln("*LOADS");
  file.writeln(state.loads.length.toString());
  state.loads.map((loads, index) => {
    file.writeln(`${loads[0]} ${loads[1]} ${loads[2]}`);
  });
  console.log("SALVOU ARQUIVO");
  file.close();
};


// const deformacao = (state,matrixAnswer,indices) => {
//     const deformations = [];
//     state.incidences.map((incidence, incidenceIndex) => {
//         const firstNode = state.coordinates[incidence[1]-1];
//         const secondNode = state.coordinates[incidence[2]-1];
//         const l = Math.pow(firstNode[1] - secondNode[1], 2) + Math.pow(firstNode[2] - secondNode[2], 2);
//         const cos = (firstNode[1] - secondNode[1])/l;
//         const sin = (firstNode[2] - secondNode[2]) / l;
//         const maths = [[-cos,-sin, cos, sin]];
//         const fullMatrixAnswer = buildFullMatrixAnswer(matrixAnswer, indices);
//     });
// };

const  tensao = (deformations,materials) => {
    return deformations.map((deformation, index) => {
        return deformation*materials[index][0];
    });
};

const getEachElementsMatrix = (state) => {
    const elementsMatrix = [];
    state.incidences.map((incidence, incidenceIndex) => {
        const firstNode = state.coordinates[incidence[1]-1];
        const secondNode = state.coordinates[incidence[2]-1];
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
        return {a:i,b:j};
    } else if (index === 1) {
        return {a:i+2,b:j+2}
    }
    let a = i;
    let b = j;
    if(a > 1) {
        a +=2;
    }
    if(b > 1) {
        b +=2;
    }

    
    return {a,b};
};

const superposeMatrix = (elementsMatrix) => {
    const superMatrixSize = elementsMatrix.length * 2;
    const superMatrix = inicializeMatrix(superMatrixSize,superMatrixSize,0);
    elementsMatrix.map((elementMatrix, index) => {
        for(var i =0; i < elementMatrix.length; i++) {
            for(var j =0; j < elementMatrix[i].length; j++) {     
                const {a,b} =  getSuperMatrixIndexes(index,i,j);                
                superMatrix[a][b] = elementMatrix[i][j];
            }
        }
    });
    return superMatrix;
};

const inicializeGlobalForcesVector = (elementGroups) => {
    const vect = [];
    for(var i =0; i < elementGroups.length*2; i++) {
        vect.push([0]);
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
        globalForcesVector[(loadNumber-1)*2 + direction -1] = [force];
    });
    return globalForcesVector;
};

const getNodesDeslocationVector = (state) => {
    const vector = [];
    for(var i=0; i < state.coordinates.length *2;i+=1) {
        vector.push([1]);
    }
    state.bcnodes.map((bcnode) => {
        const indexToPush = (bcnode[0]-1)*2 + (bcnode[1]-1);
        vector[indexToPush] = [0];
    });
    return vector;
};


// 
const applyContornConditions = (superposedMatrix, globalForcesVector, globalForcesVector1) => {
  	const vforcas2 = [];
    const indices = [];
    for(var força=0; força < globalForcesVector.length;força+=1) {
        if(globalForcesVector[força][0] !== 0) {
            indices.push(força);
            vforcas2.push(globalForcesVector1[força]);
        }
    }
    const size = indices.length;
    const matriz = [];
    for(var i=0; i< size;i+=1) {
        const row = [];
        for(var j=0; j<size;j+=1) {
            row.push(0);
        }
        matriz.push(row);
    }
    let k = 0;
    let l = 0;
    indices.map((i) => {
        indices.map((j) => {
            matriz[k][l] = superposedMatrix[i][j];
            l+=1;
        });
        l = 0;
        k+=1;
    });
    return {matriz, indices, vforcas2};
};

const  Gauss = (ite, tol, a, b) => {
    let error = 0;
	const v = [];
	const erro = [];
	for(var i = 0; i < b.length;i++){
		v.push(1);
		erro.push(0);
    }

    for(var n =0; n < ite;n++) {
         for(var i =0; i < b.length;i++) {
            const temp = v[i];
            v[i] = b[i]/a[i][i];
            for(var l =0; l < b.length;l++) {
                if (l !== i){
                    v[i] -= ((v[l] * a[i][l])/a[i][i]);
                }
            }
            erro[i] = Math.abs((v[i] - temp)/v[i]);
         }
         if( error <= erro[i]) {
             error = erro[i];
         }
		 if (error > tol) {
             return {a: v, b: error};
         }
    }
    return {a: v, b: error};
};

const Jacobi = (ite, tol, a, b) => {
    let error = 0;
	const v = [];
	const erro = [];
    const vetor = [];
    for(var i=0;i <b.length;i++) {
        v.push(1);
        vetor.push(1);
        erro.push(0);
    }
    for(var n=0; n < ite; n++) {
        for(var i =0; i < b.length;i++) {
            v[i] = b[i]/a[i][i];
            for(var l=0; l < b.length;l++) {
                if (l !== i){
					v[i] -= ((vetor[l] * a[i][l])/a[i][i]);
                }
            }
            erro[i] = Math.abs((v[i] - vetor[i])/v[i]);
            for(var m=0; m < b.length; m++) {
                vetor[m] = v[m];
            }
        }
        if (error <= erro[i]){
			error = erro[i];
        }
		if (error > tol) {
			return { a: v, b: error };
        }
    }
    return { a: v, b: error };
};

const reac_apoios = (matrizona, deslocamentos, indices, reactionIndexes) => {
    const apoios = reactionIndexes;
	const sizel = apoios.length;
    const sizec = indices.length;   
    
    const matriz = math.zeros(sizel,sizec)._data;   
	let k = 0;
    let l = 0;
    apoios.map((i) => {
        indices.map((j) => {
            matriz[k][l] = matrizona[i][j];
			l+=1;
        });
        l = 0;
        k+=1;
    });		
    const reacoes = math.multiply(matriz, deslocamentos);
	return reacoes;
};

const fillListWithZeros = (deslocArray, indices, n ) => {
    const array = [];
    let counterDeslocArray = 0;
    for(var i = 0; i < n * 2 ;i++) {
        array[i] = 0;
    }
    indices.map((indice, index) => {       
        array[indice] = deslocArray[index];       
    });
    return array;
};

const getReactionIndices = (deslocIndices,n) => {
    const reactionIndices = [];
    for(var i =0; i<n*2;i++) {
        if(!deslocIndices.includes(i)) {
            reactionIndices.push(i);
        }
    }
    return reactionIndices;
};

const calc_deformacao = (desloc_decomp, v) => {
    console.log(desloc_decomp);
    const length = Math.sqrt(Math.pow(v[0] - v[2], 2) + Math.pow(v[1] - v[3], 2));
    const cos = (v[3] - v[1])/length;
    const sen = (v[2] - v[0])/length;
    const cossen = [[-cos, -sen, cos, sen]];
    let resultado = math.multiply(cossen, desloc_decomp);
    console.log(resultado);
    resultado = resultado/length;
    return resultado
};

const getDeformations = (state, deslocs) => {
    const deformations = [];
    state.incidences.map((incidence) => {
        const firstNode = state.coordinates[incidence[1] - 1];
        const secondNode = state.coordinates[incidence[2] - 1];
        const pos = [firstNode[1], firstNode[2], secondNode[1], secondNode[2]];
        const deslocation = [[deslocs[(incidence[1] - 1) * 2]], [deslocs[(incidence[1] - 1) * 2 + 1]],
         [deslocs[(incidence[2] - 1) * 2]],[ deslocs[(incidence[2] - 1) * 2 + 1]]];
        deformations.push(calc_deformacao(deslocation, pos));
    });
    return deformations
};


export const doEverything = (state) => {
    const elementsMatrix =  getEachElementsMatrix(state);
    const superposedMatrix = superposeMatrix(elementsMatrix);   
    const globalForcesVector = getGlobalForcesVector(state);    
    const nodesDeslocationVector = getNodesDeslocationVector(state); // n entendi onde vai usar isso que eu fiz     
    // const superposedMatrix = [[51200, 38400, 0, 0, -51200, -38400], [38400, 217361.8, 0, -188561.8, 38400, 28800], [0, 0, 141423.5, 0, -141423.5, 0], [0, -188561, 8, 0, 188561.5, 0, 0], [-51200, -38400, -141423.5, 0, 192621.3, 38400], [-38400, -28800, 0, 0, 38400, 28800]];
    // const globalForcesVector = [[0], [0], [0], [0], [1500], [-1000]];
    // const nodesDeslocationVector = [[0], [0], [0], [0], [1], [1]];
    console.log('vetor de deslocamento dos nós: ',nodesDeslocationVector);
    const { matriz, indices, vforcas2 } =  applyContornConditions(superposedMatrix, nodesDeslocationVector, globalForcesVector);
    console.log('indices com deslocamento: ', indices );
    console.log('forças globais cortadas: ', vforcas2);
    console.log('matriz contornada: ', matriz);
    let matrixAnswer;
    let error;
    console.log('Método de convergência selecionado: ', state.method);
    if(state.method === 'jacobi') {
       const {a, b} =  Gauss(state.iterations, state.tolerance, matriz, vforcas2);
       matrixAnswer = a;
       error = b;
    } else {
       const {a, b} = Jacobi(state.iterations, state.tolerance, matriz, vforcas2);
        matrixAnswer = a;
        error = b;
    }
    const reactionIndices = getReactionIndices(indices, state.coordinates.length);
    const reacoes = reac_apoios(superposedMatrix, matrixAnswer, indices, reactionIndices);  
    const deslocs = fillListWithZeros(matrixAnswer, indices, state.coordinates.length);
    const reactions = fillListWithZeros(reacoes, reactionIndices, state.coordinates.length);
    console.log('deslocamentos: ', deslocs);   
    console.log('reacoes de apoio: ', reactions);
    const deformacoes = getDeformations(state,deslocs);  
    console.log('deformações: ', deformacoes);
    const tensoes = tensao(deformacoes,state.materials);
    console.log('tensoes: ', tensoes);
    
    return {
        displacements: matrixAnswer,
        element_strains: deformacoes,
        element_stresses: tensoes,
        reaction_forces: reacoes,
    };
};
