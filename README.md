# Simple Calculator Web Service
### This is a simple web service to implement a calculator.  

The web service parses a Base64 input of a simple calculator. It accepts only numbers and the operations (symbols): + - * ( ),
then sends a JSON response of the result with the following formats:  

- On success: { "error": false, "result": number }  

- On error: { "error": true, "message": "string" }  

For ease of use, the endpoint "/" renders a simple UI that takes an input, converts it to Base64, and redirects to the endpoint "/calculus?query=[input]".  

The application was written in EJS and JavaScript, using Node.js and Express.js. It uses 'safe-eval' to calculate, a less vulnerable version of the standard 'eval()' (which is very prone to XSS).
The application was deployed directly from the repository using AWS App Runner, and can be accessed [here](https://byva2nabtm.us-east-2.awsapprunner.com). It is configured to have automatic updates upon every change in this repository, and uses Node version 14.19.0 to meet App Runner's requirements. It was set up with 1 vCPU & 2 GB of memory.

Jest and Supertest were used for testing, which can be run using "npm test". The following 6 inputs were tested:  
- Test of the given example: "2 * (23/(3*3))- 23 * (2*3)".  
Expected result: -132.88888888888889

- Test division by zero: "5/0".  
Expected result: null

- Test an equation with an invalid letter: "2 * (23f/(3*3))- 23 * (2*3)".  
Expected result: error

- Test input surrounded by quotation marks: ""5/3"".  
Expected result: error

- Test invalid symbol: "6-$643".  
Expected result: error

- Empty query: "".  
Expected result: error

All tests were successfully passed.

Dependencies:
- node: "14.19.0"
- npm: "6.14.16"
- debug: "~2.6.9"
- ejs: "~2.6.1"
- express: "~4.16.4"
- http-errors: "~1.6.3"
- jest: "^28.1.3"
- safe-eval: "^0.4.1"
- supertest: "^6.2.4"
