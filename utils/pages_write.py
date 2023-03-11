# Parses pages dir for catalog.
import os
file = open("pages.txt", "w")
file.writelines([
    f"<a href=\"../pages/{f}\">pages/{f}</a>\n"
    for f in os.listdir("./pages")
])
file.close()