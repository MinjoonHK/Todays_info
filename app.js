const express = require('express');
const app = express();
const PORT = 3000;


app.locals.pretty = true;
app.set("view engine", "pug"); // template 으로 pug 를 사용
app.set("views",'./views') //views 라는 폴더를 연결 파일이름은 바뀌어도 됨 하지만 전통적으로 views 폴더
app.get('/', function(req, res){
    res.render('index') //send 대신 render 를 사용하면 views 폴더의 temp.pug 로 연결
})
app.use(express.static('public'));

app.get('/topic',function(req,res){
    // res.send(req.query.id); //id 라는 매개변수를 이용중
    var topics=[
        'Javscript?',
        'Node.js?',
        'Express.js?',
    ];
    var output = `
        <a href="/topic?id=0">JavaScript</a><br>
        <a href="/topic?id=1">Node.Js</a><br>
        <a href="/topic?id=2">Express.Js</a><br>
        ${topics[req.query.id]}
    `
    res.send(output);
})



//누군가가 /pet 이라는 경로로 방문을 하면 pet 관련된 안내문을 띄워주자

app.get('/pet',function(req, res){ // /pet 이라는 서버를 만든거임 이제 여기로 html 을 보내면 html이 뜨겟죵?
    res.send('Welcome to the page');
});

app.get('/beauty', function(req,res){
    res.send('Welcome to the beauty page')
})

app.get('/', function(req,res){ //어떤 사람이 '/' 라는 페이지를 GET 요청하면~ index.html 이라는 파일을 보내주세용
    res.sendFile(__dirname + '/index.html') //index 에 들어왔을때 이 파일을 보내주세용~
})

app.listen(PORT, function(){
    console.log(`server is running and up at ${PORT} PORT`)
});