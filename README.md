# VOICEiT: A Music Forum Website

## Overview
VoiceIt is a web forum application designed for people interested in music. It allows users to make conversations with other people by making an account, posting, interacting, and commenting, among others.

## Dependencies
The web application was written in and requires [Node.js](https://nodejs.org), and uses [MongoDB](https://www.mongodb.com/) for the database. It also uses [jQuery](https://jquery.com) for DOM manipulation and rich text, which is bundled with the project and requires no further installation.

The following is a list of libraries and packages that the project utilizes for its operation.
| Dependency                                                       | Remark                                                              |
| ---------------------------------------------------------------- | ------------------------------------------------------------------- |
| [mongoose](https://www.npmjs.com/package/mongoose)               | Object data modeling library for MongoDB.                           |
| [bcrypt](https://www.npmjs.com/package/bcrypt)                   | For hashing user passwords.                                         |
| [passport](https://www.npmjs.com/package/passport)               | For user authentication.                                            |
| [passport-local](https://www.npmjs.com/package/passport-local)   | For local user authentication.                                      |
| [express](https://www.npmjs.com/package/express)                 | Node.js web application framework the application was written with. |
| [express-session](https://www.npmjs.com/package/express-session) | For managing user sessions.                                         |
| [connect-mongo](https://www.npmjs.com/package/connect-mongo)     | For managing user sessions.                                         |
| [body-parser](https://www.npmjs.com/package/body-parser)         | To parse request bodies.                                            |
| [method-override](https://www.npmjs.com/package/method-override) | To use other HTTP request methods like PUT.                         |
| [dotenv](https://www.npmjs.com/package/dotenv)                   | To load custom environment variables in local instances.            |
| [js-cookie](https://www.npmjs.com/package/js-cookie)             | Handles cookies.                                                    |
| [multer](https://www.npmjs.com/package/multer)                   | For handling file uploads.                                          |

## Setup and Usage

### Local Instance
Make sure to install [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.com/) prior to doing the following. After installation, also ensure that MongoDB is running properly.

1. Clone the repository via Git or downloading the `.zip` file directly.
2. In the root directory, launch the terminal and run `npm install` to install the project [dependencies](#dependencies).
3. Populate the database using `npm run popdb`. Console logs should show that the documents (tables) in the database have been populated successfully.
4. Run the server using `npm start`. Console logs should show that the application is listening on port `3000` and that a connection to the database was successfully created.
5. Go to [localhost:3000](http://localhost:3000) or [127.0.0.1:3000](http://127.0.0.1:3000) using a browser to use the application.

### Deployed Instance
Alternatively, an instance of the web application is hosted at [insert link here](about:blank) and may be immediately used.

## Sample Accounts
The default database comes with mock accounts that may be
used in the web application. Here are their respective details.

| Username              | Password         |
| --------------------- | ---------------- |
| `melissa_spellman`    | `Melissa-12345`  |
| `draeznor_rock_lover` | `Draeznor-12345` |
| `aria_eagleheart`     | `Aria-12345`     |
| `marithus_25`         | `Marithus-12345` |
| `jennie_itgirl`       | `Jennie-12345`   |

## Contributors
| Name                     | GitHub Profile                                                      |
| ------------------------ | ------------------------------------------------------------------- |
| Harvey Shawn Chua        | [3liteking148](https://github.com/3liteking148)                     |
| Latasha Harwani          | [Tasha1403](https://github.com/Tasha1403)                           |
| Patrick James Marcellana | [patrickjamesmarcellana](https://github.com/patrickjamesmarcellana) |
| Brett Harley Mider       | [ChorusMortis](https://github.com/ChorusMortis)                     |

## Acknowledgments
The development team would also like to take a moment to acknowledge and credit the contributors/collaborators of the amazing, external libraries that were used in the development of this project.

| Contributors/Organization                         | Libraries                                                                  | Remark                                         |
| ------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------- |
| [webfashionist](https://github.com/webfashionist) | [WYSIWYG editor jQuery plugin](https://github.com/webfashionist/RichText/) | Used in the web application's RichText editor. |
