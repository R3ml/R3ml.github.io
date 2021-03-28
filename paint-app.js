

window.addEventListener("load", () => {
    canvas= document.getElementById("canvas");
    ctx= canvas.getContext("2d");
    canvas.width= window.innerWidth;
    canvas.height= window.innerHeight;

    //variables --
    let painting= false
    let staticLinePainting= false
    let parametricLinePainting= false
    let circlePainting= true
    
    let randomColor;
    let currentColor

    let lastTime;
    let requiredElapsed = 1000 / 10
    let parametricLines = []

    animate()


    function startPosition(e){
        painting=true;
        xStart= e.clientX
        yStart= e.clientY

    }

    function endPosition(e){
        painting=false;
        xEnd= e.clientX
        yEnd= e.clientY

        if(parametricLinePainting){
            parametricLines.push({
                x1: xStart,
                y1: yStart,
                x2: xEnd,
                y2: yEnd
            
            })

        }
    }

    function draw(e){
        if(!painting){return}
        xCurrent= e.clientX
        yCurrent= e.clientY

        if(staticLinePainting){

            ctx.strokeStyle = 'rgba(205, 70, 0, 0.2)';        
            ctx.beginPath()
            ctx.moveTo(xStart, yStart)
            ctx.lineTo(xCurrent + 1, yCurrent + 1)
            ctx.moveTo(xStart, yStart)
            ctx.stroke()

            ctx.strokeStyle= currentColor;
            ctx.beginPath()
            ctx.moveTo(xStart, yStart)
            ctx.lineTo(xCurrent, yCurrent)
            ctx.moveTo(xStart, yStart)
            ctx.stroke()

            ctx.strokeStyle = 'rgba(0, 0, 255, 0.2)';   
            ctx.beginPath()
            ctx.moveTo(xStart, yStart)
            ctx.lineTo(xCurrent, yCurrent)
            ctx.moveTo(xStart, yStart)
            ctx.stroke()

        }

        if(parametricLinePainting){
        }

        if(circlePainting){
            radius= Math.hypot((xStart-xCurrent), (yStart- yCurrent))
            ctx.strokeStyle = currentColor
            ctx.moveTo(xStart, yStart)
            ctx.beginPath()
            ctx.arc(xCurrent, yCurrent, radius,0,7)
            ctx.stroke()
            
        }

    }

    function keydown(e){
        if(e.key=== 'b'){
            changeBackground()
        }

        if(e.key=== 'a'){
            circlePainting=!circlePainting
            staticLinePainting=!staticLinePainting
        }

        if(e.key=== 'q'){
            ctx.strokeStyle= '#'+Math.floor(Math.random()*16777215).toString(16)
        }
        if(e.key=== 'n'){
            saveColor();
        }
    }

    function changeBackground(){
        randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        canvas.style.backgroundColor= randomColor
    }

    function saveColor(){
        colorArea = document.getElementById("color-area")
        let newColor = document.createElement("BUTTON")
        newColor.style.position = "relative"
        newColor.style.padding = "2.5rem"
        newColor.style.backgroundColor = randomColor
        newColor.id = randomColor
        console.log(randomColor)
        colorArea.appendChild(newColor)
        newColor.addEventListener("mousedown", (e) => {
            currentColor = e.target.id
            console.log(e.target.id)})
    }


    function animate(now) {
        requestAnimationFrame(animate);
    
        if (!lastTime) {
            lastTime = now;
        }

        const elapsedTime = now - lastTime;
        if (elapsedTime > requiredElapsed) {
            update();
            lastTime = now;
        }
    }

    function update(now){
        
        /*
        parametricLines.forEach((line) => {
            for(let i = 0; i<10; i++){
                ctx.beginPath()
                ctx.moveTo(Math.asin(line.x1)*canvas.width*100, Math.acos(line.y1)*canvas.height*100)
                ctx.lineTo(Math.asin(line.x2)*canvas.width*100, Math.acos(line.y2)*canvas.height*100)
                console.log(Math.asin(line.x1)*canvas.width*100, Math.acos(line.y1)*canvas.height*100)
                ctx.stroke()
            }
        })
        */
    }

    window.addEventListener("mousedown", startPosition)
    window.addEventListener("mouseup", endPosition)
    window.addEventListener("mousemove", draw)
    window.addEventListener("keydown", keydown)
    })

