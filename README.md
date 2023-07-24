# VOICEiT-A-Music-Forum-Website
This web development project is a mini forum web application designed for those interested in music. It allows users to make conversations with other people by making an account, posting, interacting, and commenting, among others.

Web Development Team:
Chua, Harvey Shawn
Harwani, Latasha
Marcellana, Patrick James
Mider, Brett Harley

Instructions on How to Set up and Run the Application Locally:
1. Download the .zip file and extract all files into a single folder.
2. Open the command prompt or the terminal.
3. Change your directory to the folder where you extracted your project to. This folder should contain the folders, front-end and back-end, as well as the other important files that came along with them.
4. Make sure that MongoDB is running.
5. Import the necessary modules for the project by entering 'npm install'. Here is a complete list of the modules used in the project:
    a. mongoose       
    b. bcrypt         
    c. passport      
    d. express        
    e. passport-local 
    f. express-session
    g. connect-mongo
    h. bodyparser
    i. method-override
    j. dotenv
    k. js-cookie
    l. jquery (used in front-end, not included in npm install)
    m. multer
6. Populate the database using the command 'npm run popdb'. Console logs should show that the tables in the database have been populated.
7. Run the server using the command 'npm start'.
8. Launch 'localhost:3000' on the web.

Sample usernames and passwords you can use to login:
1. username: melissa_spellman,    password: Melissa-12345
2. username: draeznor_rock_lover, password: Draeznor-12345
3. username: aria_eagleheart,     password: Aria-12345
4. username: marithus_25,         password: Marithus-12345
5. username: jennie_itgirl,       password: Jennie-12345

The development team would like to acknowledge webfashionist for the WYSIWYG editor developed as jQuery plugin that we used for the RichText editor in our project.
Link to Repository: https://github.com/webfashionist/RichText/
Github Profile: https://github.com/webfashionist 