![](images/2021-09-24_22-11-19%20.gif)

### It is a ticket tracking system. This system allows QA to report a bug and RD can mark a bug as resolved.
- There are two types of user: QA and RD.
- Only QA can create a bug, edit a bug and delete a bug.
- Only RD can resolve a bug.
- Summary field and Description filed are required of a bug when QA is creating a bug.

### Backend: .NET core 5.0 MVC Web api + JWT authentication + authorization + SQL SERVER 2019 Docker
### Frontend: React

### Task 1 - The use cases.
Phase I
![](images/use_case_phrase_1.jpg)

### Phase II
#### Bug Ticket:
- created, edited, deleted by QA and Admin
- read by QA, RD, PM, Admin
- resolved by RD
#### Feature Request Ticket: 
- created, edited, deleted by PM and Admin
- read by QA, RD, PM, Admin
- resolved by RD
#### Test Case Ticket:
- created, edited, deleted by QA and Admin
- read by QA, RD, PM, Admin
- resolved by QA
#### User management:
- created, edited, deleted by Admin
- read by Admin

### Task 3 - System design
#### data model
![](images/ERD.jpg)

#### class diagram
![](images/class_diagram.jpg)

#### UI mock up
![](images/mockup_01.jpg)
![](images/mockup_02.jpg)

### Design the Web API(Json format)

#### login
- post `/api/v1/login/`
- request payload
```json
{
  "username": "...",
  "password": "..."
}
```
- response
```json
{
  "userid": 1,
  "username": "...",
  "toekn": "....",
  "role": "QA"
}
```
#### CRUD ticket
- get `/api/v1/tickets/`
- get `/api/v1/tickets/{id}`
- post `/api/v1/tickets/`
- put `/api/v1/tickets/{id}`
- delete `/api/v1/tickets/{id}`

#### Resolve a ticket

put `/api/v1/tickets`

request payload
```json
{
  "id": 1,
  "isResolve": true
}
```

#### tickets filter:
- get `/api/v1/tickets/?type={ticketTypeId}`
- get `/api/v1/tickets/?severity={severityId}`
- get `/api/v1/tickets/?priority={priorityId}`

#### CRUD user
- get `/api/v1/users/`
- get `/api/v1/users/{id}`
- post `/api/v1/users/`
- put `/api/v1/users/{id}`
- delete `/api/v1/users/{id}`


**Show all Tickets**
----
Returns json data about a single ticket.

* **URL**

  `/api/v1/tickets/`

* **Method:**

  `GET`

[comment]: <> (* GET | POST | DELETE | PUT)

* **URL Params**

    `None`

[comment]: <> (  **Required:**)

[comment]: <> (  `id=[integer]`)

* **Data Params**

  `None`

[comment]: <> (    ```json)

[comment]: <> (    { "id" : 12, )

[comment]: <> (      "summary" : "Button is not shown.", )

[comment]: <> (      "type": "asd" )

[comment]: <> (    })

[comment]: <> (    ```)

* **Success Response:**

    * **Code:** 200 <br />
      **Content:**
  ```json
  [ 
    {
    "id" : 12, 
    "summary" : "Button is not shown.",
    "description": "Button is not shown base on mobile layout", 
    "type": "Bug",
    "severity": "low",
    "priority": "low",
    "author": "Ricky",
    "isResolve": false,
    "resolveBy": "Henry"
   } ,
   {
    "id" : 12, 
    "summary" : "Button is not shown.",
    "description": "Button is not shown base on mobile layout", 
    "type": "Bug",
    "severity": "low",
    "priority": "low",
    "author": "Ricky",
    "isResolve": false,
    "resolveBy": "Henry"
   }
  ]
  ```

[comment]: <> (* **Error Response:**)

[comment]: <> (    * **Code:** 404 NOT FOUND <br />)

[comment]: <> (      **Content:** `{ error : "Ticket doesn't exist" }`)

[comment]: <> (  OR)

[comment]: <> (    * **Code:** 401 UNAUTHORIZED <br />)

[comment]: <> (      **Content:** `{ error : "You are unauthorized to make this request." }`)



**Show Ticket**
----
Returns json data about a single ticket.

* **URL**

  `/api/v1/tickets/:id`

* **Method:**

  `GET`
* 
[comment]: <> (* GET | POST | DELETE | PUT)

* **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  None

[comment]: <> (    ```json)

[comment]: <> (    { "id" : 12, )

[comment]: <> (      "summary" : "Button is not shown.", )

[comment]: <> (      "type": "asd" )

[comment]: <> (    })

[comment]: <> (    ```)

  * **Success Response:**

      * **Code:** 200 <br />
        **Content:** 
    ```json
    { "id" : 12, 
      "summary" : "Button is not shown.",
      "description": "Button is not shown base on mobile layout", 
      "type": "Bug",
      "severity": "low",
      "priority": "low",
      "author": "Ricky",
      "isResolve": false,
      "resolveBy": "Henry" 
    }
    ```

* **Error Response:**

    * **Code:** 404 NOT FOUND <br />
      **Content:** `{ error : "Ticket doesn't exist" }`

[comment]: <> (  OR)

[comment]: <> (    * **Code:** 401 UNAUTHORIZED <br />)

[comment]: <> (      **Content:** `{ error : "You are unauthorized to make this request." }`)
