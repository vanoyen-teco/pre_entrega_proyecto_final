const getIsAdmin = (req, res, next) => {
    const isAdmin = true;
    // para el futuro de la api.
    if(!isAdmin){
        res.status(401).send({ status: "Unauthorized", data: { error : -1, descripcion: `${req.originalUrl} ${req.method} no se encuentra autorizada` } });
    }else{
        next();
    }
};

module.exports = {
    getIsAdmin,
};