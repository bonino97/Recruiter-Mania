exports.PaginatedResults = async (model, page, limit) => {
    try{
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        
        const results = {}

        if(endIndex < await model.countDocuments().exec()) {
            results.nextPage = {
                page: page+1,
                limit: limit
            }
        }

        if(startIndex > 0){
            results.previousPage = {
                page: page-1,
                limit: limit
            }
        }
        results.totalPages = Math.ceil(await model.countDocuments().exec()/limit);
        results.actualPage = page;
        results.results = await model.find().sort({_id:-1}).limit(limit).skip(startIndex).exec();
        return results;

    } catch (e){
        throw e;
    }
}