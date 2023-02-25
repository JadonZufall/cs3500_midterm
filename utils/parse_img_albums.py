# Script for outputting files names to text format for js object.
# (Don't bother trying to understand this mess it's awful but it works)
import os
def cap(s): return " ".join([w.capitalize() for w in s.split(" ")])
files = [f for f in os.listdir(".")]
if "images" in files:
    files = [f for f in os.listdir("./images")]
    if "albums" in files:
        files = [f for f in os.listdir("./images/albums")]
elif "albums" in files:
    files = [f for f in os.listdir("./albums")]
files = list(filter(lambda f: f.endswith(".jpg"), files))
files = [
    str(i) + 
    ": {name: \"" +
    cap(" ".join(f.removesuffix(".jpg").split("-")) if not f.split("-")[0].isnumeric()
    else " ".join(f.removesuffix(".jpg").split("-")[1:])) +
    "\", img: \"../images/albums/" + 
    f + 
    "\"},\n" for i, f in enumerate(files)
]
with open("script_out.txt", "w") as file:
    file.writelines(files)

