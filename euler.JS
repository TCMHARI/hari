/*If we list all the natural numbers below 10 that are multiples
of 3 or 5, we get 3, 5, 6 and 9.
The sum of these multiples is 23.

Find the sum of all the multiples of 3 or 5 below 1000.
*/
<html>
<head>
    <title>Sum of Multiples of 3 or 5</title>
    <script>
        function calculateSum() {
            let sum = 0;
            const n = 1000;

            for (let i = 0; i < n; i++) {
                if (i % 3 === 0 || i % 5 === 0) {
                    sum += i;
                }
            }

            document.getElementById("result").innerText = "The sum of all multiples of 3 or 5 below 1000 is: " + sum;
        }
    </script>
</head>
<body onload="calculateSum()">
    <h1>Project Euler: Sum of Multiples of 3 or 5</h1>
    <p id="result"></p>
</body>
</html>