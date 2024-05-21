// en.js
export default {
  //Navbar
  welcome: "Vitajte v",
  home: "Domov",
  sign_in: "Prihlásiť sa",
  walk_through: "Prejsť",
  contact: "Kontaktujte nás",
  settings: "Nastavenia",
  logout: "Odhlásiť sa",
  profile: "Profil",
  dashboard: "Dashboard",
  survey: "Anketa",
  generate_quiz: "Generovať anketu",
  title: "SURVIO",
  manual: "Manuál",
  all_quizzes: "Všetky ankety",

  //Welcome
  phrase: "Rýchlo Zhromažďuj, Analyzuj a Konaj",
  field_label: "Pridaj kód sem",
  connect_btn: "Pripojiť",
  generate_btn: "Generovať anketu",

  //Survey
  continue_btn: "Pokračovať",

  //QuestionGenerator
  question_label: "Otázka",
  question_place_holder: "Kedy sa narodil Ľudovít Štúr?",
  add_question_btn: "Pridať otázku",
  correct: "Správna odpoveď",
  incorrect: "Nesprávna odpoveď",
  openAnswer: "Odpoveď",
  singleChoice: "Jedno možnostné",
  title_place_holder: "Titulok",
  description_place_holder: "Popis",
  subject_label: "Predmet",

  //Auth
  register: "Registrovať sa tu",
  login: "Prihlásiť sa tu",
  dont_have_account: "Nemáte účet?",
  already_have_account: "Už máte účet?",
  name: "Meno",
  name_error: "Meno je povinné",
  email: "Email",
  email_error: "Email je povinný",
  email_invalid: "Email musí byť v tomto formáte example@mail.sk",
  password: "Heslo",
  password_error: "Heslo je povinné",
  password_invalid:
    "Heslo musí mať aspoň 8 znakov a obsahovať aspoň jedno veľké písmeno, jedno malé písmeno, jedno číslo!",
  password_confirmation: "Potvrď heslo",
  password_mismatch: "Heslá sa nezhodujú",

  //Profile
  old_password: "Staré heslo",
  new_password: "Nové heslo",
  new_password_confirmation: "Potvrď nové heslo",
  impersonated: "Branný ako tento užívateľ",
  not_impersonated: "Nie je branný ako tento užívateľ",
  admin: "Admin",
  user: "Užívateľ",

  //Dashboard
  survey_title: "Názov ankety",
  survey_description: "Popis ankety",
  survey_status: "Stav ankety",
  survey_created_at: "Vytvorená dňa",
  survey_status_active: "Aktívna",
  survey_status_inactive: "Neaktívna",
  survey_subject: "Predmet ankety",
  survey_number_of_questions: "Počet otázok",
  none_option: "Žiadne",
  activate_survey: "Aktivovať",

  //Quiz
  question: "Otázka",
  is_open: "Otvorená",
  is_not_open: "Jedna voľba / viacero možností",
  correct: "Správna",
  incorrect: "Nesprávna",
  edit: "Upraviť",
  with_end_time: "S koncovým časom",
  without_end_time: "Bez koncového času",
  note: "Poznámka",
  code: "Kód",
  no_end_time: "Bez koncového času",
  confirm: "Potvrdiť",
  cancel: "Zrušiť",
  option: "Možnosť",
  delete_quiz: "Vymazať anketu",
  delete_confirmation_message: "Naozaj chcete vymazať tento anketu?",
  delete_confirmation_title: "Vymazať anketu",

  // Manual
  welcome: "Vitajte v našej aplikácii pre online hlasovanie!",
  manual_title: "Návod",
  login_register: "Prihlásenie a registrácia:",
  login_description:
    "Na úvodnej stránke aplikácie máte možnosť prihlásiť sa pomocou vašich prihlasovacích údajov. Ak ste nový používateľ, môžete sa zaregistrovať kliknutím na tlačidlo 'Registrácia'. Po úspešnej registrácii získate prístupové údaje do aplikácie.",
  guest_functions: "Funkcie neprihláseného používateľa:",
  guest_functions_description:
    "Po prihlásení do aplikácie získate prístup k zobrazeniu hlasovacích otázok. Môžete pristupovať k otázkam pomocou načítania QR kódu, zadaním vstupného kódu na úvodnej stránke alebo zadaním adresy otázky do prehliadača. Po zodpovedaní otázky budete presmerovaní na stránku s grafickým zobrazením výsledkov hlasovania.",
  user_functions: "Funkcie prihláseného používateľa:",
  user_functions_description:
    "Prihlásený používateľ má možnosť zmeniť svoje heslo a spravovať svoj účet. Môže definovať nové hlasovacie ankety a špecifikovať, ktoré z nich sú aktívne a ktoré nie. Pre každú anketu je možné generovať QR kód a jedinečný kód, ktorý slúži na zobrazenie otázky. Používateľ môže definovať otázky s výberom správnej odpovede s otvorenou krátkou odpoveďou alebo s viacerími odpoveďami. Je možné upravovať, mazať a kopírovať definované otázky. Používateľ môže ku každej otázke definovať, k akému predmetu sa vzťahuje a filtrovať otázky podľa predmetu a dátumu vytvorenia takisto aj uspordúvať. Je možné uzatvoriť aktuálne hlasovania na danú otázku a zobraziť výsledky aktuálnych a archivovaných hlasovaní. Používaťeľ si može exportovať otázka a odpovede do JSON formátu.",
  admin_functions: "Funkcie administrátora:",
  admin_functions_description:
    "Administrátor má rovnakú funkcionalitu ako prihlásený používateľ s možnosťou filtrovania nad všetkými používateľmi. Pri vytváraní nových hlasovacích otázok môže špecifikovať, v koho mene to robí. Má prístup k správe prihlásených používateľov vrátane vytvárania, úpravy účtov a mnoho dalsich funkcii.",
  export_to_pdf: "Export do PDF",
};
