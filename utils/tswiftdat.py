import requests
from pprint import pprint
from bs4 import BeautifulSoup
import os

url = "https://www.lyrics.com/artist/Taylor-Swift/816977"
response = requests.get(url)
if response.status_code != 200:
    raise Exception("Unable to reach url status code = {0}".format(response.status_code))
soup = BeautifulSoup(response.text, "html.parser")
dat = soup.find_all("a")
def f(x):
    x = str(x)
    if x is None:
        return False
    s: str = x.split("\"")
    if len(s) < 2:
        return False
    if not s[1].startswith("/lyric/"):
        return False
    return True
dat = list(filter(f, dat))
def get_url(x):
    x = str(x)
    url = x.removeprefix("<a href=\"")
    t = url.split(">")
    return t[0].removesuffix("\""), t[1].removesuffix("</a")
dat = list(map(get_url, dat))
dat = [(i[0], i[1].split("[")[0].strip()) for i in dat]
dat = {k: v for v, k in dat}.items()
def cap(s): return " ".join([w.capitalize() for w in s.split(" ")])
dat = [(cap(i[0]), i[1]) for i in dat]
def a(x):
    if x[0].endswith(")"):
        return False
    return True
dat = list(filter(a, dat))
dat = {k: v for k, v in dat}

files = [f for f in os.listdir(".")]
if "images" in files:
    files = [f for f in os.listdir("./images")]
    if "albums" in files:
        files = [f for f in os.listdir("./images/albums")]
elif "albums" in files:
    files = [f for f in os.listdir("./albums")]
files = list(filter(lambda f: f.endswith(".jpg"), files))
albums = [i.removesuffix(".jpg") for i in files]
albums = [" ".join(i.split("-")[1:]) if i.split("-")[0].isnumeric() else " ".join(i.split("-")) for i in albums]
albums = [cap(i) for i in albums]
print(albums)

