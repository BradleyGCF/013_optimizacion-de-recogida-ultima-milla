import * as yup from "yup";

const usernameMatch =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.*\$%\^&\*])(?=.{8,})/;
const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.*%&@\$%\^&\*])(?=.{8,})/;
const usernameSignUp = /^(\S+$)/g;
const minPriceVerify = /^[0-9]*$/;

export const SelectTypeCreateNftSchema = yup.object().shape({
  price: yup.string(),
  // .min(1, "User Name must be at least 1 characters long"),
  // .required("Required, Please Enter your User Name"),

  minimumBid: yup.string(),
  // .min(1, "User Name must be at least 1 characters long"),
  // .required("Required, Please Enter your User Name"),

  minPrice: yup.string(),
  // .required('Required, Please Enter your password')
});

export const CollectionScheme = yup.object().shape({
  theFile: yup
    .mixed()
    .nullable()
    // .notRequired()
    .required("Required"),

  nameCollection: yup
    .string()
    .min(3, "Name Collection must be at least 3 characters long")
    .max(20, "Name Collection must contain a maximum of 20 characters")
    .required("Required, Please Enter your Name Collection"),

  symbol: yup
    .string()
    .min(3, "symbol must contain at least 3 characters")
    .max(6, "symbol must contain a maximum of 6 characters")
    .required("Required, Please Enter symbol")
    .matches(usernameSignUp, "spaces not allowed"),

  descriptionCollection: yup
    .string()
    .min(15, "Decription Collection must be at least 15 characters long")
    .max(200, "Decription Collection must contain a maximum of 200 characters")
    .required("Required, Please Enter decription Collection"),
});

