const dataMethods = ['body', "params", "query"];

const validation = (Schema, redirectPath) => {
  return (req, res, next) => {
    const validationArr = [];
    for (const key of dataMethods) {
      if (Schema[key]) {
        const validationResult = Schema[key].validate(req[key], {
          abortEarly: false,
        });
        if (validationResult?.error?.details) {
          // console.log(validationResult.error.details);
          // console.log(validationResult.error.details.context);
          // validationArr.push(validationResult.error.details.context);
          for (const ele of validationResult.error.details) {
            // console.log({ele});
            validationArr.push(ele.context.label)
        }
        }
      }
    }
    if (validationArr.length) {
      req.flash('validationErr', validationArr)
      req.flash('oldInputs', req.body)
      res.redirect(redirectPath)
    } else {
      next()
    }
  };
};
export default validation