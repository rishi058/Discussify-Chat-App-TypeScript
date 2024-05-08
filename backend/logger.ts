import chalk from 'chalk';
import morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';

export function customLogger() {
  return (req : Request, res : Response, next : NextFunction) => {

    let resBody : any;
    let oldSend = res.send;
    
    res.send = function(data) {
      resBody = data; 
      return oldSend.apply(res, arguments as any);
    };

    morgan.token('req-body', function (req : Request, res) {
      return JSON.stringify(req.body);
    });

    morgan.format("customLogger", (tokens : any,  req : any, res : any) => {
      if(tokens.status(req, res)==undefined){return null;}

      const status = parseInt(tokens.status(req, res));
      const method = tokens.method(req, res);
      const endpoint = tokens.url(req, res);
      const resTime = tokens['response-time'](req, res);
      const reqBody = tokens['req-body'](req, res);
      const datetime = new Date().toLocaleString();

      if(status < 200) {
        console.log(chalk.yellow.bold(`${datetime} | `) + chalk.bgYellow.bold(` ${ status } `) + chalk.yellow.bold(` | ${method} | URL : ${endpoint} | ${resTime} ms | Req-Body : ${reqBody} | Res-Body : ${resBody}`));
      }
      else if (status >= 200 && status < 300) {
        console.log(chalk.green.bold(`${datetime} | `) + chalk.bgGreen.bold(` ${ status } `) + chalk.green.bold(` | ${method} | URL : ${endpoint} | ${resTime} ms | Req-Body : ${reqBody} | Res-Body : ${resBody}`));
      } 
      else if(status >= 300 && status < 400){
        console.log(chalk.blue.bold(` ${datetime} | `) + chalk.bgBlue.bold(` ${status} `) + chalk.blue.bold(` | ${method} | URL : ${endpoint} | ${resTime} ms | Req-Body : ${reqBody} | Res-Body : ${resBody}`));
      }
      else if(status >= 400 && status < 500) {
        console.log(chalk.red.bold(` ${datetime} | `) + chalk.bgRed.bold(` ${status} `) + chalk.red.bold(` | ${method} | URL : ${endpoint} | ${resTime} ms | Req-Body : ${reqBody} | Res-Body : ${resBody}`));
      }
      else{
        console.log(chalk.magenta.bold(` ${datetime} | `) + chalk.bgMagenta.bold(` ${status} `) + chalk.magenta.bold(` | ${method} | URL : ${endpoint} | ${resTime} ms | Req-Body : ${reqBody} | Res-Body : ${resBody}`));
      }
    });

    const loggerMiddleware = morgan("customLogger");

    loggerMiddleware(req, res, next);
  };
}