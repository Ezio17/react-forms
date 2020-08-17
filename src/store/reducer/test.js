const initialValues = {
  test: 'hi'
}

const test = (state = initialValues, payload) => {
  switch (payload.type) {
    case 'first': {
      if (state.test === 'hi') {
        return {
          test: 'bye'
        }
      } else if (state.test === 'bye') {
        return {
          test: 'hi'
        }
      }
    }

    default: {
      return state
    }
  }
}

export default test