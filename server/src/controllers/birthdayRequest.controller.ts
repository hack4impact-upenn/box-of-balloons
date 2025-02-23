/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import express from 'express';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';
import {
  getAllRequestsByID,
  updateRequestStatusByID,
  getRequestById,
  deleteRequestByID,
  createBirthdayRequestByID,
  getAllBoxesDelivered,
  getMonthlyOverviewByDate,
} from '../services/birthdayRequest.service.ts';
import { getUserById } from '../services/user.service.ts';
import {
  emailRequestUpdate,
  emailRequestDelete,
  emailRequestCreate,
  emailRequestApproved,
  emailRequestDelivered,
  emailRequestDenied,
  emailChapterRequestCreate,
} from '../services/mail.service.ts';
import {
  ChildGender,
  ChildRace,
  ChildSituation,
  IBirthdayRequest,
} from '../models/birthdayRequest.model.ts';
import { IUser } from '../models/user.model.ts';

const getAllRequests = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  if (!id) {
    next(ApiError.missingFields(['id']));
    return;
  }
  return (
    getAllRequestsByID(id)
      .then((requestsList) => {
        res.status(StatusCode.OK).send(requestsList);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(ApiError.internal('Unable to retrieve all requests'));
      })
  );
};

const getTotalBoxesDelivered = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  return getAllBoxesDelivered()
    .then((countDelivered) => {
      res.status(StatusCode.OK).json({ count: countDelivered });
    })
    .catch((e) => {
      next(ApiError.internal('Unable to get total number of delivered boxes'));
    });
};

const updateRequestStatus = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // request id
  const { id } = req.params;
  if (!id) {
    next(ApiError.missingFields(['id']));
    return;
  }
  const { updatedValue } = req.body;
  if (!updatedValue) {
    next(ApiError.missingFields(['updatedValue']));
    return;
  }
  if (updatedValue !== 'Approved' && updatedValue !== 'Delivered') {
    next(ApiError.internal('Invalid input'));
    return;
  }
  // get the chapter and partner agency emails
  // get request object by it's id
  const request: IBirthdayRequest | null = await getRequestById(id);
  if (!request) {
    next(ApiError.notFound(`Request with id ${id} does not exist`));
    return;
  }
  // get chapter email by chapter ID
  const chapter: IUser | null = await getUserById(request.chapterId);
  if (!chapter) {
    next(ApiError.notFound(`Chapter does not exist`));
    return;
  }
  // get partner agency email and chapter email in the request object
  const agencyEmail = request.agencyWorkerEmail;
  const chapterEmail = chapter.email;

  return updateRequestStatusByID(id, updatedValue)
    .then(() => {
      let emailFunction;
      switch (updatedValue) {
        case 'Approved':
          emailFunction = emailRequestApproved;
          break;
        case 'Delivered':
          emailFunction = emailRequestDelivered;
          break;
        case 'Denied':
          emailFunction = emailRequestDenied;
          break;
        default:
          next(ApiError.internal('Invalid status'));
          return;
      }
      console.log(emailFunction);
      emailFunction(agencyEmail, request.childName)
        .then(() => {
          emailRequestUpdate(chapterEmail, updatedValue, request.childName)
            .then(() =>
              res.status(StatusCode.CREATED).send({
                message: `Email has been sent to all parties.`,
              }),
            )
            .catch(() => {
              next(ApiError.internal('Failed to send chapter email.'));
            });
        })
        .catch(() => {
          next(ApiError.internal('Failed to send agency update email.'));
        });
    })
    .catch((e) => {
      next(ApiError.internal('Unable to retrieve all requests'));
    });
};

const deleteRequest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // request id
  const { id } = req.params;
  if (!id) {
    next(ApiError.missingFields(['id']));
    return;
  }
  // get the chapter and partner agency emails
  // get request object by it's id
  const request: IBirthdayRequest | null = await getRequestById(id);
  if (!request) {
    next(ApiError.notFound(`Request with id ${id} does not exist`));
    return;
  }
  // get chapter email by chapter ID
  const chapter: IUser | null = await getUserById(request.chapterId);
  if (!chapter) {
    next(ApiError.notFound(`Chapter does not exist`));
    return;
  }
  // get partner agency email and chapter email in the request object
  const agencyEmail = request.agencyWorkerEmail;
  const chapterEmail = chapter.email;

  return (
    deleteRequestByID(id)
      .then(() => {
        emailRequestDelete(agencyEmail, request.childName)
          .then(() => {
            emailRequestDelete(chapterEmail, request.childName)
              .then(() =>
                res.status(StatusCode.CREATED).send({
                  message: `Email has been sent to all parties.`,
                }),
              )
              .catch(() => {
                next(ApiError.internal('Failed to send chapter email.'));
              });
          })
          .catch(() => {
            next(ApiError.internal('Failed to send agency update email.'));
          });
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(ApiError.internal('Unable to delete request.'));
      })
  );
};

