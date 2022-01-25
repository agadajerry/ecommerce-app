import  Joi from "joi";




  //login and reg validation

 interface user {
   fullname: string;
   email: string;
   phoneNumber: number;
   address: string;
   password: string;
   repeat_password: string;
 }
 export const validateUser = (data: user) => {
   const schema = Joi.object({
     fullname: Joi.string().trim().min(2).max(64),
     email: Joi.string().trim().lowercase().required(),
     phoneNumber: Joi.string().required(),
     address: Joi.string().trim().required(),
     password: Joi.string().min(8).required(),
     repeat_password: Joi.ref("password"),
   }).unknown();

   const options = {
     errors: {
       wrap: {
         label: "",
       },
     },
   };

   return schema.validate(data, options);
 };


  // Handling/  validating errors
export const handleErrors = (err: any) => {
  console.log(err.message, err.code);
  let errors: any = {
    fullname: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
  };

  // Duplicate error code
  if (err.code === 11000) {
    errors.email = "This email is already registered";
    return errors;
  }
 
  // validations error
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

