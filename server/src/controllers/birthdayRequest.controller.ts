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
  const { chapterId, deadlineDate, childBirthday, childAge, childName, childGender, 
    childRace, childInterests, childAllergies, allergyDetails, giftSuggestions, additionalInfo, 
    agencyWorkerName, agencyOrganization, agencyWorkerPhone, agencyWorkerEmail, isFirstReferral, 
    agreeFeedback, requestedDate, status, deliveryDate } = req.body;
    if (!chapterId  || !deadlineDate || !childBirthday || !childAge || !childName || !childGender ||
      !childRace || !childInterests || !childAllergies || !allergyDetails || !giftSuggestions || !additionalInfo ||
      !agencyWorkerName || !agencyOrganization || !agencyWorkerPhone || !agencyWorkerEmail || !isFirstReferral ||
      !agreeFeedback || !requestedDate || !status || !deliveryDate
    ) {
      next(
        ApiError.missingFields([
          'chapterId',
          'deadlineDate',
          'childBirthday',
          'childAge',
          'childName',
          'childGender',
          'childRace',
          'childInterests',
          'childAllergies',
          'allergyDetails',
          'giftSuggestions',
          'additionalInfo',
          'agencyWorkerName',
          'agencyOrganization',
          'agencyWorkerPhone',
          'agencyWorkerEmail',
          'isFirstReferral',
          'agreeFeedback',
          'requestedDate',
          'status',
          'deliveryDate',
        ]),
      );
      return;
    }
  try {
    const user = await createBirthdayRequestByID(
      chapterId,
      deadlineDate,
      childBirthday,
      childAge,
      childName,
      childGender,
      childRace,
      childInterests,
      childAllergies,
      allergyDetails,
      giftSuggestions,
      additionalInfo,
      agencyWorkerName,
      agencyOrganization,
      agencyWorkerPhone,
      agencyWorkerEmail,
      isFirstReferral,
      agreeFeedback,
      requestedDate,
      status,
      deliveryDate,
    );
    // user!.verified = true;
    // await user?.save();
    // await removeInviteByToken(inviteToken);
    res.sendStatus(StatusCode.CREATED);
  } catch (err) {
    next(ApiError.internal('Unable to register user.'));
  }
};

export { getAllRequests, updateRequestStatus, deleteRequest, createRequest };
