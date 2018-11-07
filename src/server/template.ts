export const template = (jsx: string, state: string): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
        <title>Glossary</title>
    </head>
    <body>
        <div id="app">${jsx}</div>
        <script>
            window.__REDUX_DATA = ${state}
        </script>
        <script src="/app.bundle.js" defer></script>
    </body>
    </html>
    `;
};

export default template;
