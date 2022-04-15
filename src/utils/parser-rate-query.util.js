const parserRateQuery = (radioFilter) => {
    const filters = radioFilter.split('|')
    const filterObject = filters
        .map((filter) => {
            const pair = filter.split('_')
            return { [pair[0]]: parseInt(pair[1]) }
        })
        .reduce((prev, current) => ({ ...prev, ...current }), {})
    return filterObject
}
export default parserRateQuery
