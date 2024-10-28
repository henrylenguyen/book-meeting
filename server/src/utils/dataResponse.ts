const createResponse = (statusCode: number, data: unknown, message: string) => {
  return {
    statusCode,
    data,
    message
  }
}

export default createResponse
