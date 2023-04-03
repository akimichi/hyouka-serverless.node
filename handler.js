'use strict';

module.exports.evaluate = async (event, context, callback) => {
  const Hyouka = require('hyouka.js');
  const Env = Hyouka.Env,
    Syntax = Hyouka.Syntax,
    Semantics = Hyouka.Semantics,
    Interpreter = Hyouka.Interpreter;

  const { Maybe, Cont, IO } = Hyouka.Monad

  const body = JSON.parse(event.body)
  // console.log("body", body)
  if (typeof data.code !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          message: "Validation Error",
          input: event,
        })
    });
    return;
  } else {
    const environment = Env.prelude()
    Maybe.match(Cont.eval(Evaluator(environment)(data.code)),{
      nothing: (message) => {
        callback(null, {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              message,
              input: event,
            })
        });
        return
      },
      just: (value) => {
        callback(null, {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              message: value,
              input: event,
            })
        });
        return
      }
    })
  }
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(
  //     {
  //       message: "body",
  //       input: event,
  //     },
  //     null,
  //     2
  //   ),
  // };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
