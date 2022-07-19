# Simple Calculator Web Service
This is a simple web service to implement a calculator.  

The web service parses a Base64 input of a simple calculator. It accepts only numbers and the operations (symbols): + - * ( ),
then sends a JSON response of the result with the following formats:  

On success: { "error": false, "result": number }  

On error: { "error": true, "message": "string" }  

For ease of use, the endpoint "/" renders a simple UI that takes an input, converts it to Base64, and redirects to the endpoint "/calculus?query=[input]".  

The application was written in EJS and JavaScript, using Node.js and Express.js. It uses 'safe-eval' to calculate, a less vulnerable version of the standard 'eval()' which is very prone to XSS.
The application was deployed using AWS App Runner, and can be accessed [here](https://byva2nabtm.us-east-2.awsapprunner.com)

Jest and Supertest were used for testing. The following 6 inputs were tested:  

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
