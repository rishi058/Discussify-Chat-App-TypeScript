# Discussify Typescript Backend 

 - This chat app is made to showcase the use-case of Sockets.
 - This app is made using Typescript for its rich ecosystem.
 - Used Mongo(for DB) + Express(web framework) + many other packages.

## Table of Contents

- [Setup Environment Variables](#setup-environment-variables)
- [Rest Api Endpoints](#Endpoints)
- [Socket Connection](#Socket)
- [Logger](#Logger)

## Setup Environment Variables

    1. PORT=3000

    2. JWT_SECRET="=asd932veJSN3r2=23SJDedsd33" [Used to generate token]

    3. NODE_ENV="development"   [Used in generateToken File to secure cookie]
   
    4. MONGO_DB_URI="mongodb+srv://......."    [Used in connecting to MongoDB]


## Endpoints

1.  [  /api/auth/login  ] ____________ { POST }

        Request-Body : {
            "email" : "dummy@gmail.com",
            "password" : "**********",
        }

        Success Response : {
            "_id": "662bc7af530xxxxxxxxx",
            "email": "dummy@gmail.com",
            "username": "username",
            "gender": "male"/"female",
            "profilePic": "https://avatar.iran.liara.run/public/boy?username=username"
        }

        [jwt key is sent to user via cookie.]
        
        Error Response : {"error" : "Error Message"}

2.  [  /api/auth/signup  ] ____________ { POST }

        Request-Body : {
            "username" : "dummy",
            "email" : "dummy@gmail.com",
            "password" : "*********",
            "confirmPassword" : "*********",
            "gender" : "male",
        }

        Success Response : {
            "_id": "662bc7af530xxxxxxxxx",
            "email": "dummy@gmail.com",
            "username": "username",
            "gender": "male",
            "profilePic": "https://avatar.iran.liara.run/public/boy?username=username"
        }

        [jwt key is sent to user via cookie.]
        
        Error Response : {"error" : "Error Message"}

3.  [  /api/auth/logout  ] ____________ { POST }

        Request-Body : Nil

        Success Response : { "message" : "Logged out successfully" } 

        [This sets the max-age of jwt to 0]

        Error Response : {"error" : "Error Message"}

### Only authorized user can use below Api's.

4.  [  /api/users  ] ____________ { GET }
        
        This will get the list of all the users(except you) using this platform.

        Success Response : [
            {
                "_id": "662bc7bd5307e9361f5ccba2",
                "username": "rishi2",
                "email": "dummy2@gmail.com",
                "gender": "male",
                "profilePic": "https://avatar.iran.liara.run/public/boy?username=rishi2",
                "createdAt": "Created Date",
                "updatedAt": "Updated Date",
                "__v": 0
            },
            ....
        ]
        
        Error Response : {"error" : "Error Message"}

4.  [  /api/messages  ] ____________ { GET }

        This will get you the messages of a particular user.

        Query : userToChatId=662bc7af530xxxxxxxxx
        
        Success Response : [
            {
                "_id": "662bc81f5307e9361f5ccbb3",
                "senderId": "662bc7eb5307e9361f5ccbab",
                "receiverId": "662bc7af5307e9361f5ccb9f",
                "message": "Hiii Wassupp",
                "createdAt": "Created Date",
                "updatedAt": "Updated Date",
                "__v": 0
            },
            ...
        ]
        
        Error Response : {"error" : "Error Message"}

5.  [  /api/messages/send  ] ____________ { POST }

        Query : receiverId=662bc7af530xxxxxxxxx

        Request Body : { "message" : "Your message" }
        
        Success Response : {
            "senderId": "662bc7af5xxxxxxxxxxxxx",
            "receiverId": "662bc7afxxxxxxxxxxxxxx",
            "message": "Your message",
            "_id": "6634f396655xxxxxxxxxxx",
            "createdAt": "Created Date",
            "updatedAt": "Updated Date",
            "__v": 0
        }
        
        Error Response : {"error" : "Error Message"} 

## Socket

    - Implementation paths
    
        Server Side ->

            1. /socket/socket.ts    [For Establishing Socket Connection and Emiting Data of Online Users]

            2. /controllers/message.controller.ts   [For Emitting A New Message to user]

        Client Side ->

            1. src/context/SocketContext.tsx  [For Establishing Socket Connection & Listen for Online Users]

            2. src/hooks/useListenMessage.tsx [Listen for NewMessage]

## Logger
    
    - Implemented logging middleware to record detailed API access information, enhancing traceability and monitoring of note-related activities.

    - It Logs the following details.

        1. Date and Time of Api hit.
        2. Status Code of the Api.
        3. Method of HTTP used.
        4. Name of the End Point Hit.
        5. Response time.
        6. Request Body.
        7. Response Body.

    - It displays diffrent color logs based on the status Code.

        |   Status Code   |      Color      |
        |-----------------|-----------------|
        |     1xx         |     Yellow      |
        |     2xx         |     Green       |
        |     3xx         |     Blue        |
        |     4xx         |     Red         |
        |     5xx         |     Orange      |

      
    - Made by using Morgan and chalk npm pacakge.
