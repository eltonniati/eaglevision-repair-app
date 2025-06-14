export const LANGS: { code: string; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
  { code: "ln", label: "Lingála" },
  { code: "kg", label: "Kikóngó" },
  { code: "ts", label: "Tshiluba" },
  { code: "sw", label: "Swahili" }
];

// This contains only text/manual, now enriched with all option explanations, without referencing images.
export const MANUALS = {
  en: {
    label: "English",
    sections: [
      {
        title: "Welcome",
        text: [
          "Thank you for using the Job Card & Invoice Management App, crafted by Elton Niati.",
          "This app is designed to streamline tasks for repair/service companies:",
          "- Organize job cards for each service or repair performed",
          "- Manage devices/equipment and customer profiles",
          "- Generate, track, and print/email invoices efficiently",
          "Each function is accessible from the main menu and fully supports multi-language."
        ]
      },
      {
        title: "1. Getting Started",
        text: [
          "• Login / Register:",
          "  - From the welcome page, either log in with your credentials or click 'Register' for a new account.",
          "  - Password is required; contact support if you forget it.",
          "• Navigation:",
          "  - Once logged in, the dashboard provides quick links to all features."
        ]
      },
      {
        title: "2. Dashboard",
        text: [
          "• Overview:",
          "  - The dashboard is your central hub; it shows navigation cards for rapid access to Job Cards, Invoices, Company Profile, and Settings.",
          "  - Each card leads to detailed management of that module.",
          "• Quick Actions:",
          "  - Access most-used actions directly from the dashboard cards (e.g., New Job Card, View Invoices)."
        ]
      },
      {
        title: "3. Managing Job Cards",
        text: [
          "• Listing:",
          "  - See all job cards sorted by creation or update date.",
          "• Creating a Job Card:",
          "  - Press 'New Job Card', fill in all details (customer info, device/problem, assigned technician, status).",
          "  - Auto-complete fields for known customers/devices.",
          "• Editing/Deleting:",
          "  - Edit or delete using the icons/actions on each row.",
          "• Printing/Sharing:",
          "  - Print a formatted job card, or share its summary by copying or sending via WhatsApp/email."
        ]
      },
      {
        title: "4. Managing Invoices",
        text: [
          "• Viewing Invoices:",
          "  - Access the Invoices page for a list of all current and past invoices.",
          "• Creating from a Job Card:",
          "  - Select a job card and press 'Create Invoice'. Fill in the items, rates, taxes.",
          "• Printing/Sharing Invoices:",
          "  - Print detailed invoices for customers or generate PDFs to send by email or WhatsApp.",
          "• Status Tracking:",
          "  - Track each invoice status (Draft, Sent, Paid, Overdue) with colored badges."
        ]
      },
      {
        title: "5. Profile & Settings",
        text: [
          "• User Profile: change your password or log out.",
          "• Company Profile: update company name, tax ID, address, logo, contact details—used on invoices and job cards.",
          "• VAT Settings: enable/disable VAT, enter tax percentages applicable to your region.",
          "• Language: set your preferred language; affects the UI for all screens.",
          "• Print Options: customize print footers for job cards/invoices."
        ]
      },
      {
        title: "6. Language Support",
        text: [
          "• To change language, go to Settings > Language.",
          "• Supported: English, French, Portuguese, Spanish, Lingála, Kikóngó, Tshiluba, Swahili.",
          "• Changing language translates the app UI and print documents instantly."
        ]
      },
      {
        title: "7. Footer Signature",
        text: [
          "• All printed/exported job cards and invoices display a footer credit:",
          "\"Made by Elton Niati, eaglevision.dev30.com • WhatsApp: 027659132527 • Facebook: eaglevisiondev30 • Twitter: eaglevisiondev30\"",
          "• Edit this footer in Settings if desired."
        ]
      },
      {
        title: "8. Support",
        text: [
          "• For help, visit: eaglevision.dev30.com",
          "• WhatsApp: 027659132527",
          "• Facebook/Twitter: eaglevisiondev30",
          "• Support accessible from the dashboard or footer at any time."
        ]
      }
    ]
  },
  fr: {
    label: "Français",
    sections: [
      {
        title: "Bienvenue",
        text: [
          "Merci d’utiliser l’application créée par Elton Niati.",
          "Cette application aide les sociétés de réparation/service à organiser les fiches d’intervention, gérer les appareils et clients, et générer des factures facilement."
        ]
      },
      {
        title: "1. Premiers pas",
        text: [
          "Connexion/Inscription : Connectez-vous avec vos identifiants ou inscrivez-vous.",
          "• Navigation : Une fois connecté, accédez au tableau de bord pour voir un aperçu et accéder rapidement aux fiches, factures et paramètres."
        ]
      },
      {
        title: "2. Tableau de bord",
        text: [
          "• Vue d'ensemble : Le tableau de bord est votre centre névralgique ; il montre des cartes de navigation pour un accès rapide aux fiches, factures, profil de l'entreprise et paramètres."
        ]
      },
      {
        title: "3. Gérer les Fiches",
        text: [
          "• Liste : Voir toutes les fiches triées par date de création ou de mise à jour.",
          "• Création d'une fiche : Appuyez sur 'Nouvelle fiche', remplissez tous les détails (informations client, appareil/problème, technicien assigné, statut)."
        ]
      },
      {
        title: "4. Gérer les Factures",
        text: [
          "• Consultation des factures : Accédez à la page des factures pour une liste de toutes les factures actuelles et passées.",
          "• Création à partir d'une fiche : Sélectionnez une fiche et appuyez sur 'Créer une facture'."
        ]
      },
      {
        title: "5. Profil & Paramètres",
        text: [
          "• Profil utilisateur : changez votre mot de passe ou déconnectez-vous.",
          "• Profil de l'entreprise : mettez à jour le nom de l'entreprise, l'ID fiscal, l'adresse, le logo, les coordonnées."
        ]
      },
      {
        title: "6. Support des langues",
        text: [
          "• Pour changer de langue, allez dans Paramètres > Langue.",
          "• Langues prises en charge : Anglais, Français, Portugais, Espagnol, Lingala, Kikongo, Tshiluba, et Swahili."
        ]
      },
      {
        title: "7. Signature pied-de-page",
        text: [
          "• Tous les documents imprimés/exportés affichent un crédit de pied de page :",
          "\"Fait par Elton Niati, eaglevision.dev30.com • WhatsApp : 027659132527 • Facebook : eaglevisiondev30 • Twitter : eaglevisiondev30\""
        ]
      },
      {
        title: "8. Assistance",
        text: [
          "• Pour de l'aide, visitez : eaglevision.dev30.com",
          "• WhatsApp : 027659132527",
          "• Facebook/Twitter : eaglevisiondev30"
        ]
      }
    ]
  },
  pt: {
    label: "Português",
    sections: [
      {
        title: "Bem-vindo",
        text: [
          "Obrigado por usar o aplicativo desenvolvido por Elton Niati.",
          "Este app ajuda empresas de serviço/reparo a organizar ordens de serviço, gerenciar informações e gerar faturas facilmente."
        ]
      },
      {
        title: "1. Primeiros Passos",
        text: [
          "Login/Cadastro: Entre com suas credenciais ou crie uma conta.",
          "• Navegação: Após login, você acessa o painel para visualizar e acessar ordens, faturas e configurações."
        ]
      },
      {
        title: "2. Painel Principal",
        text: [
          "• Visão geral: O painel é seu centro; mostra cartões de navegação para acesso rápido a Ordens de Serviço, Faturas, Perfil da Empresa e Configurações."
        ]
      },
      {
        title: "3. Gerenciando Ordens",
        text: [
          "• Listagem: Visualize todas as ordens de serviço ordenadas por data de criação ou atualização.",
          "• Criando uma Ordem: Pressione 'Nova Ordem', preencha todos os detalhes (informações do cliente, dispositivo/problema, técnico designado, status)."
        ]
      },
      {
        title: "4. Gerenciando Faturas",
        text: [
          "• Visualizando Faturas: Acesse a página de Faturas para uma lista de todas as faturas atuais e passadas.",
          "• Criando a partir de uma Ordem: Selecione uma ordem e pressione 'Criar Fatura'."
        ]
      },
      {
        title: "5. Perfil e Configurações",
        text: [
          "• Perfil do Usuário: altere sua senha ou saia.",
          "• Perfil da Empresa: atualize o nome da empresa, ID fiscal, endereço, logo, detalhes de contato."
        ]
      },
      {
        title: "6. Idiomas",
        text: [
          "• Para mudar de idioma, acesse Configurações > Idioma.",
          "• Idiomas suportados: Inglês, Francês, Português, Espanhol, Lingala, Kikongo, Tshiluba e Swahili."
        ]
      },
      {
        title: "7. Assinatura no Rodapé",
        text: [
          "• Impressos exibem: \"Feito por Elton Niati, eaglevision.dev30.com • WhatsApp: 027659132527 • Facebook: eaglevisiondev30 • Twitter: eaglevisiondev30\""
        ]
      },
      {
        title: "8. Suporte",
        text: [
          "• Contato: eaglevision.dev30.com | WhatsApp: 027659132527 | Facebook/Twitter: eaglevisiondev30"
        ]
      }
    ]
  },
  es: {
    label: "Español",
    sections: [
      {
        title: "Bienvenido",
        text: [
          "Gracias por usar la aplicación creada por Elton Niati.",
          "Esta app ayuda a empresas de reparación/servicio a organizar tarjetas de trabajo, gestionar dispositivos y clientes, y generar facturas fácilmente."
        ]
      },
      {
        title: "1. Primeros pasos",
        text: [
          "Iniciar sesión/Registrarse: Ingresa con tus credenciales o crea una cuenta nueva.",
          "• Navegación: Después de iniciar sesión, accede al panel para ver y gestionar tarjetas, facturas y configuraciones."
        ]
      },
      {
        title: "2. Panel principal",
        text: [
          "• Visión general: Después de iniciar sesión, el panel muestra tarjetas de navegación para acceso rápido a Tarjetas de Trabajo, Facturas, Perfil de la Empresa y Configuraciones."
        ]
      },
      {
        title: "3. Gestión de Tarjetas de Trabajo",
        text: [
          "• Listado: Visualiza todas las tarjetas de trabajo ordenadas por fecha de creación o actualización.",
          "• Creando una Tarjeta: Presiona 'Nueva Tarjeta', completa todos los detalles (información del cliente, dispositivo/problema, técnico asignado, estado)."
        ]
      },
      {
        title: "4. Gestión de Facturas",
        text: [
          "• Consultar Facturas: Accede a la página de Facturas para una lista de todas las facturas actuales y pasadas.",
          "• Creando desde una Tarjeta: Selecciona una tarjeta y presiona 'Crear Factura'."
        ]
      },
      {
        title: "5. Perfil y Configuración",
        text: [
          "• Perfil del Usuario: cambia tu contraseña o cierra sesión.",
          "• Perfil de la Empresa: actualiza el nombre de la empresa, ID fiscal, dirección, logo, detalles de contacto."
        ]
      },
      {
        title: "6. Idiomas",
        text: [
          "• Para cambiar de idioma, accede a Configuración > Idioma.",
          "• Idiomas soportados: Inglés, Francés, Portugués, Español, Lingala, Kikongo, Tshiluba y Swahili."
        ]
      },
      {
        title: "7. Firma en el pie de página",
        text: [
          "• Las impresiones muestran: \"Hecho por Elton Niati, eaglevision.dev30.com • WhatsApp: 027659132527 • Facebook: eaglevisiondev30 • Twitter: eaglevisiondev30\""
        ]
      },
      {
        title: "8. Soporte",
        text: [
          "• Contacto: eaglevision.dev30.com | WhatsApp: 027659132527 | Facebook/Twitter: eaglevisiondev30"
        ]
      }
    ]
  },
  ln: {
    label: "Lingála",
    sections: [
      {
        title: "Boyei",
        text: [
          "Tosantó yo mpo na kosalela application oyo esalemi na Elton Niati.",
          "Application oyo esalisaka masanga ya misala mpo na kobongisa mikanda, kolanda biloko pe bakiliya, mpe kosala bakwákísi."
        ]
      },
      {
        title: "1. Kobanda",
        text: [
          "Kokóta/Komikoma: Kotá na application na ba code na yo to sala compte sika.",
          "• Navigation: Soki okoti, okomona likoló mpo na koyoka misala nyonso pe kokota na mikanda, bakwákísi na bibongisi."
        ]
      },
      {
        title: "2. Likoló",
        text: [
          "• Ekaniseli: Soki okoti, okomona likoló (dashboard) mpo na koyoka misala nyonso pe kokota na mikanda, bakwákísi na bibongisi."
        ]
      },
      {
        title: "3. Kobongisa Mikanda",
        text: [
          "• Moná: Salá, bongisa, longola, bimisa to kabola mikanda na menu."
        ]
      },
      {
        title: "4. Kobongisa Bakwákísi",
        text: [
          "• Landa bakwákísi, bimisa to kabola (email, WhatsApp)."
        ]
      },
      {
        title: "5. Moposo na Bibongisi",
        text: [
          "• Bongisa compte na yo, kompanyi, lokóta to miloko ya TVA."
        ]
      },
      {
        title: "6. Makótá ya Lokóta",
        text: [
          "• Landa Bibongisi > Lokóta mpo na kobongola na Lingɛlɛsa, Lifalansé, Lipulutugalɛ́si, Espanyoli, Lingála, Kikongo, Tshiluba, to Swahili."
        ]
      },
      {
        title: "7. Signature ya nsuka",
        text: [
          "• Mikanda oyo ebimisami esalaka: \"Made by Elton Niati, eaglevision.dev30.com • WhatsApp: 027659132527 • Facebook: eaglevisiondev30 • Twitter: eaglevisiondev30\""
        ]
      },
      {
        title: "8. Lisungi",
        text: [
          "• Kontakt: eaglevision.dev30.com | WhatsApp: 027659132527 | Facebook/Twitter: eaglevisiondev30"
        ]
      }
    ]
  },
  kg: {
    label: "Kikóngó",
    sections: [
      {
        title: "Bela",
        text: [
          "Twasantuka kua kusala application ya Elton Niati.",
          "App yai inlombaka masanga ma bisalu kuvasadila makarta, kulanda bima na banteki, sambu kuvangila mafakture."
        ]
      },
      {
        title: "1. Kutala Ntete",
        text: [
          "Kota/Songila: Kota na application na mimfingila mia nge to songila nkumbu ya sika.",
          "• Navigation: Mu kena, landa mesa ya kulandila mu mona ne kulongolola mikanda, mafakture ne kubongisa."
        ]
      },
      {
        title: "2. Mesa ya Kuvuanda",
        text: [
          "• Mu kena, landa mesa ya kulandila mu mona ne kulongolola mikanda, mafakture ne kubongisa."
        ]
      },
      {
        title: "3. Kubongisa Makarta",
        text: [
          "• Mona, vanga, bongisa, banzula, soba to kabana makarta yina mu menu."
        ]
      },
      {
        title: "4. Kubongisa Mafakture",
        text: [
          "• Mona mafakture, vanga, soba to kabana (email, WhatsApp)."
        ]
      },
      {
        title: "5. Ntangu na Bibongisa",
        text: [
          "• Bongisa konto, kompania, ndinga to mambu ma TVA."
        ]
      },
      {
        title: "6. Ndinga",
        text: [
          "• Semba Bibongisa > Ndinga sambu kusangana Kingereza, Kifalansa, Kiputulugeza, Kisipanye, Kikongo, Lingala, Tshiluba ne Kiswahili."
        ]
      },
      {
        title: "7. Signature ya Nse",
        text: [
          "• Makarta/macarte yasobi: \"Made by Elton Niati, eaglevision.dev30.com • WhatsApp: 027659132527 • Facebook: eaglevisiondev30 • Twitter: eaglevisiondev30\""
        ]
      },
      {
        title: "8. Sibota",
        text: [
          "• Nsangu: eaglevision.dev30.com | WhatsApp: 027659132527 | Facebook/Twitter: eaglevisiondev30"
        ]
      }
    ]
  },
  ts: {
    label: "Tshiluba",
    sections: [
      {
        title: "Dikusabikila",
        text: [
          "Twadi mu mbonge mu santsa ya kosalela app yaku Elton Niati.",
          "App yiyi insandzila masanga kolonga mikanda, bintu ne bakunde, pe kosalila mafakture."
        ]
      },
      {
        title: "1. Kupangila ku ntete",
        text: [
          "Kena/Koma: Kena na bana misapi boku to koma na misapi ya sika.",
          "• Navigation: Mu kena, landa mesa ya kulandila mu mona ne kulongolola mikanda, mafakture ne mabongisa."
        ]
      },
      {
        title: "2. Mesa ya kulandila",
        text: [
          "• Mu kena, landa mesa ya kulandila mu mona ne kulongolola mikanda, mafakture ne mabongisa."
        ]
      },
      {
        title: "3. Kulongolola Mikanda",
        text: [
          "• Mona, panga, bongisa, bana, kandika to kabana mikanda mu menu."
        ]
      },
      {
        title: "4. Kulongolola Mafakture",
        text: [
          "• Mona mafakture, panga, kandika to kabana (email, WhatsApp)."
        ]
      },
      {
        title: "5. Bilumbu na Mabongisa",
        text: [
          "• Bongisa konto, kompanyi, ndinga to milandu ya TVA."
        ]
      },
      {
        title: "6. Mindinga",
        text: [
          "• Bongisa Mabongisa > Ndinga ne kusolola na Cilungu, Cifalansa, Ciputulugezi, Kisipanye, Kikongo, Lingala, Tshiluba ne Kiswahili."
        ]
      },
      {
        title: "7. Kanda mu dibaku",
        text: [
          "• Mikanda/kandilu: \"Made by Elton Niati, eaglevision.dev30.com • WhatsApp: 027659132527 • Facebook: eaglevisiondev30 • Twitter: eaglevisiondev30\""
        ]
      },
      {
        title: "8. Bumbudi",
        text: [
          "• Bumbudi: eaglevision.dev30.com | WhatsApp: 027659132527 | Facebook/Twitter: eaglevisiondev30"
        ]
      }
    ]
  },
  sw: {
    label: "Swahili",
    sections: [
      {
        title: "Karibu",
        text: [
          "Asante kwa kutumia app kutoka Elton Niati.",
          "App hii inasaidia kampuni za huduma/ukarabati kupanga kadi za kazi, vifaa, wateja, na kutengeneza ankara."
        ]
      },
      {
        title: "1. Kuanza",
        text: [
          "Ingia/Jisajili: Ingia na taarifa zako au jisajili ikiwa huna akaunti.",
          "• Navigation: Baada ya kuingia, utaona dashbodi kwa muhtasari na ufikivu wa haraka wa kadi, ankara na mipangilio."
        ]
      },
      {
        title: "2. Dashbodi",
        text: [
          "• Muonekano: Dashbodi ni kituo chako; inaonyesha kadi za urambazaji kwa ufikiaji wa haraka wa Kadi za Kazi, Ankara, Profaili ya Kampuni, na Mipangilio."
        ]
      },
      {
        title: "3. Usimamizi wa Kadi",
        text: [
          "• Ona, tengeneza, hariri, futa, chapisha au shiriki kadi za kazi kupitia menyu."
        ]
      },
      {
        title: "4. Usimamizi wa Ankara",
        text: [
          "• Angalia au tengeneza ankara, chapisha au shiriki (barua pepe, WhatsApp)."
        ]
      },
      {
        title: "5. Wasifu na Mipangilio",
        text: [
          "• Sasisha akaunti, kampuni, lugha au mipangilio ya VAT."
        ]
      },
      {
        title: "6. Lugha",
        text: [
          "• Fikia Mipangilio > Lugha kuchagua kati ya Kiingereza, Kifaransa, Kireno, Kihispania, Kingala, Kikongo, Kitshiluba au Kiswahili."
        ]
      },
      {
        title: "7. Sahihi ya Chini",
        text: [
          "• Kadi/ankara zilizochapishwa zinaonyesha: \"Made by Elton Niati, eaglevision.dev30.com • WhatsApp: 027659132527 • Facebook: eaglevisiondev30 • Twitter: eaglevisiondev30\""
        ]
      },
      {
        title: "8. Msaada",
        text: [
          "• Mawasiliano: eaglevision.dev30.com | WhatsApp: 027659132527 | Facebook/Twitter: eaglevisiondev30"
        ]
      }
    ]
  }
};
