import { Request, Response, NextFunction } from `express`;
import { PathLike} from 'fs';
const fs = require('fs');
const express = require("express")
const app = express();
const port = 3100;

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
//define the template engine
app.engine('alab', 
(
    filePath: PathLike | number,
    options: {subject: string; name: string, engine: string, link: string} | undefined | null,
    callback: Function
): void => {
    fs.readFile(filePath, (err:Error, content: string) =>{
        if (err) return callback(err);

        const rendered = content
        .toString()
        .replace('#subject#', `{options?.subject}`)
        .replace(`#name#`, `${options?.name}`);
        .replace(`#engine#`, `${options?.engine}`);
        .replace(`#link#`, `${options?.link}`);
    return callback(null, rendered);
    })
    } 
);


app.set('views', './views'); //specify the views directory
app.set('view engine', 'alab'); // register the template engine

app.get ('/', (req: Request, res: Response, next: NextFuntion) => {
    const options = {
        subject: 'ALAB 318.2.1',
        name: 'Template Engine Express',
        engine: 'Express',
        link: '/unsubscribe'
    } 
    res.render('index', options);
})
app.get ('/unsubscribe', (req: Request, res: Response, next: NextFuntion) => {
    res.render('unsubscribe');
})

app.post('/unsubscribe', (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    console.log(email);
});

// app.engine('unsubscribe', 
// (
//     filePath: PathLike | number,
//     options: {subject: string; name: string, engine: string, link: string} | undefined | null,
//     callback: Function
// ): void => {
//     fs.readFile(filePath, (err:Error, content: string) =>{
//         if (err) return callback(err);

//     //     const rendered = content
//     //     .toString()
//     //     .replace('#subject#', `{options?.subject}`)
//     //     .replace(`#name#`, `${options?.name}`);
//     //     .replace(`#engine#`, `${options?.engine}`);
//     //     .replace(`#link#`, `${options?.link}`);
//     // return callback(null, rendered);
//     })
//     res.render('index', options)
// } 
// )
// app.set('views', './views'); //specify the views directory
// app.set('view engine', 'perscholas'); // register the template engine

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).send(err.message);
});

