export interface IValuesSteps {
  firstName?: string
  lastName?: string
  password?: string
  repeatPassword?: string
  gender?: string
  email?: string
  mobile?: string
  country?: string
  city?: string
  img?: string
}

export interface IStepsButtons {
  steps: number,
  nextSteps?: () => void,
  prevSteps: () => void,
  setValuesStep?: (name: string, values: IValuesSteps) => void,
}