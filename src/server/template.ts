export const template = (jsx: string, state: string): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <div id="app">${jsx}</div>
        <script>
            window.__REDUX_DATA = ${state}
        </script>
        <script src="/app.bundle.js"></script>
    </body>
    </html>
    `;
};

export default template;
