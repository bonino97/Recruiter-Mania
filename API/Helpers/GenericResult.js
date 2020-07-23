exports.GenericResult = async (data, message) => {
    try{

        res.succes = null; 
        res.data = data;
        res.message = message;
        res.errors = error;

        return res;

    } catch (e){
        throw e;
    }
}