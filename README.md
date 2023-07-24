# VOICEiT-A-Music-Forum-Website
This web development project is a mini forum web application designed for those interested in music. It allows users to make conversations with other people by making an account, posting, interacting, and commenting, among others.

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
6. Populate the database using the command 'node ./back-end/db/import.js'. Console logs should show that the tables in the database have been populated.
7. Run the server using the command 'npm start'.
8. Launch 'localhost:3000' on the web.
