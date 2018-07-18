# Node JS - Identifies IP Addresses
## Simple REST API



##### The node server deployed, You can use it [Here](https://nodeip.herokuapp.com), Or you can [clone](https://github.com/livnoni/NodeIp.git) it and run on your local machine.

## Install

    npm  install

## Run the app

    npm start
    
    
    
# REST API

The REST API to the node ip app is described below.

## Will return the ip address of the previous client accessing that endpoint

### Request

`GET /prev/`

    curl -i -H 'Accept: application/json' https://nodeip.herokuapp.com/prev

### Response
    HTTP/1.1 200 OK
    Server: Cowboy
    Connection: keep-alive
    X-Powered-By: Express
    Date: Wed, 18 Jul 2018 19:47:45 GMT
    Content-Length: 71
    Via: 1.1 vegur
    
    The prev ip that have been connected to the server is xx.xx.xx.xx

## Will return the total number of /prev requests served so far

### Request

`GET /total/`

    curl -i -H 'Accept: application/json' https://nodeip.herokuapp.com/total

### Response
    HTTP/1.1 200 OK
    Server: Cowboy
    Connection: keep-alive
    X-Powered-By: Express
    Date: Wed, 18 Jul 2018 19:50:27 GMT
    Content-Length: 51
    Via: 1.1 vegur
    
    There were total 7 of /prev requests served so far.
    
## will return statistics of the client ip addresses on all API endpoints

### Request

`GET /stats/`

    curl -i -H 'Accept: application/json' https://nodeip.herokuapp.com/total

### Response
    HTTP/1.1 200 OK
    Server: Cowboy
    Connection: keep-alive
    X-Powered-By: Express
    Date: Wed, 18 Jul 2018 19:51:36 GMT
    Content-Length: 214
    Via: 1.1 vegur    
    
    stats = 
    {
        "xx.xx.xx.xx": [
            {
                "time": "2018-07-18T19:51:55.371Z",
                "deviceType": "desktop",
                "protocol": "http",
                "isSecureConnection": false
          },
           {
               "time": "2018-07-18T19:52:20.655Z",
              "deviceType": "phone",
              "protocol": "http",
                "isSecureConnection": false
            }
        ],
        "yy.yy.yy.yy": [
            {
                "time": "2018-07-18T19:52:46.744Z",
                "deviceType": "phone",
                "protocol": "http",
                "isSecureConnection": false
            }
        ]
    }    