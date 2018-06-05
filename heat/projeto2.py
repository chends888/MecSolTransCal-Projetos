import matplotlib.pyplot as plt
import tkinter
import numpy as np

#conjunto de dados que vão poder ser inseridos pelo usuário
x = 40 # comprimento da barra
y =  40 #largura da barra
deltaX = 5
deltaY= 5
tempInicial =  0
deltaTempo = 10**-3
ct = 0.23
ce = 897
density = 2.7 * 10**-6
alfa = ct/(ce*density) #9.4967 * 10**(-5)
isByTime = True
maxTimeCalculating = 10 #in seconds (só deveria ser pedido para usuario, se o isByTime for True)
toleranciaAdmissivel = 0.005 # só deveria ser pedido para usuario, se o isByTime for False
whichBorders = [1, None, None,None] # numbers from 1 to 4
bordersFlowValue = [0, None,None,None ] # deve ter um valor pra cada valor em wichBorder 
temperaturesBorder= [0,150,50,0]

# tamanho de divisões na placa para cada eixo
xPointsLength = int(x/deltaX)
yPointsLength = int(y/deltaY)


def isIntern(i,j):
    localX = (i == 0) or (i == xPointsLength-1)
    localY = (j == 0) or (j == yPointsLength-1)
    return not (localX or localY)

def isVertix(i,j):
    return (i==0 and j==0) or (i==0 and j==yPointsLength-1)  or (i==xPointsLength-1 and j==0) or (i==xPointsLength-1 and j==yPointsLength-1)

# código que forma  a matriz no tempo 0
matrizDeTemp = []
tolerancias = []
print("Creating inital matrix...")
for i in range(0,xPointsLength):
    oordenadas = [];
    tols = []
    # existe essas condições pois as bordas possuem valores diferentes de temperatura
    for j in range(0, yPointsLength):
        if i == 0:
            oordenadas.append(temperaturesBorder[0])
            tols.append(0);
        elif i == (xPointsLength - 1):
            oordenadas.append(temperaturesBorder[2])
            tols.append(0);
        elif j == 0:
            oordenadas.append(temperaturesBorder[3])
            tols.append(0);
        elif j == (yPointsLength - 1):
            oordenadas.append(temperaturesBorder[1])
            tols.append(0);
        else:
            oordenadas.append(tempInicial)
            tols.append(float('inf'));
    matrizDeTemp.append(oordenadas)
    tolerancias.append(tols)
print("Created")

# cada interação do while é um  deltaTempo (segundos) que passou
Fo = alfa * deltaTempo / deltaX**2
print("Iterating though time...")
time = 0
condition = True #condição de parada do loop
while(condition):
    maiorTolerancia = 0
    for i in range(0, len(matrizDeTemp)):
        for j in range(0, len(matrizDeTemp[i])):
            tempvelha = matrizDeTemp[i][j]
            #aqui nessa parte tive de converter essa expressão para float128 pq eram números tão pequenos que não
            #cabiam em 64 bits
            if(isIntern(i,j)):
                matrizDeTemp[i][j] = np.float128(Fo * (matrizDeTemp[i+1][j] + matrizDeTemp[i-1][j] + matrizDeTemp[i][j+1] + matrizDeTemp[i][j-1])) + (1 - 4*Fo)*matrizDeTemp[i][j]
            else: 
                if((i==0 and 1 in whichBorders) and (j != 0 and j != yPointsLength-1)):
                     matrizDeTemp[i][j] = np.float128(Fo * (matrizDeTemp[i+1][j] + 2*deltaX*bordersFlowValue[0] + matrizDeTemp[i][j+1] + matrizDeTemp[i][j-1])) + (1 - 4*Fo)*matrizDeTemp[i][j]

                elif((i==xPointsLength-1 and 3 in whichBorders) and (j != 0 and j != yPointsLength-1)):
                     matrizDeTemp[i][j] = np.float128(Fo * (2*deltaX*bordersFlowValue[2] + matrizDeTemp[i-1][j] + matrizDeTemp[i][j+1] + matrizDeTemp[i][j-1])) + (1 - 4*Fo)*matrizDeTemp[i][j]

                elif((j==0 and 4 in whichBorders) and (i != 0 and i != xPointsLength-1)):
                     matrizDeTemp[i][j] = np.float128(Fo * (matrizDeTemp[i+1][j] + matrizDeTemp[i-1][j] + matrizDeTemp[i][j+1] + 2*deltaY*bordersFlowValue[3])) + (1 - 4*Fo)*matrizDeTemp[i][j]

                elif((j==yPointsLength-1 and 2 in whichBorders) and (i != 0 and i != xPointsLength-1)):
                     matrizDeTemp[i][j] = np.float128(Fo * (matrizDeTemp[i-1][j] + matrizDeTemp[i-1][j] +  2*deltaY*bordersFlowValue[1] + matrizDeTemp[i][j-1])) + (1 - 4*Fo)*matrizDeTemp[i][j]
            if(not isVertix(i,j)):
                tempnova = matrizDeTemp[i][j]
                if(tempnova != 0):
                     erro = np.absolute((tempvelha - tempnova) / tempnova)
                else:
                    erro =np.absolute(tempvelha - tempnova)

                if(erro > maiorTolerancia):
                    maiorTolerancia = erro
            
    time+=1
    if(isByTime):
        if (time*deltaTempo > maxTimeCalculating):
            condition = False
    else:
        condition = maiorTolerancia > tolerânciaAdmissivel
    


print("Matrix answer: ")
#matriz resultado
print(matrizDeTemp)
print("\n")
print("Time elapsed: {0} segundos".format(time*deltaTempo))
print("Error: {0}".format(maiorTolerancia))
