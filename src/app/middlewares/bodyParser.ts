import { catchAsync } from '../utils/catchAsync';
import { CustomError } from '../utils/CustomError';


export const parseBody = catchAsync(async (req, res, next) => {
  if (!req.body.data) {
    throw new CustomError(
      400,
      'Please provide data in the body under data key'
    );
  }
  req.body = JSON.parse(req.body.data);

  next();
});
