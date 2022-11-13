# Optional tasks to Lesson3

You can use for RegExp testing this [tool](https://regex101.com)
1) Prepare a RegExp pattern for:
* IPv4 (f.g. 192.168.1.1, 10.0.0.100)
* Phone number in international format (f.g +420 123 456 789)
* Email address
* Content of HTML tag (f.g. `<iput></input>`)
2) Test validate.js [library](https://validatejs.org) for validation of:
* numeric input
* non empty string
* RegExp

# Mandatory task to Lesson3

I wish you create web BMI (Body Mass Index) calculator. For calculation use forumla

BMI = hmotnost [kg] / výška^2 [m] 

Then with following table based on age decide the resulting assesment.

 věk     | podváha | optimální váha | nadváha   | obezita | silná obezita
-------- | ------- | -------------- | --------- | ------- | -------------
 18 - 24 | < 19    | 19 - 23,9      | 24 - 28,9 | 29 - 39 | > 39
 25 - 34 | < 20    | 20 - 24,9      | 25 - 29,9 | 30 - 40 | > 40
 35 - 44 | < 21    | 21 - 25,9      | 26 - 30,9 | 31 - 41 | > 41
 45 - 54 | < 22    | 22 - 26,9      | 27 - 31,9 | 32 - 42 | > 42
 55 - 64 | < 23    | 23 - 27,9      | 28 - 32,9 | 33 - 43 | > 43
 65+     | < 24    | 24 - 28,9      | 29 - 33,9 | 34 - 44 | > 44

Application must have form with:
* DropDown menu with age ranges (based on upper mentioned table)
* Input text field for Weight and second for Height
* For mentioned input implement validator what inform end user if non number was inserted
* In case of invalid input use Bootstrap "invalid-feedback" for informing customer
* Read only field with result BMI and assesment (f.g. podváha, obezita)

Beside form it must:
* Include header like "BMI kalkulačka" or so
* Use Bootstrap
* Be saved in JSFiddle, CodePen or alternative online IDE, then share link only
