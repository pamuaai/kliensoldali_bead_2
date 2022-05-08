# Feladatsorok alkalmazás

_Kliensoldali webprogramozás 2. beadandó:_

## Nyilatkozat

Kérlek, töltsétek ki az adataitokkal beadás előtt!

```txt
<Hallgató neve>
<Neptun kódja>
Kliensoldali webprogramozás - beadandó
Ezt a megoldást a fent írt hallgató küldte be és készítette a Kliensoldali webprogramozás kurzus számonkéréséhez.
Kijelentem, hogy ez a megoldás a saját munkám. Nem másoltam vagy használtam harmadik féltől
származó megoldásokat. Nem továbbítottam megoldást hallgatótársaimnak, és nem is tettem közzé.
Az Eötvös Loránd Tudományegyetem Hallgatói Követelményrendszere
(ELTE szervezeti és működési szabályzata, II. Kötet, 74/C. §) kimondja, hogy mindaddig,
amíg egy hallgató egy másik hallgató munkáját - vagy legalábbis annak jelentős részét -
saját munkájaként mutatja be, az fegyelmi vétségnek számít.
A fegyelmi vétség legsúlyosabb következménye a hallgató elbocsátása az egyetemről.
```

## A feladat

A beadandóban olyan webes alkalmazást kell írnod, amelyben egy tanárnak lehetősége van egy feladatsort összeállítani, pl. óra vagy dolgozat céljából. A tanár létrehoz egy új feladatsort, majd a feladatbankban a feladatok között böngészve egy-egy feladatot hozzáad a szerkesztésre jelölt feladatsorhoz. A feladatok és a feladatsorok listázhatók, részleteik megtekinthetők, a feladatsorok szerkeszthetők.

A feladatot _React_ és _Redux_ kombinációjával kell megoldanod, Redux esetében ajánlott a _redux toolkit_ és akár az _RTK Query_ használata. Mivel az alkalmazás több oldalból áll, a _react-router_ használata javasolt.
A feladatban adott a szerveroldali REST API, leírását lentebb olvashatjátok, ehhez kell igazodnia a kliensnek.

## Oldalak

### Navigáció

Minden oldal tetején megjelenik egy navigációs sáv, ahol az alkalmazás neve, és az elérhető funkciók vannak menüpontokban megjelenítve:

- Alkalmazás neve: főoldalra visz
- Feladatbank
- Ha nincs bejelentkezve
  - Regisztráció
  - Bejelentkezés
- Bejelentkezve
  - Feladatsoraim
  - Ha van szerkesztés alatt álló feladatsor, akkor
    - Szerkesztett feladatsor
  - Profil
  - Kijelentkezés

### Főoldal

Statikus információkat tartalmazó oldal, az alkalmazás címével és egy rövid leírással.

### Feladatbank

A háttérrendszerben felvett adatok böngészése lehetséges itt. Az oldal 10 feladatot jelenít meg egyszerre, a feladatlistában előre-hátra lehet lapozni. Egy feladatnál a feladat címe, és a leírás egy rövid szelete jelenik meg. A feladatra kattintva ugyanezen az oldalon megjelenik a feladat teljes leírása (ez lehet egy accordion, egy lenyíló tartalom, vagy lehet az, hogy a feladatlista bal oldalon van a kiválasztott feladat jobb oldalon jelenik meg).

- Ha a felhasználó be van jelentkezve,
  - és a feladat még nincs kiválasztva,
    - akkor megjelenik egy "Kiválaszt" gomb, amire kattintva
      - ha nincs aktív feladatsor szerkesztés,
        - akkor egy új feladatsor szerkesztése kezdődik, és
      - a feladatot a feladatsorhoz adjuk;
  - ha a feladat már ki van választva
    - akkor csak jelezzük, hogy már "Kiválasztva"

### Regisztráció

Az alábbi adatok megadása szükséges:

- teljes név (kötelező)
- email cím (email, kötelező)
- jelszó (kötelező)

Validáció elegendő HTML5 attribútumokkal!

### Bejelentkezés

Az alábbi kötelező adatokkal történik:

- email (email. kötelező)
- jelszó (kötelező)

Validáció elegendő HTML5 attribútumokkal!

### Feladatsoraim

