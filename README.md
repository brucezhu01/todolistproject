# todolistproject
This full-stack todolist project covers frontend (Javascript, HTML, CSS) and backend (Python, MySQL). There are three main parts in this project: login page, create account page, and mainpage(view your todolist)

<br />

**Login Page:** <br />
This login page connects to the table "user" in MySQL where there is one column for username and another for pasword. User will be required to enter their username and password to login. If the username and password the user enters matches the data in MySQL database, then it will redirect to the mainpage. If the information does not match, however, then the user will be asked to enter the right username/password or create a new account.

![Screen Shot 2022-09-21 at 10 42 49 PM](https://user-images.githubusercontent.com/111262167/191663849-93064b2c-5c8a-4e01-8304-175e535d736c.png)

**Create Account Page:** <br />
Create account page displays after the user clicks the "Create Account" button. Like the login page, it also connects to the table "user" in MySQL. If the username creates successfully, the data will add to the table "user" and redirect to the mainpage. If a similar username is detected in the database, the user will be told to either login or use another username to register.

![Screen Shot 2022-09-22 at 12 34 20 AM](https://user-images.githubusercontent.com/111262167/191666111-9ef4baee-753a-4513-944b-aa2c4a69a0c2.png)

**Main Page:** <br />
Main page connects to another table called "todocontent" in MySQL where it stores all the to-do tasks logged by every user. According to the login information, the app will display all the to-do tasks that are logged by the user in the order of dates. Of course, you are able to add, delete, and edit your task when using the app! <br />
The first image is the table of "todocontent" while the second image is displaying the main page and the third image is displaying the main page after clicking one of the "Update" button.
![Screen Shot 2022-09-22 at 12 58 42 AM](https://user-images.githubusercontent.com/111262167/191670159-cec4b34f-a8e7-4ac1-b8c5-bced8f8944ae.png)
<img width="965" alt="Screen Shot 2022-09-22 at 1 14 10 AM" src="https://user-images.githubusercontent.com/111262167/191671744-9adada13-a566-4c88-9007-39146427a9b3.png">
![Screen Shot 2022-09-22 at 1 11 25 AM](https://user-images.githubusercontent.com/111262167/191671412-c1fbefc9-6d61-467f-98dc-c58cf4ff73df.png)

