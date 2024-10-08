# BMI kalkulačka

Vaším úkolem je vytvořit BMI (Body Mass Index) kalkulačku, která bude na základě hmotnosti, výšky a věku slovně hodnit uživatelův stav.

Pro výpočet BMI použijte následující vzorec:
BMI = hmotnost [kg] / výška^2 [m] 

Následující tabulka poskytuje slovní hodnocení na základě věku a BMI.

 věk     | podváha | optimální váha | nadváha   | obezita | silná obezita
-------- | ------- | -------------- | --------- | ------- | -------------
 18 - 24 | < 19    | 19 - 23,9      | 24 - 28,9 | 29 - 39 | > 39
 25 - 34 | < 20    | 20 - 24,9      | 25 - 29,9 | 30 - 40 | > 40
 35 - 44 | < 21    | 21 - 25,9      | 26 - 30,9 | 31 - 41 | > 41
 45 - 54 | < 22    | 22 - 26,9      | 27 - 31,9 | 32 - 42 | > 42
 55 - 64 | < 23    | 23 - 27,9      | 28 - 32,9 | 33 - 43 | > 43
 65+     | < 24    | 24 - 28,9      | 29 - 33,9 | 34 - 44 | > 44

Aplikace musí obsahovat formulář s následujícími prvky:
* DropDown menu s rozpětí věku dle tabulky
* Vstupní pole pro výšku a druhý pro hmotnost klienta
* Obě vstupní pole budou mít validátor, který bude hodnotit jiné znaky než číslice
* V případě nevalidního vstupu informujte uživatele pomocí Bootstrap "invalid-feedback"
* Ve třetím vstupním poli bude výsledek hodnocení (např. podváha, obezita). Pole nebude umožňovat vkládání (read-only)

Aplikaci nasdílejte přes JSFiddle, CodePen případně jiné alternativní online služby. Poté do mailu vložte URL na online službu a přiložte soubor s kódem. Zašlete na hlavka(at)sostp.cz.