export const LoginScheme = yup.object().shape({
  email: yup
    .string()
    .max(255)
    .required("Email is required")
    .matches(/^[^@]+@[^@]+\.[^@]+$/, "Email must contain '@' before '.'"),

  password: yup
    .string()
    .required("Required, Please Enter your password")
    .matches(
      passwordRules,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export const CreateUserScheme = yup.object().shape({
  fullname: yup
    .string()
    .min(5, "Full Name must be at least 5 characters long")
    .max(65, "Full name  must contain a maximum of 65 characters")
    .required("Required, Please Enter your Full Name"),

  username: yup
    .string()
    .min(5, "User Name must be at least 5 characters long")
    .max(25, "User name  must contain a maximum of 25 characters")
    .required("Required, Please Enter your User Name ")
    .matches(usernameSignUp, "spaces not allowed"),

  email: yup
    .string()
    .max(255)
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      passwordRules,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character: ! @ # . * % & @"
    ),

  repeatPassword: yup
    .string()
    .required("Repeat Password is required")
    .when("password", {
      is: (val: string | any[]) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Both password need to be the same"),
    }),
});

export const ForgotScheme = yup.object().shape({
  username: yup
    .string()
    .min(5, "UserName must be at least 5 characters long")
    .required("Required"),

  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      usernameMatch,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export const createNftScheme = yup.object().shape({
  theFile: yup.mixed().nullable().required(),
  // .required("Required"),

  nameNftField: yup
    .string()
    .min(7, "Name must be at least 7 characters long")
    .max(20, "name must contain a maximum 20 characters")
    .required("Required"),

  descriptionNft: yup
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(200, "Description must contain maximum 200 characters")
    .required("Required"),

  energy: yup.string().min(1, "Energy must be at least 1 characters long"),
  // .required("Required"),

  strength: yup.string().min(1, "Strength must be at least 1 characters long"),
  // .required("Required"),

  impact: yup.string().min(1, "Impact must be at least 1 characters long"),
  // .required("Required"),

  sustainability: yup
    .string()
    .min(1, "Sustainability must be at least 1 characters long"),
  // .required("Required"),

  rarity: yup.string().min(1, "Rarity must be at least 1 characters long"),
  // .required("Required"),

  royalties: yup
    .string()
    .min(1, "Royalties must be at least 1 characters long"),
  // .required("Required"),

  price: yup
    .string()
    // porcentVerify.validateSync(price)
    .max(11, "amount not allowed maximum 10.000.000.000")
    .matches(minPriceVerify, "negative numbers are not allowed"),
  // .when(["minimumBid", "price"], {
  //     is: (val: string | any[], val2: string | any[] ) => (
  //     (val2 * 0.8 > val2) ? true : false),
  //     then: yup
  //     .string()
  //     .oneOf([yup.ref("minimumBid")],
  //       "Both password need to be the same"
  //     )
  //   }),

  // .min(5, "User Name must be at least 5 characters long"),
  // .required("Required, Please Enter your User Name"),
  // if(typeFile.test("bids")){
  //     console.log("aqui fran")
  // }
  minimumBid: yup
    .string()
    .max(11, "amount not allowed maximum 10.000.000.000")
    .matches(minPriceVerify, "negative numbers are not allowed"),

  // .min(5, "User Name must be at least 5 characters long"),
  // .required("Required, Please Enter your User Name"),

  minPrice: yup.number(),
  // .required('Required, Please Enter your password'),
});

export const createNftPerfilNft = yup.object().shape({
  price: yup
    .string()
    // porcentVerify.validateSync(price)
    .max(11, "amount not allowed maximum 10.000.000.000")
    .matches(minPriceVerify, "negative numbers are not allowed"),
  // .when(["minimumBid", "price"], {
  //     is: (val: string | any[], val2: string | any[] ) => (
  //     (val2 * 0.8 > val2) ? true : false),
  //     then: yup
  //     .string()
  //     .oneOf([yup.ref("minimumBid")],
  //       "Both password need to be the same"
  //     )
  //   }),

  // .min(5, "User Name must be at least 5 characters long"),
  // .required("Required, Please Enter your User Name"),
  // if(typeFile.test("bids")){
  //     console.log("aqui fran")
  // }
  minimumBid: yup
    .string()
    .max(11, "amount not allowed maximum 10.000.000.000")
    .matches(minPriceVerify, "negative numbers are not allowed"),

  minPrice: yup.number(),
  // .required('Required, Please Enter your password'),
});

export const EditProfileSchema = yup.object().shape({
  fullname: yup
    .string()
    .min(5, "User Name must be at least 5 characters long")
    .max(65, "Full nae  must contain a maximum of 65 characters"),
  username: yup
    .string()
    .min(5, "User Name must be at least 5 characters long")
    .max(25, "User name  must contain a maximum of 25 characters")
    .matches(usernameSignUp, "spaces not allowed"),

  email: yup.string().email("Must be a valid email").max(255),

  userAvatar: yup.string(),

  userBanner: yup.string(),

  biography: yup
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(200, "Description must contain maximum 200 characters"),
});

export const CreateVehicles = yup.object().shape({
  fileigmvehicles: yup.mixed().nullable().required(),
  model: yup
    .string()
    .min(5, "model must be at least 5 characters long")
    .max(65, "model must contain a maximum of 65 characters")
    .required("Require"),

  ability: yup
    .string()
    .min(5, "ability must be at least 5 characters long")
    .max(65, "ability must contain a maximum of 65 characters")
    .required("Require"),

  vehicleregistration: yup
    .string()
    .min(5, "vehiclere gistration must be at least 5 characters long")
    .max(65, "vehiclere gistration must contain a maximum of 65 characters")
    .required("Require"),
  mileage: yup
    .string()
    .min(5, "mileage must be at least 5 characters long")
    .max(65, "mileage must contain a maximum of 65 characters")
    .required("Require"),
  drivers: yup
    .string()
    .min(5, "drivers must be at least 5 characters long")
    .max(65, "drivers must contain a maximum of 65 characters")
    .required("Require"),
  vehiclegps: yup
    .string()
    .min(5, "vehiclegps must be at least 5 characters long")
    .max(65, "vehiclegps must contain a maximum of 65 characters")
    .required("Require"),
  branchofficesone: yup
    .string()
    .min(5, "branch offices must be at least 5 characters long")
    .max(65, "branch soffices must contain a maximum of 65 characters")
    .required("Require"),
  branchofficestwo: yup
    .string()
    .min(5, "branch offices must be at least 5 characters long")
    .max(65, "branch soffices must contain a maximum of 65 characters"),
  branchofficestree: yup
    .string()
    .min(5, "branch offices must be at least 5 characters long")
    .max(65, "branch soffices must contain a maximum of 65 characters"),
});

export const CreateBranchOffice = yup.object().shape({
  fileigmbranchoffice: yup.mixed().nullable().required(),
  fullname: yup
    .string()
    .min(5, "fullname must be at least 5 characters long")
    .max(65, "fullname must contain a maximum of 65 characters")
    .required("Require"),

  address: yup
    .string()
    .min(5, "address must be at least 5 characters long")
    .max(65, "address must contain a maximum of 65 characters")
    .required("Require"),

  country: yup
    .string()
    .min(5, "country must be at least 5 characters long")
    .max(65, "country must contain a maximum of 65 characters")
    .required("Require"),
  city: yup
    .string()
    .min(5, "city must be at least 5 characters long")
    .max(65, "city must contain a maximum of 65 characters")
    .required("Require"),
  manager: yup
    .string()
    .min(5, "manager must be at least 5 characters long")
    .max(65, "manager must contain a maximum of 65 characters")
    .required("Require"),
});

export const EditBranchOffice = yup.object().shape({
  fileigmbranchoffice: yup.mixed().nullable(),
  fullname: yup
    .string()
    .min(5, "fullname must be at least 5 characters long")
    .max(65, "fullname must contain a maximum of 65 characters"),
  address: yup
    .string()
    .min(5, "address must be at least 5 characters long")
    .max(65, "address must contain a maximum of 65 characters"),
  country: yup
    .string()
    .min(5, "country must be at least 5 characters long")
    .max(65, "country must contain a maximum of 65 characters"),
  city: yup
    .string()
    .min(5, "city must be at least 5 characters long")
    .max(65, "city must contain a maximum of 65 characters"),
  manager: yup
    .string()
    .min(5, "manager must be at least 5 characters long")
    .max(65, "manager must contain a maximum of 65 characters"),
});