const createRequest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
    chapterId,
    deadlineDate,
    childBirthday,
    childName,
    childAge,
    childGenderRaw,
    childRaceRaw,
    childInterests,
    giftSuggestions,
    childAllergies,
    allergyDetails,
    additionalInfo,
    childSituationRaw,
    agencyWorkerName,
    agencyOrganization,
    agencyWorkerPhone,
    agencyWorkerEmail,
    agencyPhysicalAddress,
    isFirstReferral,
    agreeFeedback,
    agreeLiability,
  } = req.body;

  const childGender = childGenderRaw as ChildGender;
  const childRace = childRaceRaw as ChildRace;
  const childSituation = childSituationRaw as ChildSituation;

  if (!chapterId || typeof chapterId !== 'string') {
    next(ApiError.notFound(`chapterId does not exist or is invalid`));
    return;
  }

  if (deadlineDate !== undefined && deadlineDate !== null) {
    try {
      req.body.deadlineDate = new Date(deadlineDate);
      if (isNaN(req.body.deadlineDate.getTime())) {
        throw new Error('Invalid date');
      }
    } catch (e) {
      next(
        ApiError.notFound(
          `deadlineDate must be a valid date string, null, or undefined`,
        ),
      );
      return;
    }
  }

  if (childBirthday !== undefined && childBirthday !== null) {
    try {
      req.body.childBirthday = new Date(childBirthday);
      if (isNaN(req.body.childBirthday.getTime())) {
        throw new Error('Invalid date');
      }
    } catch (e) {
      next(
        ApiError.notFound(
          `childBirthday must be a valid date string, null, or undefined`,
        ),
      );
      return;
    }
  }

  if (!childName || typeof childName !== 'string') {
    next(ApiError.notFound(`childName does not exist or is invalid`));
    return;
  }
  if (!childAge || typeof childAge !== 'number') {
    next(ApiError.notFound(`childAge does not exist or is invalid`));
    return;
  }

  if (!childInterests || typeof childInterests !== 'string') {
    next(ApiError.notFound(`childInterests does not exist or is invalid`));
    return;
  }
  if (!giftSuggestions || typeof giftSuggestions !== 'string') {
    next(ApiError.notFound(`giftSuggestions does not exist or is invalid`));
    return;
  }
  if (typeof childAllergies !== 'boolean') {
    next(ApiError.notFound(`childAllergies does not exist or is invalid`));
    return;
  }
  if (!allergyDetails || typeof allergyDetails !== 'string') {
    next(ApiError.notFound(`allergyDetails does not exist or is invalid`));
    return;
  }
  if (!additionalInfo || typeof additionalInfo !== 'string') {
    next(ApiError.notFound(`additionalInfo does not exist or is invalid`));
    return;
  }

  if (!agencyWorkerName || typeof agencyWorkerName !== 'string') {
    next(ApiError.notFound(`agencyWorkerName does not exist or is invalid`));
    return;
  }
  if (!agencyOrganization || typeof agencyOrganization !== 'string') {
    next(ApiError.notFound(`agencyOrganization does not exist or is invalid`));
    return;
  }

  if (!agencyPhysicalAddress || typeof agencyPhysicalAddress !== 'string') {
    next(
      ApiError.notFound(`agencyPhysicalAddress does not exist or is invalid`),
    );
    return;
  }

  if (!agencyWorkerPhone || typeof agencyWorkerPhone !== 'string') {
    next(ApiError.notFound(`agencyWorkerPhone does not exist or is invalid`));
    return;
  }
  if (!agencyWorkerEmail || typeof agencyWorkerEmail !== 'string') {
    next(ApiError.notFound(`agencyWorkerEmail does not exist or is invalid`));
    return;
  }
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
  if (!agencyWorkerEmail.match(emailRegex)) {
    next(ApiError.badRequest('Invalid email'));
    return;
  }

  if (typeof isFirstReferral !== 'boolean') {
    next(ApiError.notFound(`isFirstReferral does not exist or is invalid`));
    return;
  }
  if (typeof agreeFeedback !== 'boolean') {
    next(ApiError.notFound(`agreeFeedback does not exist or is invalid`));
    return;
  }
  if (typeof agreeLiability !== 'boolean') {
    next(ApiError.notFound(`agreeLiability does not exist or is invalid`));
    return;
  }

  try {
    const birthdayRequest = await createBirthdayRequestByID({
      chapterId,
      deadlineDate,
      childBirthday,
      childName,
      childAge,
      childGender,
      childRace,
      childInterests,
      giftSuggestions,
      childAllergies,
      allergyDetails,
      additionalInfo,
      childSituation,
      agencyWorkerName,
      agencyOrganization,
      agencyWorkerPhone,
      agencyWorkerEmail,
      agencyPhysicalAddress,
      isFirstReferral,
      agreeFeedback,
      agreeLiability,
    });

    // Get chapter email
    const chapter: IUser | null = await getUserById(chapterId);
    if (!chapter) {
      next(ApiError.notFound(`Chapter does not exist`));
      return;
    }

    // Send emails to both agency worker and chapter
    Promise.all([
      emailRequestCreate(agencyWorkerEmail, childName),
      emailChapterRequestCreate(chapter.email, childName),
    ])
      .then(() => {
        res.status(StatusCode.CREATED).send({
          message: `Request created and emails have been sent.`,
          birthdayRequest,
        });
      })
      .catch((err) => {
        console.log(err);
        next(ApiError.internal('Failed to send confirmation emails.'));
      });
  } catch (err) {
    console.log(err);
    next(ApiError.internal('Unable to register user.'));
  }
};

const getMonthlyOverview = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return next(ApiError.missingFields(['startDate', 'endDate']));
  }

  try {
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    const overview = await getMonthlyOverviewByDate(start, end);
    res.status(StatusCode.OK).json(overview);
  } catch (error) {
    next(ApiError.internal('Failed to retrieve monthly overview.'));
  }
};

export {
  getAllRequests,
  updateRequestStatus,
  deleteRequest,
  createRequest,
  getTotalBoxesDelivered,
  getMonthlyOverview,
};
