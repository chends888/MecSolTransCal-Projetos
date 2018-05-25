
import matplotlib.pyplot as plt
import tkinter

x = 40 # comprimento da barra
y =  40 #largura da barra
tempInicial =  0
deltaTempo = 1
deltaX = 0.08
deltaY= 0.08
alfa = 9.4967 * 10**(-5)

matrizDeTemp = []
tolerancias = []
for i in range(0,x, deltaX):
    oordenadas = [];
    tols = []
    for j in range(0,y, deltaY):
        if i == 0:
            oordenadas.append(75)
            tols.append(0);
        elif i == 39:
            oordenadas.append(50)
            tols.append(0);
        elif j == 0:
            oordenadas.append(0)
            tols.append(0);
        elif j == 39:
            oordenadas.append(100)
            tols.append(0);
        else:
            oordenadas.append(tempInicial)
            tols.append(1000);
    matrizDeTemp.append(oordenadas)
    tolerancias.append(tols)


Fo = alfa * deltaTempo / deltaX**2
maiorTolerancia = 1000
while(maiorTolerancia > 0.005):
    for i in range(1, len(matrizDeTemp)-1):
        for j in range(1, len(matrizDeTemp[i])-1):
            tempvelha = matrizDeTemp[i][j]
            matrizDeTemp[i][j] = Fo * (matrizDeTemp[i-1][j] + matrizDeTemp[i-1][j] + matrizDeTemp[i][j+1] + matrizDeTemp[i][j-1]) + (1 - 4*Fo)*matrizDeTemp[i][j]
            tempnova = matrizDeTemp[i][j]
            tolerancias[i][j] = (tempvelha - tempnova) / tempnova
    maiorTolerancia = 0
    for i in tolerancias:
        for j in i:
            if j > maiorTolerancia:
                maiorTolerancia = j

print(matrizDeTemp)

