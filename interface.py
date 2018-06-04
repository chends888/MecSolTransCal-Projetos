from Tkinter import *


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

		Label(master, text="Tolerancia admissivel", fg="light gray").grid(row=8)
		Label(master, text="Tempo maximo").grid(row=8) #True
	else:
		#print("Checkbutton not selected")
		Label(master, text="Tolerancia admissivel").grid(row=8) #False

master = Tk()
master.title("Projeto 2")
Label(master, text="Comprimento da barra").grid(row=0)
Label(master, text="Largura da barra").grid(row=1)
Label(master, text="Temperatura inicial").grid(row=2)
Label(master, text="Delta x").grid(row=3)
Label(master, text="Delta y").grid(row=4)
Label(master, text="Delta tempo").grid(row=5)
Label(master, text="Alfa").grid(row=6)
Label(master, text="Tolerancia admissivel").grid(row=8) #False

isByTime = IntVar()
C1 = Checkbutton(master, text = "Por tempo", variable = isByTime, command=on_checkbutton_click).grid(row=7)

ex = Entry(master)
ey = Entry(master)
etemp = Entry(master)
edx = Entry(master)
edy = Entry(master)
edt = Entry(master)
ealfa = Entry(master)
etoltmax = Entry(master)


ex.grid(row=0, column=1)
ey.grid(row=1, column=1)
etemp.grid(row=2, column=1)
edx.grid(row=3, column=1)
edy.grid(row=4, column=1)
edt.grid(row=5, column=1)
ealfa.grid(row=6, column=1)
etoltmax.grid(row=8, column=1)

Button(master, text='Salvar', command=save_entry_fields).grid(row=11, column=0, pady=4)
Button(master, text='Fechar', command=master.quit).grid(row=11, column=1, pady=4)

mainloop()