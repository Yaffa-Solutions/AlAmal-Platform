export class CustomError extends Error {
  constructor({message, status ,errors=[]}) {
    super(message);
    this.status = status;
    this.errors=errors;
  }
}

export const errorHandler = (error, req, res, next) => {
  console.debug(error)
  res.status(error.status || 500).json({ status:false, error: error.message || "something went wrong"  , errors:error.errors || []});
};