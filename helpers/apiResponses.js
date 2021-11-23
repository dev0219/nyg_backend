exports.successResponse = (res, msg) => {

    const resData = {
        status: true,
        message: msg
    };

    return res.status(200).json(resData);
};

exports.successResponseWithData = (res, msg, data) => {
    var resData = {
        status: true,
        message: msg,
        data
    };
    return res.status(200).json(resData);
};

exports.ErrorResponse = (res, msg) => {
    var data = {
        status: false,
        message: msg,
    };
    return res.status(500).json(data);
};

exports.notFoundResponse = (res, msg) => {
    var data = {
        status: false,
        message: msg,
    };
    return res.status(404).json(data);
};

exports.validationErrorWithData = (res, msg, data) => {
    var resData = {
        status: false,
        message: msg,
        data: data
    };
    return res.status(400).json(resData);
};

exports.badRequest = (res, msg) => {
    var resData = {
        status: false,
        message: msg
    }
    return res.status(400).json(resData);
}