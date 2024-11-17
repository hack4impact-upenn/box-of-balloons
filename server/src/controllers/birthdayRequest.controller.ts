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
  emailRequestCreate,
} from '../services/mail.service.ts';
import {
  ChildGender,
  ChildRace,
  ChildSituation,
  IBirthdayRequest,
} from '../models/birthdayRequest.model.ts';
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
  if (!deadlineDate || !(deadlineDate instanceof Date)) {
    next(ApiError.notFound(`deadlineDate does not exist or is invalid`));
    return;
  }
  if (!childBirthday || !(childBirthday instanceof Date)) {
    next(ApiError.notFound(`childBirthday does not exist or is invalid`));
    return;
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
    res.sendStatus(StatusCode.CREATED).json(birthdayRequest);
  } catch (err) {
    next(ApiError.internal('Unable to register user.'));
  }
};

export { getAllRequests, updateRequestStatus, deleteRequest, createRequest };
