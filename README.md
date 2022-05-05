##MIDDLEWARE
- Middleware are just functions which runs during request (req)/response(res) lifecycle
- Each middleware has access to the request and response objects
- Middleware can end the HTTP request by sending back a response with methods like res.send()
- OR middleware can be chained together, one after another by calling next middleware function()

- npm i morgan