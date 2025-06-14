
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import ManualImage from "@/components/user-manual/ManualImage";

// Manual content for all supported languages
const MANUALS = {
  en: {
    label: "English",
    sections: [
      {
        title: "Welcome",
        text: "Thank you for using the Job Card & Invoice Management App, crafted by Elton Niati. This app helps repair/service companies organize job cards, manage devices and customer information, and generate invoices efficiently.",
        imageDescription: "App welcome or landing page"
      },
      {
        title: "1. Getting Started",
        text: "Login/Register: Open the app and log in using your credentials. If you don't have an account, select “Register” to create one.",
        imageDescription: "Login and registration screen"
      },
      {
        title: "2. Dashboard",
        text: "After logging in, you're taken to the dashboard. Here you can see an overview and quickly access job cards, invoices, and settings.",
        imageDescription: "Dashboard with navigation cards"
      },
      {
        title: "3. Managing Job Cards",
        text: "View, create, edit, delete, print, or share job cards from the Job Cards menu using the forms provided.",
        imageDescription: "Job Cards management page"
      },
      {
        title: "4. Managing Invoices",
        text: "View created invoices, generate new ones from job cards, print, or share (email, WhatsApp).",
        imageDescription: "Invoices overview and actions"
      },
      {
        title: "5. Profile & Settings",
        text: "Update your account, company details, language, or VAT settings from the profile and settings menus.",
        imageDescription: "Settings or profile page"
      },
      {
        title: "6. Language Support",
        text: "Access Settings > Language to switch between English, French, Portuguese, Spanish, Lingála, Kikóngó, Tshiluba or Swahili.",
        imageDescription: "Language selection menu"
      },
      {
        title: "7. Footer Signature",
        text: "Printed job cards/invoices show: Made by Elton Niati, eaglevision.dev30.com • WhatsApp: 027659132527 • Facebook: eaglevisiondev30 • Twitter: eaglevisiondev30",
        imageDescription: "Invoice/job card print preview with signature footer"
      },
      {
        title: "8. Support",
        text: "Contact: eaglevision.dev30.com | WhatsApp: 027659132527 | Facebook/Twitter: eaglevisiondev30",
        imageDescription: "Contact/support page"
      }
    ]
  },
  fr: {
    label: "Français",
    sections: [
      {
        title: "Bienvenue",
        text: "Merci d’utiliser l’application créée par Elton Niati. Cette application aide les sociétés de réparation/service à organiser les fiches d’intervention, gérer les appareils et clients, et générer des factures facilement.",
        imageDescription: "Page d'accueil ou d'accueil de l'application"
      },
      {
        title: "1. Premiers pas",
        text: "Connexion/Inscription : Connectez-vous avec vos identifiants ou inscrivez-vous.",
        imageDescription: "Écran de connexion et d'inscription"
      },
      {
        title: "2. Tableau de bord",
        text: "Après connexion, accédez au panneau principal pour voir un aperçu et accéder rapidement aux fiches, factures et paramètres.",
        imageDescription: "Tableau de bord avec cartes de navigation"
      },
      {
        title: "3. Gérer les Fiches",
        text: "Voir, créer, modifier, supprimer, imprimer ou partager des fiches à partir du menu.",
        imageDescription: "Page de gestion des fiches de travail"
      },
      {
        title: "4. Gérer les Factures",
        text: "Consultez ou créez des factures, imprimez-les ou partagez-les (email, WhatsApp).",
        imageDescription: "Aperçu et actions sur les factures"
      },
      {
        title: "5. Profil & Paramètres",
        text: "Mettez à jour votre compte, société, langue ou options de TVA.",
        imageDescription: "Page des paramètres ou du profil"
      },
      {
        title: "6. Support des langues",
        text: "Paramètres > Langue pour basculer entre anglais, français, portugais, espagnol, lingala, kikongo, tshiluba, et swahili.",
        imageDescription: "Menu de sélection de la langue"
      },
      {
        title: "7. Signature pied-de-page",
        text: "Les fiches/factures imprimées affichent : Made by Elton Niati, eaglevision.dev30.com • WhatsApp : 027659132527 • Facebook : eaglevisiondev30 • Twitter : eaglevisiondev30",
        imageDescription: "Aperçu d'impression avec pied-de-page de signature"
      },
      {
        title: "8. Assistance",
        text: "Contact : eaglevision.dev30.com | WhatsApp : 027659132527 | Facebook/Twitter : eaglevisiondev30",
        imageDescription: "Page de contact/assistance"
      }
    ]
  },
  pt: {
    label: "Português",
    sections: [
      {
        title: "Bem-vindo",
        text: "Obrigado por usar o aplicativo desenvolvido por Elton Niati. Este app ajuda empresas de serviço/reparo a organizar ordens de serviço, gerenciar informações e gerar faturas facilmente.",
        imageDescription: "Tela inicial ou de boas-vindas do app"
      },
      {
        title: "1. Primeiros Passos",
        text: "Login/Cadastro: Entre com suas credenciais ou crie uma conta.",
        imageDescription: "Tela de login e cadastro"
      },
      {
        title: "2. Painel Principal",
        text: "Após login, você acessa o painel para visualizar e acessar ordens, faturas e configurações.",
        imageDescription: "Painel principal com cartões de navegação"
      },
      {
        title: "3. Gerenciando Ordens",
        text: "Visualize, crie, edite, apague, imprima ou compartilhe ordens pelo menu.",
        imageDescription: "Tela de gerenciamento de ordens de serviço"
      },
      {
        title: "4. Gerenciando Faturas",
        text: "Visualize ou crie faturas, imprima ou compartilhe (email, WhatsApp).",
        imageDescription: "Visão geral de faturas e ações"
      },
      {
        title: "5. Perfil e Configurações",
        text: "Atualize conta, empresa, idioma ou opções de IVA.",
        imageDescription: "Página de configurações ou do perfil"
      },
      {
        title: "6. Idiomas",
        text: "Acesse Configurações > Idioma para alternar entre inglês, francês, português, espanhol, lingala, kikongo, tshiluba e swahili.",
        imageDescription: "Menu de seleção de idiomas"
      },
      {
        title: "7. Assinatura no Rodapé",
        text: "Impressos exibem: Made by Elton Niati, eaglevision.dev30.com • WhatsApp: 027659132527 • Facebook: eaglevisiondev30 • Twitter: eaglevisiondev30",
        imageDescription: "Visualização de impressão com rodapé de assinatura"
      },
      {
        title: "8. Suporte",
        text: "Contato: eaglevision.dev30.com | WhatsApp: 027659132527 | Facebook/Twitter: eaglevisiondev30",
        imageDescription: "Tela de contato/suporte"
      }
    ]
  },
  es: {
    label: "Español",
    sections: [
      {
        title: "Bienvenido",
        text: "Gracias por usar la aplicación creada por Elton Niati. Esta app ayuda a empresas de reparación/servicio a organizar tarjetas de trabajo, gestionar dispositivos y clientes, y generar facturas fácilmente.",
        imageDescription: "Pantalla de bienvenida o inicio de la app"
      },
      {
        title: "1. Primeros pasos",
        text: "Iniciar sesión/Registrarse: Ingresa con tus credenciales o crea una cuenta nueva.",
        imageDescription: "Pantalla de inicio de sesión y registro"
      },
      {
        title: "2. Panel principal",
        text: "Después de iniciar sesión, accede al panel para ver y gestionar tarjetas, facturas y configuraciones.",
        imageDescription: "Panel principal con tarjetas de navegación"
      },
      {
        title: "3. Gestión de Tarjetas de Trabajo",
        text: "Visualiza, crea, edita, elimina, imprime o comparte tarjetas de trabajo desde el menú.",
        imageDescription: "Pantalla de gestión de tarjetas de trabajo"
      },
      {
        title: "4. Gestión de Facturas",
        text: "Consulta o crea facturas, imprímelas o compártelas (correo, WhatsApp).",
        imageDescription: "Vista general y acciones sobre facturas"
      },
      {
        title: "5. Perfil y Configuración",
        text: "Actualiza tu cuenta, empresa, idioma u opciones de IVA.",
        imageDescription: "Página de perfil o configuración"
      },
      {
        title: "6. Idiomas",
        text: "Accede a Configuración > Idioma para cambiar entre inglés, francés, portugués, español, lingala, kikongo, tshiluba o swahili.",
        imageDescription: "Menú de selección de idioma"
      },
      {
        title: "7. Firma en el pie de página",
        text: "Las impresiones muestran: Made by Elton Niati, eaglevision.dev30.com • WhatsApp: 027659132527 • Facebook: eaglevisiondev30 • Twitter: eaglevisiondev30",
        imageDescription: "Vista previa de impresión con firma en el pie"
      },
      {
        title: "8. Soporte",
        text: "Contacto: eaglevision.dev30.com | WhatsApp: 027659132527 | Facebook/Twitter: eaglevisiondev30",
        imageDescription: "Página de contacto o soporte"
      }
    ]
  },
  ln: {
    label: "Lingála",
    sections: [
      {
        title: "Boyei",
        text: "Tosantó yo mpo na kosalela application oyo esalemi na Elton Niati. Application oyo esalisaka masanga ya misala mpo na kobongisa mikanda, kolanda biloko pe bakiliya, mpe kosala bakwákísi.",
        imageDescription: "Ekaniseli ya page d'accueil ya application"
      },
      {
        title: "1. Kobanda",
        text: "Kokóta/Komikoma: Kotá na application na ba code na yo to sala compte sika.",
        imageDescription: "Ekaniseli ya login na inscription"
      },
      {
        title: "2. Likoló",
        text: "Soki okoti, okomona likoló (dashboard) mpo na koyoka misala nyonso pe kokota na mikanda, bakwákísi na bibongisi.",
        imageDescription: "Ekaniseli ya tableau de bord"
      },
      {
        title: "3. Kobongisa Mikanda",
        text: "Moná, salá, bongisa, longola, bimisa to kabola mikanda na menu.",
        imageDescription: "Ekaniseli ya page ya mikanda"
      },
      {
        title: "4. Kobongisa Bakwákísi",
        text: "Landa bakwákísi, bimisa to kabola (email, WhatsApp).",
        imageDescription: "Ekaniseli ya page ya bakwákísi"
      },
      {
        title: "5. Moposo na Bibongisi",
        text: "Bongisa compte na yo, kompanyi, lokóta to miloko ya TVA.",
        imageDescription: "Ekaniseli ya profil to paramètres"
      },
      {
        title: "6. Makótá ya Lokóta",
        text: "Landa Bibongisi > Lokóta mpo na kobongola na Lingɛlɛsa, Lifalansé, Lipulutugalɛ́si, Espanyoli, Lingála, Kikóngó, Tshiluba, to Swahili.",
        imageDescription: "Menu ya lokóta"
      },
      {
        title: "7. Signature ya nsuka",
        text: "Mikanda oyo ebimisami esalaka: Made by Elton Niati, eaglevision.dev30.com • WhatsApp: 027659132527 • Facebook: eaglevisiondev30 • Twitter: eaglevisiondev30",
        imageDescription: "Ekaniseli ya bimisi na signature"
      },
      {
        title: "8. Lisungi",
        text: "Kontakt: eaglevision.dev30.com | WhatsApp: 027659132527 | Facebook/Twitter: eaglevisiondev30",
        imageDescription: "Page ya lisungi"
      }
    ]
  },
  kg: {
    label: "Kikóngó",
    sections: [
      {
        title: "Bela",
        text: "Twasantuka kua kusala application ya Elton Niati. App yai inlombaka masanga ma bisalu kuvasadila makarta, kulanda bima na banteki, sambu kuvangila mafakture.",
        imageDescription: "Ekaniseli ya nkasi ya ntete ya aplikasyo"
      },
      {
        title: "1. Kutala Ntete",
        text: "Kota/Songila: Kota na application na mimfingila mia nge to songila nkumbu ya sika.",
        imageDescription: "Ekaniseli ya songila na kota"
      },
      {
        title: "2. Mesa ya Kuvuanda",
        text: "Munsi ya kota, vwanda na mesa sambu kudindila bisalu, makarta, mafakture ne kubongisa.",
        imageDescription: "Ekaniseli ya mesa (dashboard)"
      },
      {
        title: "3. Kubongisa Makarta",
        text: "Mona, vanga, bongisa, banzula, soba to kabana makarta yina mu menu.",
        imageDescription: "Ekaniseli ya makarta ya bisalu"
      },
      {
        title: "4. Kubongisa Mafakture",
        text: "Mona mafakture, vanga, soba to kabana (email, WhatsApp).",
        imageDescription: "Ekaniseli ya mafakture"
      },
      {
        title: "5. Ntangu na Bibongisa",
        text: "Bongisa konto, kompania, ndinga to mambu ma TVA.",
        imageDescription: "Ekaniseli ya semba ne ntangu"
      },
      {
        title: "6. Ndinga",
        text: "Semba Bibongisa > Ndinga sambu kusangana Kingereza, Kifalansa, Kiputulugeza, Kisipanye, Kikóngó, Lingála, Tshiluba ne Kiswahili.",
        imageDescription: "Menu ya ndinga"
      },
      {
        title: "7. Signature ya Nse",
        text: "Makarta/macarte yasobi: Made by Elton Niati, eaglevision.dev30.com • WhatsApp: 027659132527 • Facebook: eaglevisiondev30 • Twitter: eaglevisiondev30",
        imageDescription: "Soba na signature ya nse"
      },
      {
        title: "8. Sibota",
        text: "Nsangu: eaglevision.dev30.com | WhatsApp: 027659132527 | Facebook/Twitter: eaglevisiondev30",
        imageDescription: "Page ya sibota"
      }
    ]
  },
  ts: {
    label: "Tshiluba",
    sections: [
      {
        title: "Dikusabikila",
        text: "Twadi mu mbonge mu santsa ya kosalela app yaku Elton Niati. App yiyi insandzila masanga kolonga mikanda, bintu ne bakunde, pe kosalila mafakture.",
        imageDescription: "Ekaniseli ya page ya bienvenue"
      },
      {
        title: "1. Kupangila ku ntete",
        text: "Kena/Koma: Kena na bana misapi boku to koma na misapi ya sika.",
        imageDescription: "Ekaniseli ya kena na koma"
      },
      {
        title: "2. Mesa ya kulandila",
        text: "Mu kena, landa mesa ya kulandila mu mona ne kulongolola mikanda, mafakture ne mabongisa.",
        imageDescription: "Mesa ya dashboard"
      },
      {
        title: "3. Kulongolola Mikanda",
        text: "Mona, panga, bongisa, bana, kandika to kabana mikanda mu menu.",
        imageDescription: "Page ya mikanda"
      },
      {
        title: "4. Kulongolola Mafakture",
        text: "Mona mafakture, panga, kandika to kabana (email, WhatsApp).",
        imageDescription: "Page ya mafakture"
      },
      {
        title: "5. Bilumbu na Mabongisa",
        text: "Bongisa konto, kompanyi, ndinga to milandu ya TVA.",
        imageDescription: "Page ya bilumbu/mabongisa"
      },
      {
        title: "6. Mindinga",
        text: "Bongisa Mabongisa > Ndinga ne kusolola na Cilungu, Cifalansa, Ciputulugezi, Kisipanye, Kikongo, Lingala, Tshiluba ne Kiswahili.",
        imageDescription: "Menu ya mindinga"
      },
      {
        title: "7. Kanda mu dibaku",
        text: "Mikanda/kandilu: Made by Elton Niati, eaglevision.dev30.com • WhatsApp: 027659132527 • Facebook: eaglevisiondev30 • Twitter: eaglevisiondev30",
        imageDescription: "Kandika ne signature ya dibaku"
      },
      {
        title: "8. Bumbudi",
        text: "Bumbudi: eaglevision.dev30.com | WhatsApp: 027659132527 | Facebook/Twitter: eaglevisiondev30",
        imageDescription: "Page ya bumbudi"
      }
    ]
  },
  sw: {
    label: "Swahili",
    sections: [
      {
        title: "Karibu",
        text: "Asante kwa kutumia app kutoka Elton Niati. App hii inasaidia kampuni za huduma/ukarabati kupanga kadi za kazi, vifaa, wateja, na kutengeneza ankara.",
        imageDescription: "Skrini ya mwanzo ya programu"
      },
      {
        title: "1. Kuanza",
        text: "Ingia/Jisajili: Ingia na taarifa zako au jisajili ikiwa huna akaunti.",
        imageDescription: "Skrini ya kuingia/kusajili"
      },
      {
        title: "2. Dashbodi",
        text: "Baada ya kuingia, utaona dashbodi kwa muhtasari na ufikivu wa haraka wa kadi, ankara na mipangilio.",
        imageDescription: "Skrini ya dashbodi"
      },
      {
        title: "3. Usimamizi wa Kadi",
        text: "Ona, tengeneza, hariri, futa, chapisha au shiriki kadi za kazi kupitia menyu.",
        imageDescription: "Skrini ya usimamizi wa kadi"
      },
      {
        title: "4. Usimamizi wa Ankara",
        text: "Angalia au tengeneza ankara, chapisha au shiriki (barua pepe, WhatsApp).",
        imageDescription: "Skrini ya ankara"
      },
      {
        title: "5. Wasifu na Mipangilio",
        text: "Sasisha akaunti, kampuni, lugha au mipangilio ya VAT.",
        imageDescription: "Skrini ya mipangilio/wasifu"
      },
      {
        title: "6. Lugha",
        text: "Fikia Mipangilio > Lugha kuchagua kati ya Kiingereza, Kifaransa, Kireno, Kihispania, Kingala, Kikongo, Kitshiluba au Kiswahili.",
        imageDescription: "Menyu ya kuchagua lugha"
      },
      {
        title: "7. Sahihi ya Chini",
        text: "Kadi/ankara zilizochapishwa zinaonyesha: Made by Elton Niati, eaglevision.dev30.com • WhatsApp: 027659132527 • Facebook: eaglevisiondev30 • Twitter: eaglevisiondev30",
        imageDescription: "Muonekano wa chapa na sahihi"
      },
      {
        title: "8. Msaada",
        text: "Mawasiliano: eaglevision.dev30.com | WhatsApp: 027659132527 | Facebook/Twitter: eaglevisiondev30",
        imageDescription: "Skrini ya msaada"
      }
    ]
  }
};

