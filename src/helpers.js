export function formatDate(date) {
  let time = new Date(date).toLocaleString()

  return time.split(', ')[0].split(':').join('-').replace(/[\/]+/gim, '-')
}
