export const paginate = (req, res, next) => {
  let { page = 1, limit = 10 } = req.query

  page = parseInt(page)
  limit = parseInt(limit)
  const offset = (page - 1) * limit
  req.pagination = { limit, offset }
  next()
}
