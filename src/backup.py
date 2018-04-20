#!/usr/bin/env python
# -*- coding: utf-8 -*-
# vetor global de forças concentradas
from numpy.linalg import inv
import numpy as np


def desloc_nodais(matrizona, vforcas):
	vforcas2 = []
	indices = []
	for forca in range(0, len(vforcas)):
		if vforcas[forca] != [0]:
			indices.append(forca) #pega indices que interessam na matriz grande
			vforcas2.append(vforcas[forca]) #pega as forças concentradas diferentes de 0 e adiciona em um outro vetor

	size = len(indices)
	matriz = np.zeros((size, size))
	k = 0
	l = 0
	for i in indices: 
		for j in indices:
			matriz[k][l] = matrizona[i][j]
			l+=1
		l = 0
		k+=1
		
	return matriz, indices, vforcas2

def reac_apoios(matrizona, vforcas, deslocamentos, indices):
	apoios = []
	for indice in range(0, len(vforcas)):
		if vforcas[indice] == [0]:
			apoios.append(indice) #pega indices que interessam na matriz grande

	sizel = len(apoios) #vetor de indices reacoes de apoio
	sizec = len(indices) #vetor de indices deslocamentos
	matriz = np.zeros((sizel, sizec))
	k = 0
	l = 0
	for i in apoios: #linha
		for j in indices: #coluna
			matriz[k][l] = matrizona[i][j]
			l+=1
		l = 0
		k+=1
		
	reacoes = np.matmul(matriz, deslocamentos)
	return reacoes

#matrizona = (([2, -1, 0, 0, 0, 0], [-1, 2, -1, 0, 0, 0], [0, -1, 2, -1, 0, 0], [0, 0, -1, 2, -1, 0], [0, 0, 0, -1, 2, -1], [0, 0, 0, 0, -1, 2]))
#vforcas = (([0, 0, 0, 0, 1, 1]))
#deslocamentos, indices = desloc_nodais(matrizona, vforcas)
#print(deslocamentos)
#print(indices)
#print(reac_apoios(matrizona, vforcas, deslocamentos, indices))

def deformacao(x1, y1, x2, y2, length):
	cos = (x2 - x1)/length
	sen = (y2 - y1)/length
	cossen = [-cos, -sen, cos, sen]
	matriz = (([x1], [y1], [x2], [y2]))
	resultado = np.matmul(cossen, matriz)
	resultado = resultado/length
	return resultado

#def tensao(deformacao, modyoung):
#	return (deformacao * modyoung)

################### OU ###################
def tensao(x1, y1, x2, y2, length, modyoung):
	cos = (x2 - x1)/length
	sen = (y2 - y1)/length
	cossen = [-cos, -sen, cos, sen]
	matriz = (([x1], [y1], [x2], [y2]))
	resultado = np.matmul(cossen, matriz)
	resultado = (resultado*modyoung)/length
	return resultado

def Gauss(ite, tol, a, b): #a é a matriz de rigidez com condicoes de contorno aplicadas e b é vetor de forcas com condicoes de contorno aplicadas
	error = 0
	v = []
	erro = []
	for i in range(0, len(b)):
		v.append(1)
		erro.append(0)

	for n in range(0, ite): #vai rodar até o erro ser menor que tolerancia ou ate chegar no numero de iteracoes
		for i in range(0, len(b)): #vai atualizar cada elemento do vetor
			temp = v[i]
			v[i] = b[i]/a[i][i] 
			for l in range(0, len(b)): #vai somar com cada um dos outros elementos do vetor
				if (l != i):
					v[i] -= ((v[l] * a[i][l])/a[i][i])

			erro[i] = abs((v[i] - temp)/v[i])

		if error <= erro[i]:
			error = erro[i]
		if (error > tol):
			return v, error
	return v, error

def Jacobi(ite, tol, a, b):
	error = 0
	v = []
	erro = []
	vetor = []
	for i in range(0, len(b)):
		v.append(1
			)
		vetor.append(1)
		erro.append(0)

	for n in range(0, ite): #vai rodar até o erro ser menor que tolerancia ou ate chegar no numero de iteracoes
		for i in range(0, len(b)): #vai atualizar cada elemento do vetor
			v[i] = b[i]/a[i][i] 
			for l in range(0, len(b)): #vai somar com cada um dos outros elementos do vetor
				if (l != i):
					v[i] -= ((vetor[l] * a[i][l])/a[i][i])
			
			erro[i] = abs((v[i] - vetor[i])/v[i])

			for m in range(0, len(b)):
				vetor[m] = v[m]

		if error <= erro[i]:
			error = erro[i]
		if (error > tol):
			return v, error
	return v, error


matrizona = (([51200, 38400, 0, 0, -51200, -38400], [38400, 217361.8, 0, -188561.8, 38400, 28800], [0, 0, 141423.5, 0, -141423.5, 0], [0, -188561,8, 0, 188561.5, 0, 0], [-51200, -38400, -141423.5, 0, 192621.3, 38400], [-38400, -28800, 0, 0, 38400, 28800]))
vforcas = (([0], [0], [0], [0], [1500], [-1000]))
matriz, indices, vforcas2 = desloc_nodais(matrizona, vforcas)
gauss, erro1 = Gauss(1000, 10, matriz, vforcas2)
jacobi, erro2 = Jacobi(1000, 10, matriz, vforcas2)
reacoesg = reac_apoios(matrizona, vforcas, gauss, indices)
reacoesj = reac_apoios(matrizona, vforcas, jacobi, indices)
#print(gauss)
print(jacobi)
#print(reacoesg)
print(reacoesj)
###############################################################################
def deformacao(desloc_decomp, indices, length, vforcas, v):

	cos = (v[2] - v[0])/length
	sen = (v[3] - v[1])/length
	cossen = (([-cos], [-sen], [cos], [sen]))

	resultado = np.matmul(desloc_decomp, cossen)
	resultado = resultado/length
	return resultado

def tensao(deformacao, modyoung):
	return (deformacao * modyoung)