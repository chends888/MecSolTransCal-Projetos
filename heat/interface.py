from Tkinter import *
from PIL import ImageTk, Image
import os

def save_entry_fields():
	x = ex.get()
	y = ey.get()
	temp = etemp.get()
	dx = edx.get()
	dy = edy.get()
	dt = edt.get()
	alfa = ealfa.get()
	time = isByTime.get()
	if time:
		time = True
		tol = None
		tmax = etoltmax.get() #True
	else:
		time = False
		tmax = None
		tol = etoltmax.get() #false
	
	print("%s\n%s\n%s\n%s\n%s\n%s\n%s\n%s\n%s\n%s\n" % (x, y, temp, dx, dy, dt, alfa, time, tmax, tol))


def on_checkbutton_click():
	if isByTime.get() == 1:
		#print("Checkbutton selected")
		Label(master, text="Tolerancia admissivel", bg = 'white', fg="white").grid(row=8, sticky=E)
		Label(master, text="Tempo maximo", bg="white").grid(row=8, sticky=E) #True
	else:
		#print("Checkbutton not selected")
		Label(master, text="Tolerancia admissivel", bg="white").grid(row=8, sticky=E) #False

master = Tk()
master.title("Projeto 2")
master.configure(background='white')

pic = PhotoImage(file = 'banner.png')
label1 = Label(image=pic)
label1.image = pic
label1.grid(row=0, column = 0, columnspan = 2, sticky=NW)

Label(master, text="Comprimento da barra", bg="white").grid(row=2, sticky=E)
Label(master, text="Largura da barra", bg="white").grid(row=3, sticky=E)
Label(master, text="Temperatura inicial", bg="white").grid(row=4, sticky=E)
Label(master, text="Delta x", bg="white").grid(row=5, sticky=E)
Label(master, text="Delta y", bg="white").grid(row=6, sticky=E)
Label(master, text="Delta tempo", bg="white").grid(row=7, sticky=E)
Label(master, text="Alfa", bg="white").grid(row=8, sticky=E)
Label(master, text="Tolerancia admissivel", bg="white").grid(row=10, sticky=E) #False

isByTime = IntVar()
C1 = Checkbutton(master, text = "Por tempo", variable = isByTime, bg="white", command=on_checkbutton_click).grid(row=9, sticky=E)

ex = Entry(master)
ey = Entry(master)
etemp = Entry(master)
edx = Entry(master)
edy = Entry(master)
edt = Entry(master)
ealfa = Entry(master)
etoltmax = Entry(master)


ex.grid(row=2, column=1, sticky=W)
ey.grid(row=3, column=1, sticky=W)
etemp.grid(row=4, column=1, sticky=W)
edx.grid(row=5, column=1, sticky=W)
edy.grid(row=6, column=1, sticky=W)
edt.grid(row=7, column=1, sticky=W)
ealfa.grid(row=8, column=1, sticky=W)
etoltmax.grid(row=10, column=1, sticky=W)

Button(master, text='Resolver', bg="black", fg = "white", command=save_entry_fields).grid(row=12, column=0, pady=4, sticky=E)
Button(master, text='Fechar', bg="black", fg = "white", command=master.quit).grid(row=12, column=1, pady=4, sticky=W)


mainloop()