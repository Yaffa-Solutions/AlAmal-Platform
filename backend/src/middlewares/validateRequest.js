export const validateOrganization = (req, res, next) => {
  const { name, phone, type, address } = req.body;

  const errors = [];
  const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;

  if (!isNonEmptyString(name)) {
    errors.push({ field: "name", message: "name is required and must be a non-empty string" });
  }

  if (!isNonEmptyString(phone)) {
    errors.push({ field: "phone", message: "phone is required and must be a non-empty string" });
  }

  if (!isNonEmptyString(type)) {
    errors.push({ field: "type", message: "type is required and must be a non-empty string" });
  }

  if (address === undefined || address === null) {
    errors.push({ field: "address", message: "address is required and must be JSON or an object" });
  } else {
    if (typeof address === "string") {
      try {
        const parsed = JSON.parse(address);
        if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
          errors.push({ field: "address", message: "address must be a JSON object" });
        }
      } catch (e) {
        errors.push({ field: "address", message: "address must be a valid JSON string" });
      }
    } else if (typeof address !== "object" || Array.isArray(address)) {
      errors.push({ field: "address", message: "address must be an object" });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Invalid organization payload", errors });
  }

  return next();
};
