import matplotlib.pyplot as plt
import tkinter
import numpy as np

#conjunto de dados que vão poder ser inseridos pelo usuário
x = 40 # comprimento da barra
y =  40 #largura da barra
deltaX = 0.08
deltaY= 0.08
tempInicial =  0
deltaTempo = 1
alfa = 9.4967 * 10**(-5)
isByTime = False
maxTimeCalculating = 100 #in seconds (só deveria ser pedido para usuario, se o isByTime for True)
tolerânciaAdmissivel = 0.005 # só deveria ser pedido para usuario, se o isByTime for False

# tamanho de divisões na placa para cada eixo
xPointsLength = int(x/deltaX)
yPointsLength = int(y/deltaY)


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
            oordenadas.append(75)
            tols.append(0);
        elif i == (xPointsLength - 1):
            oordenadas.append(50)
            tols.append(0);
        elif j == 0:
            oordenadas.append(0)
            tols.append(0);
        elif j == (yPointsLength - 1):
            oordenadas.append(100)
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
    for i in range(1, len(matrizDeTemp)-1):
        for j in range(1, len(matrizDeTemp[i])-1):
            tempvelha = matrizDeTemp[i][j]
            #aqui nessa parte tive de converter essa expressão para float128 pq eram números tão pequenos que não
            #cabiam em 64 bits
            matrizDeTemp[i][j] = np.float128(Fo * (matrizDeTemp[i-1][j] + matrizDeTemp[i-1][j] + matrizDeTemp[i][j+1] + matrizDeTemp[i][j-1])) + (1 - 4*Fo)*matrizDeTemp[i][j]
            tempnova = matrizDeTemp[i][j]
            erro = np.absolute((tempvelha - tempnova) / tempnova)
            print(tempvelha)
            print(tempnova)
            print(erro)
            print('\n')
            if(erro > maiorTolerancia):
                maiorTolerancia = erro

    time+=1
    if(isByTime):
        if (time > maxTimeCalculating):
            condition = False
    else:
        condition = maiorTolerancia > tolerânciaAdmissivel
    


print("Matrix answer: ")
#matriz resultado
print(matrizDeTemp)
print("\n")
print("Time elapsed: {0}".format(time))
print("Error: {0}".format(maiorTolerancia))
