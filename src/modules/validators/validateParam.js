export default function validateParameter(obj, ...properties) {
  for (const property of properties) {
    if (obj === undefined || obj[property] === undefined) {
      throw new Error(
        `Invalid parameter. Missing required property: ${property}`
      );
    }
  }
}
