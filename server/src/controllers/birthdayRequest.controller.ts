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
} from '../services/birthdayRequest.service.ts';
import { getChapterById } from '../services/chapter.service.ts';
import {
  emailRequestUpdate,
  emailRequestDelete,
} from '../services/mail.service.ts';
import { IBirthdayRequest } from '../models/birthdayRequest.model.ts';
import { IChapter } from '../models/chapter.model.ts';

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
  const chapter: IChapter | null = await getChapterById(request.chapterId);
  if (!chapter) {
    next(ApiError.notFound(`Chapter does not exist`));
    return;
  }
  // get partner agency email and chapter email in the request object
  const agencyEmail = request.agencyWorkerEmail;
  const chapterEmail = chapter.email;

  return (
    updateRequestStatusByID(id, updatedValue)
      .then(() => {
        emailRequestUpdate(agencyEmail, updatedValue, request.childName)
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(ApiError.internal('Unable to retrieve all requests'));
      })
  );
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
  const chapter: IChapter | null = await getChapterById(request.chapterId);
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
  console.log('got request');

  const {
    chapterId,
    deadlineDate: deadlineDateStr,
    childBirthday: childBirthdayStr,
    childAge,
    childName,
    childGender,
    childRace,
    childSituation,
    childInterests,
    childAllergies,
    allergyDetails,
    giftSuggestions,
    additionalInfo,
    agencyWorkerName,
    agencyOrganization,
    agencyAddress,
    agencyWorkerPhone,
    agencyWorkerEmail,
    isFirstReferral,
    agreeFeedback,
    liability,
  } = req.body;

  const user = await createBirthdayRequestByID(
    chapterId,
    deadlineDateStr,
    childBirthdayStr,
    childAge,
    childName,
    childGender,
    childRace,
    childSituation,
    childInterests,
    childAllergies,
    allergyDetails,
    giftSuggestions,
    additionalInfo,
    agencyWorkerName,
    agencyOrganization,
    agencyAddress,
    agencyWorkerPhone,
    agencyWorkerEmail,
    isFirstReferral,
    agreeFeedback,
    liability,
  );
  res.sendStatus(StatusCode.CREATED);
  console.log('creating: ');
  console.log(req.body);

  // const missingFields: string[] = [];

  // if (!chapterId || typeof chapterId !== 'string') {
  //   missingFields.push('chapterId');
  // }

  // const deadlineDate = new Date(deadlineDateStr) ?? undefined;

  // if (!deadlineDate || !(deadlineDate instanceof Date)) {
  //   missingFields.push('deadlineDate');
  // }

  // const childBirthday = new Date(childBirthdayStr) ?? undefined;

  // if (!childBirthday || !(childBirthday instanceof Date)) {
  //   missingFields.push('childBirthday');
  // }

  // if (!childAge || typeof childAge !== 'number') {
  //   missingFields.push('childAge');
  // }
  // if (!childName || typeof childName !== 'string') {
  //   missingFields.push('childName');
  // }
  // if (!childGender || typeof childGender !== 'string') {
  //   missingFields.push('childGender');
  // }
  // if (childGender !== 'Boy' && childGender !== 'Girl') {
  //   missingFields.push('childGender');
  // }
  // if (!childRace || typeof childRace !== 'string') {
  //   missingFields.push('childRace');
  // }

  // if (!childInterests || typeof childInterests !== 'string') {
  //   missingFields.push('childInterests');
  // }
  // if (childAllergies !== true && childAllergies !== false) {
  //   missingFields.push('childAllergies');
  // }

  // if (
  //   childAllergies &&
  //   (!allergyDetails || typeof allergyDetails !== 'string')
  // ) {
  //   missingFields.push('allergyDetails');
  // }
  // if (!giftSuggestions || typeof giftSuggestions !== 'string') {
  //   missingFields.push('giftSuggestions');
  // }
  // if (!additionalInfo || typeof additionalInfo !== 'string') {
  //   missingFields.push('additionalInfo');
  // }
  // if (!agencyWorkerName || typeof agencyWorkerName !== 'string') {
  //   missingFields.push('agencyWorkerName');
  // }
  // if (!agencyOrganization || typeof agencyOrganization !== 'string') {
  //   missingFields.push('agencyOrganization');
  // }
  // if (!agencyWorkerPhone || typeof agencyWorkerPhone !== 'string') {
  //   missingFields.push('agencyWorkerPhone');
  // }

  // if (!agencyWorkerEmail || typeof agencyWorkerEmail !== 'string') {
  //   missingFields.push('agencyWorkerEmail');
  // }
  // const emailRegex =
  //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
  // if (!agencyWorkerEmail.match(emailRegex)) {
  //   missingFields.push('agencyWorkerEmail');
  // }

  // if (isFirstReferral !== true && isFirstReferral !== false) {
  //   missingFields.push('isFirstReferral');
  // }
  // if (agreeFeedback !== true && agreeFeedback !== false) {
  //   missingFields.push('agreeFeedback');
  // }

  // if (missingFields.length > 0) {
  //   next(ApiError.missingFields(missingFields));
  //   return;
  // }

  // try {
  //   const user = await createBirthdayRequestByID(
  //     chapterId,
  //     deadlineDate,
  //     childBirthday,
  //     childAge,
  //     childName,
  //     childGender,
  //     childRace,
  //     childSituation,
  //     childInterests,
  //     childAllergies,
  //     allergyDetails,
  //     giftSuggestions,
  //     additionalInfo,
  //     agencyWorkerName,
  //     agencyOrganization,
  //     agencyAddress,
  //     agencyWorkerPhone,
  //     agencyWorkerEmail,
  //     isFirstReferral,
  //     agreeFeedback,
  //     liability,
  //   );
  //   res.sendStatus(StatusCode.CREATED);
  //   console.log('creating: ');
  //   console.log(req.body);
  // } catch (err) {
  //   console.log('error: ');
  //   console.log(req.body);
  //   next(ApiError.internal('Unable to register user.'));
  // }
};

export { getAllRequests, updateRequestStatus, deleteRequest, createRequest };
