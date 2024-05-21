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
  generate_quiz: "Generate quiz",
  title: "SURVIO",
  manual: "Manual",
  all_quizzes: "All quizzes",

  //Welcome
  phrase: "Quickly Gather, Analyze and Act",
  field_label: "Add code here",
  connect_btn: "Connect",
  generate_btn: "Generate question",

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
  register: "Register here",
  login: "Login here",
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
  delete_quiz: "Delete quiz",

  // Manual
  welcome: "Welcome to our online voting application!",
  manual_title: "Manual",
  login_register: "Login and Registration:",
  login_description:
    "On the application's home page, you have the option to log in using your credentials. If you are a new user, you can register by clicking the 'Registration' button. After successful registration, you will receive access credentials to the application.",
  guest_functions: "Guest Functions:",
  guest_functions_description:
    "After logging in to the application, you will have access to view voting questions. You can access questions by scanning a QR code, entering an access code on the home page, or entering the question's address into your browser. After answering the question, you will be redirected to a page displaying the voting results graphically.",
  user_functions: "User Functions:",
  user_functions_description:
    "Logged-in users have the option to change their password and manage their account. They can define new voting questions and specify which ones are active and which ones are not. For each question, a QR code and a unique code for displaying the question can be generated. Users can define questions with a choice of correct answers or with an open short answer. For questions with an open answer, users can define how the voting results are displayed. Defined questions can be edited, deleted, and copied. Users can define the subject for each question and filter questions by subject and creation date. It is possible to close current votes on a specific question and view the results of current and archived votes.",
  admin_functions: "Admin Functions:",
  admin_functions_description:
    "Administrators have the same functionality as logged-in users with the ability to filter across all users. When creating new voting questions, they can specify on behalf of whom they are doing it. They have access to managing logged-in users, including creating, editing, and deleting user accounts.",
  export_to_pdf: "Export to PDF",
};
