'use strict';
const Hyouka = require('hyouka.js');
const Env = Hyouka.Env,
  Syntax = Hyouka.Syntax,
  Semantics = Hyouka.Semantics,
  Interpreter = Hyouka.Interpreter;
const Evaluator = Interpreter(Syntax.expression, Semantics.evaluator);

const { Maybe, Cont, IO } = Hyouka.Monad

module.exports.evaluate = async (event, context, callback) => {
  // const body = JSON.parse(event.body)
  const body = JSON.parse(event.body)
  console.log("body", body)

  if (typeof body.code !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: {
          message: "Validation Error",
          input: event
      }
    });
    return;
  } else {
    console.log("body.code", body.code)
    const environment = Env.prelude()
    Maybe.match(Cont.eval(Evaluator(environment)(body.code)),{
      nothing: (message) => {
        console.log("nothing", message)
        callback(null, {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            input: event,
          })
        });
      },
      just: (value) => {
        console.log("just", value)
        callback(null, {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              answer: value
            })
        });
      }
    })
  }
};
