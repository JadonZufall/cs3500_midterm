import os
from pprint import pprint
if "song_dat.txt" not in os.listdir("./"):
    if "song_dat.txt" not in os.listdir("./utils"):
        raise Exception("No song data found.")
    path = "utils/song_dat.txt"
with open(path, "r") as file:
    lines = file.read().split("\n")
lines = list(filter(lambda x: not len(x.split("\t")) < 3, lines))
def map_lines(line: str) -> tuple[str, str]:
    s: list[str] = line.split("\t")
    return s[0], s[1], s[2]
lines = list(map(map_lines, lines))
output = dict()
for line in lines:
    if line[0] in output.keys():
        output[line[0]].append((line[1], line[2]))
    else:
        output[line[0]] = [(line[1], line[2])]
pprint(output)
def cap(s): return " ".join([w.capitalize() for w in s.split(" ")])
with open("song_dat_out.txt", "w") as file:
    f = True
    file.write("var songDat = {\n")
    for k in output.keys():
        if not f:
            file.write("    },\n")
        f=False
        file.write("    \""+cap(k).strip()+"\": {\n")
        for l in output[k]:
            file.write("        " + l[0])
            file.write(": \"" + cap(l[1]).strip() + "\",\n")
    file.write("    }\n")
    file.write("}")
