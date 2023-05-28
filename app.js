const express = require('express');
const app = express();
const PORT = 3000;


app.locals.pretty = true;
app.set("view engine", "pug"); // template 으로 pug 를 사용
app.set("views",'./views') //views 라는 폴더를 연결 파일이름은 바뀌어도 됨 하지만 전통적으로 views 폴더
// app.get('/', function(req, res){
//     res.render('index') //send 대신 render 를 사용하면 views 폴더의 temp.pug 로 연결
// })
app.use(express.static('public'));


app.get('/', (req, res, next) => {
    Promise.all([
        fetch('https://api.quotable.io/quotes/random').then(response => response.json()),
        fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=8b60bbeb5da24ed2bf2105332fc9ca3a').then(response => response.json()),
        fetch('https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-hot-100/recent.json').then(response => response.json()),
    ])
    .then(data_list => {
        const advice = data_list[0][0];
        console.log(advice);
        const news = data_list[1].articles;
        const music = data_list[2].data;
        res.render('index', { quotes: advice, news: news, music_list: music });
    })
    .catch(error => {
        console.error(error);
        next(error);
    });
});


app.listen(PORT, function(){
    console.log(`server is running and up at ${PORT} PORT`)
});