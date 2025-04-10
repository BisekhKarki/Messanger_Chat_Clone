// const UserSchema = require("./Schema/UserSchema");
// const bcryptjs = require("bcryptjs");

// const dummyUsers = [
//   {
//     name: "Nina Roberts",
//     email: "nina.roberts@example.com",
//     password: "password123",
//     phone: "456-789-0124",
//     gender: "Female",
//     date_of_birth: "1996-03-18",
//   },
//   {
//     name: "Oscar Lee",
//     email: "oscar.lee@example.com",
//     password: "password123",
//     phone: "567-890-1235",
//     gender: "Male",
//     date_of_birth: "1994-05-30",
//   },
//   {
//     name: "Paulina Harris",
//     email: "paulina.harris@example.com",
//     password: "password123",
//     phone: "678-901-2346",
//     gender: "Female",
//     date_of_birth: "1990-12-22",
//   },
//   {
//     name: "Quinn Cooper",
//     email: "quinn.cooper@example.com",
//     password: "password123",
//     phone: "789-012-3457",
//     gender: "Male",
//     date_of_birth: "1986-07-13",
//   },
//   {
//     name: "Rachel Adams",
//     email: "rachel.adams@example.com",
//     password: "password123",
//     phone: "890-123-4568",
//     gender: "Female",
//     date_of_birth: "1995-09-02",
//   },
// ];

// const registerUser = async (user) => {
//   const { name, email, password, phone, gender, date_of_birth } = user;

//   try {
//     const checkUser = await UserSchema.findOne({ email: email });
//     if (checkUser) {
//       console.log("User already exists: " + email);
//       return;
//     }

//     if (password.length < 8) {
//       console.log("Password must be of minimum 8 characters");
//       return;
//     }

//     const hashedPassword = await bcryptjs.hash(password, 10);
//     const newUser = new UserSchema({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       gender,
//       date_of_birth,
//       image: "",
//     });

//     await newUser.save();

//     console.log(`User registered successfully: ${name}`);
//   } catch (error) {
//     console.log("Error: ", error.message);
//   }
// };

// const registerDummyUsers = async () => {
//   for (const user of dummyUsers) {
//     await registerUser(user);
//   }
// };

// registerDummyUsers();
