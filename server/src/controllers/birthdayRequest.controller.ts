import express from 'express';
import ApiError from '../util/apiError.ts';
import {
  createBirthdayRequest,
  createBirthdayRequestParamsList,
} from '../services/birthdayRequest.service.ts';
import StatusCode from '../util/statusCode.ts';

const createBirthdayRequestHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  console.log(req.body);
  for (let i = 0; i < createBirthdayRequestParamsList.length; i += 1) {
    const param = createBirthdayRequestParamsList[i];
    if (req.body[param] === undefined || req.body[param] === null) {
      next(ApiError.missingFields(createBirthdayRequestParamsList));
      return;
    }
  }

  // Create user and send verification email
  try {
    const birthdayRequest = await createBirthdayRequest(req.body);

    res.sendStatus(StatusCode.CREATED).json(birthdayRequest);
  } catch (err) {
    console.log(err);
    next(ApiError.internal('Unable to register birthday request.'));
  }
};

export { createBirthdayRequestHandler };
