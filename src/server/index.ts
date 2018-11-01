import app from './app';

app.listen(process.env.APP_PORT || 3000, () => {
    console.log(`App is running in port ${process.env.APP_PORT || 3000}`);
});
