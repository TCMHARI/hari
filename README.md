<html>
    <!--
Prompt the user to enter the weight of their baggage, and alert them if it exceeds the limit of 15kg.
    -->
    <head>
        <script>
            let doIt= () => {
                inputText=document.getElementById("userInput").value;
                alert(Number(inputText)+1);
            }

        </script>
    </head>
    <body>
        <input type="text" id="userInput">
        <button onclick="doIt()">Press Me!</button>
    </body>
</html>