Csak bejelentkezve érhető el.
A bejelentkezett felhasználóhoz tartozó feladatsorok jelennek itt meg, minden feladatsornál az alábbiak:

- feladatsor címe
- státusz (draft, published)
- leírás
- feladatok száma
- létrehozás és az utolsó módosítás dátuma

Egy feladatsorra kattintva ugyanezen az oldalon (accordion, side panel) megjelenik a feladatsor:

- feladatsor címe
- státusz (draft, published)
- leírás
- létrehozás és az utolsó módosítás dátuma
- összpontszám (számított érték)
- feladatok
  - feladat címe
  - feladat leírása
  - megjegyzés a feladathoz
  - pontszám
- funkciók
  - ha nincs szerkesztés alatt álló feladatsor,
    - akkor "Szerkeszt" gombra kattintva az adott feladat szerkesztésre jelölődik, és a _Szerkesztett feladatsor_ oldalra kerülünk.

Ezen az oldalon lehetőség van új feladatsor összeállítását kezdeményezni ("Új feladatsor" gomb), ekkor a _Szerkesztett feladatsor_ oldalra kerülünk.

### Szerkesztett feladatsor

Csak bejelentkezve érhető el, és ha van új vagy meglévő feladatsor szerkesztésre jelölve.

- feladatsor címe (szerkeszthető, kötelező)
- státusz (szerkeszthető, kötelező, értékei: draft, published)
- leírás (szerkeszthető)
- létrehozás és az utolsó módosítás dátuma
- összpontszám (számított érték)
- feladatok
  - feladat címe
  - feladat leírása
  - megjegyzés a feladathoz (szerkeszthető)
  - pontszám (szerkeszthető)
- funkciók
  - "Mentés": a feladatsor mentése (új vagy módosítás)
  - "Szerkesztés lezárása": szerkesztés lezárása, visszatérés a _Feladatsoraim_ oldalra

### Profil

Csak bejelentkezve érhető el.
A bejelentkezett felhasználó adatai jelennek meg.

- Név
- Email
- Feladatsorok száma
- Kijelentkezés gomb

## A kliens

Az alkalmazást a `client` mappában kell elkészíteni. A mappa egyelőre egy teljesen friss Create-React-App telepítést tartalmaz, a szükséges további függőségeket Nektek kell hozzáadni. A nem szükséges dolgokat viszont nyugodtan ki is törölheted!

```
cd client
npm install
npm start
```

## REST API

A szerver forráskódja a `rest-api` mappában található. Telepíteni és indítani kell lokálisan:

```
cd rest-api
npm install
npm start
```

Három szolgáltatás van kivezetve:

- `users`
- `tasks`
- `tasklists`

A végpontok leírását és kipróbálását úgy tehetitek meg legegyszerűbben, ha az alábbi Postman gyűjteményeket importáljátok a Postman REST API kliensbe. Ez egy webes alkalmazás, a Postman Agentet lokálisan telepíteni kell, majd a megnyíló alkalmazásban egy új Workspace-t kell létrehozni, és fent megnyomni az "Import" gombot, és egyesével linkként beilleszteni őket:

- [auth gyűjtemény](https://www.postman.com/collections/71406ec35bdc64e61081)
- [tasks gyűjtemény](https://www.postman.com/collections/f494799129c38052c21e)
- [tasklists gyűjtemény](https://www.postman.com/collections/c2b1e7c90aaf8c36f415)

Innentől kipróbálhatók a végpontok. A felküldendő tartalmak a Body részben vannak előkészítve. Az authentikációhoz tartozó JWT token a `tasklists` gyűjtemény `Authorization` fülén van elmentve, ott igény szerint cserélhető.

## Adatbázis

A mentett adatok egy lokális SQLite táblában jelennek meg: `feladatsor_restapi.sqlite`. Ezt pl. a [DB Browser for SQLite](https://sqlitebrowser.org/) programmal tudunk megnézni, módosítani.

## További információk

Elvárás az igényes megjelenés. Ehhez használhatsz saját CSS-t is, de komponens függvénykönyvárakat is, mint pl. [Material UI](https://mui.com/) vagy [Bootstrap](https://react-bootstrap.github.io/).

## Pontozás

TBA
