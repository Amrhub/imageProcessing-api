export interface QueryInputs {
  name?: string;
  height?: string;
  width?: string;
}

export const validateQueryInputs = ({ name, height, width }: QueryInputs): { isQueryInputsValid: boolean, queryInputsValidationMsg: QueryInputs } => {
  const queryInputsValidationMsg: QueryInputs = {};
  let isQueryInputsValid = true;
  if (!name) {
    isQueryInputsValid = false;
    queryInputsValidationMsg.name = "is required with it's extension e.g 'image.jpg'";
  }

  if (!(parseInt(height as string) > 0)) {
    isQueryInputsValid = false;
    queryInputsValidationMsg.height = 'must be bigger than zero e.g 500';
  }

  if (!(parseInt(width as string) > 0)) {
    isQueryInputsValid = false;
    queryInputsValidationMsg.width = 'must be bigger than zero e.g 500';
  }

  return { isQueryInputsValid, queryInputsValidationMsg }
}