const LANGS: { code: string; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
  { code: "ln", label: "Lingála" },
  { code: "kg", label: "Kikóngó" },
  { code: "ts", label: "Tshiluba" },
  { code: "sw", label: "Swahili" }
];

export default function UserManualPage() {
  const [language, setLanguage] = useState<"en" | "fr" | "pt" | "es" | "ln" | "kg" | "ts" | "sw">("en");

  // Handle PDF download with only text
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(MANUALS[language].label + " – User Manual", 10, 15);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    let y = 25;
    MANUALS[language].sections.forEach(section => {
      doc.setFont("helvetica", "bold");
      doc.text(section.title, 10, y);
      y += 7;
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(section.text, 180);
      doc.text(lines, 10, y);
      y += lines.length * 6 + 6;
      // Skipping images in PDF for simplicity
    });

    doc.save(
      `User_Manual_${MANUALS[language].label.replace(/[^a-zA-Z]/g, "")}.pdf`
    );
  };

  return (
    <div className="max-w-2xl mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">User Manual</h1>
      <div className="mb-6 flex flex-col items-center gap-2">
        <label className="font-medium">Choose your language:</label>
        <select
          className="border p-2 rounded"
          value={language}
          onChange={e => setLanguage(e.target.value as any)}
        >
          {LANGS.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.label}</option>
          ))}
        </select>
        <Button className="mt-2" onClick={handleDownload}>
          Download PDF
        </Button>
      </div>
      <div className="mt-8 rounded bg-muted p-4 text-sm whitespace-pre-line">
        {MANUALS[language].sections.map((section, idx) => (
          <div key={section.title + idx} className="mb-8">
            <div className="font-semibold text-base mb-2">{section.title}</div>
            <div className="mb-2">{section.text}</div>
            <ManualImage description={section.imageDescription} />
          </div>
        ))}
      </div>
    </div>
  );
}
