# EightTen-Survey-Frontend


## Wire Frame


## ERD

https://www.lucidchart.com/documents/edit/3c9d9ef1-8af0-4a95-89fe-846ac42614e4/0?shared=true

![eight_ten_erd](/810/eight_ten_erd.png)


## Colors, Fonts, Background, Logo

![EightTen-Logo](/810/EightTen-Logo.png)

![eight_ten_palette](/810/eight_ten_palette.png)

![random_grey_variations](/810/random_grey_variations.png)

```html
<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">

```

## Server Route Planning
```
Admin Specific Routes:
    - User login (GET): /API/users/login
        - All survey & client info returned
    - GET company score by traits: /API/client/:id
        - Return all client data by ID
    - GET company data pertaining to a particular trait: /API/client/:id/:trait
    - GET surveys: survey
    - POST new question: /API/survey/:id/questions
    - PUT edit question: /API/survey/:id/questions/:id
    - DELETE a question: /API/survey/:id/questions/:id
        - ** marks a value or “archives”
    - GET all trait data: /API/traits
    - PUT change trait response: /API/traits/:id

Client (Users) Specific Routes:
    - Client login (POST): /API/client
    - Client signup (POST): /API/client
    - Client survey setup (GET): /API/questions
    - Save question response (POST): /API/client:/:id/:question_id
    - Retrieve client’s survey results: (GET): /API/client/:id/:survey_id
```

## Front End Route Planning
