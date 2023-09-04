// parse All id in param into a number
function parseID(req, res, next) {
    let { id } = req.params;
    req.params.id = Number(id);
    next();
}

module.exports = parseID;
