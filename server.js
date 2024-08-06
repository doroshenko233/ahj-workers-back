const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const Router = require('koa-router');
const faker = require('faker');
const slow = require('koa-slow');
const router = new Router();
const app = new Koa();

function createNews() {
    const arrayNews = [];
    for (let i = 0; i < 3; i++) {
        const news = {
            date: faker.time.recent(),
            img: faker.image.image(),
            text: faker.lorem.paragraph(),
        }
        arrayNews.push(news);
    }
    return arrayNews;
}

app.use(koaBody({
    text: true,
    urlencoded: true,
    multipart: true,
    json: true,
}));

app.use(cors({
    origin: '*',
    credentials: true,
    'Access-Control-Allow-Origin': true,
    allowMethods: ['GET']
}));

router.get('/news', async (ctx) => {
    ctx.response.body = createNews();
    ctx.status = 200;
});

app.use(slow({
    delay: 3000
}));

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3333;
app.listen(port, () => console.log('Server started'));