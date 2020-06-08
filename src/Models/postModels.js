import Joi  from'@hapi/joi';




const JoiScheam =  Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .required(),   
    body: Joi.string()
        .min(15)
        .max(500)
        .required()});

export default JoiScheam;
