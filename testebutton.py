import Tkinter

class Checkbutton(Tkinter.Tk):
    def __init__(self):
        Tkinter.Tk.__init__(self)
        self.title("Checkbutton")

        self.checkbuttonvar = Tkinter.IntVar()

        checkbutton = Tkinter.Checkbutton(text="Checkbutton",
                                          variable=self.checkbuttonvar,
                                          command=self.on_checkbutton_click)
        checkbutton.select()
        checkbutton.pack(fill=Tkinter.BOTH, expand=1)

    def on_checkbutton_click(self):
        if self.checkbuttonvar.get() == 1:
            print("Checkbutton selected")
        else:
            print("Checkbutton not selected")

if __name__ == "__main__":
    application = Checkbutton()
    application.mainloop()