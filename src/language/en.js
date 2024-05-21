import { all } from "axios";

// en.js
export default {
  //Navbar
  welcome: "Welcome to",
  home: "Home",
  sign_in: "Sign in",
  walk_through: "Walk through",
  contact: "Contact us",
  settings: "Settings",
  logout: "Logout",
  profile: "Profile",
  dashboard: "Dashboard",
  survey: "Survey",
  generate_quiz: "Generate survey",
  title: "SURVIO",
  manual: "Manual",
  all_quizzes: "All surveys",

  //Welcome
  phrase: "Quickly Gather, Analyze and Act",
  field_label: "Add code here",
  connect_btn: "Connect",
  generate_btn: "Generate survey",

  //Survey
  continue_btn: "Continue",

  //QuestionGenerator
  question_label: "Question",
  question_place_holder: "When was Ľudovít Štúr born?",
  add_question_btn: "Add question",
  correct: "Correct answer",
  incorrect: "Incorrect answer",
  openAnswer: "Open answer",
  singleChoice: "Single choice",
  title_place_holder: "Title",
  description_place_holder: "Description",
  subject_label: "Subject",

  //Auth
  register: "Register",
  login: "Login",
  register_here: "Register here",
  login_here: "Login here",
  dont_have_account: "Don't have an account?",
  already_have_account: "Already have an account?",
  name: "Name",
  name_error: "Name is required",
  email: "Email",
  email_error: "Email is required",
  email_invalid: "Email must be in this format example@mail.com",
  password: "Password",
  password_error: "Password is required",
  password_invalid:
    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number!",
  password_confirmation: "Confirm password",
  password_mismatch: "Passwords do not match",

  //Profile
  old_password: "Old password",
  new_password: "New password",
  new_password_confirmation: "Confirm new password",
  impersonated: "Impersonated",
  not_impersonated: "Not impersonated",
  admin: "Admin",
  user: "User",

  //Dashboard
  survey_title: "Survey title",
  survey_description: "Survey description",
  survey_status: "Survey status",
  survey_status_active: "Active",
  survey_status_inactive: "Inactive",
  survey_created_at: "Created at",
  survey_subject: "Survey subject",
  survey_number_of_questions: "Number of questions",
  none_option: "None",
  activate_survey: "Activate",

  //Quiz
  question: "Question",
  is_open: "Open",
  is_not_open: "Single choice / multiple choice",
  correct: "Correct",
  incorrect: "Incorrect",
  edit: "Edit",
  with_end_time: "With end time",
  without_end_time: "Without end time",
  note: "Note",
  code: "Code",
  no_end_time: "No end time",
  confirm: "Confirm",
  cancel: "Cancel",
  option: "Option",
  delete_quiz: "Delete survey",
  delete_confirmation_message: "Are you sure you want to delete this survey?",
  delete_confirmation_title: "Delete survey",

  // Manual
  welcome: "Welcome to our online voting application!",
  manual_title: "Manual",
  login_register: "Login and Registration:",
  login_description:
    "On the application's homepage, you have the option to log in using your credentials. If you are a new user, you can register by clicking on the 'Registration' button. After successful registration, you will receive access to the application.",
  guest_functions: "Guest User Functions:",
  guest_functions_description:
    "After logging into the application, you will gain access to view voting questions. You can access questions by scanning a QR code, entering an entry code on the homepage, or entering the question address into a browser. After answering the question, you will be redirected to a page displaying graphical voting results.",
  user_functions: "Logged-in User Functions:",
  user_functions_description:
    "Logged-in users have the option to change their password and manage their account. They can define new voting surveys and specify which ones are active and inactive. For each survey, a QR code and a unique code to display the question can be generated. Users can define questions with a choice of correct answer, open short answer, or multiple answers. Defined questions can be edited, deleted, and copied. Users can define the subject for each question and filter questions by subject and creation date, as well as sort them. It is possible to close current votes for a given question and display the results of current and archived votes. Users can export questions and answers to JSON format.",
  admin_functions: "Administrator Functions:",
  admin_functions_description:
    "The administrator has the same functionality as a logged-in user with the ability to filter over all users. When creating new voting questions, the administrator can specify on behalf of whom it is being done. They have access to managing logged-in users, including creating, editing accounts, and many other functions.",
  export_to_pdf: "Export to PDF",
};
