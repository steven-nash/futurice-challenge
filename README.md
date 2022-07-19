# Simple Calculator Web Service
This is a simple web service to implement a calculator.  

The web service parses a Base64 input of a simple calculator. It accepts only numbers and the operations (symbols): + - * ( ),
then sends a JSON response of the result with the following formats:  

On success: { "error": false, "result": number }  

On error: { "error": true, "message": "string" }  

For ease of use, the endpoint "/" renders a simple UI that takes an input, converts it to Base64, and redirects to the endpoint "/calculus?query=[input]".  

The application was written in EJS and JavaScript, using Node.js and Express.js. It uses 'safe-eval' to calculate, a less vulnerable version of the standard 'eval()' which is very prone to XSS.
The application was deployed using AWS App Runner, and can be accessed [here](https://byva2nabtm.us-east-2.awsapprunner.com)
