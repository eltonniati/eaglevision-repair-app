
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";

const MANUALS = {
  en: {
    label: "English",
    content: `
USER MANUAL – JOB CARD & INVOICE MANAGEMENT APP

Welcome
Thank you for using the Job Card & Invoice Management App, crafted by Elton Niati (eaglevision.dev30.com • WhatsApp: 027659132527 • Facebook/Twitter: eaglevisiondev30).
This app helps repair/service companies organize job cards, manage devices and customer information, and generate invoices efficiently.

1. Getting Started
- Login/Register: Open the app and log in using your credentials. If you don't have an account, select “Register” to create one.

2. Dashboard
- After logging in, you're taken to the dashboard.
- Here you can see an overview and quickly access job cards, invoices, and settings.

3. Managing Job Cards
- View, create, edit, delete, print, or share job cards from the Job Cards menu using the forms provided.

4. Managing Invoices
- View created invoices, generate new ones from job cards, print, or share (email, WhatsApp).

5. Profile & Settings
- Update your account, company details, and change language, or VAT settings.

6. Language Support
- Access Settings > Language to switch between English, French, and Portuguese.

7. Footer Signature
- Printed job cards/invoices show: Made by Elton Niati, eaglevision.dev30.com • WhatsApp: 027659132527 • Facebook: eaglevisiondev30 • Twitter: eaglevisiondev30

8. Support
- Contact: eaglevision.dev30.com | WhatsApp: 027659132527 | Facebook/Twitter: eaglevisiondev30

Your app is now ready to simplify your workflow!
    `.trim(),
  },
  fr: {
    label: "Français",
    content: `
MANUEL D’UTILISATEUR – APPLICATION DE GESTION DE FICHES D’INTERVENTION & FACTURES

Bienvenue
Merci d’utiliser l’application créée par Elton Niati (eaglevision.dev30.com • WhatsApp : 027659132527 • Facebook/Twitter : eaglevisiondev30).
Cette application aide les sociétés de réparation/service à organiser les fiches d’intervention, gérer les appareils et clients, et générer des factures facilement.

1. Premiers pas
- Connexion/Inscription : Connectez-vous avec vos identifiants ou inscrivez-vous.

2. Tableau de bord
- Après connexion, accédez au panneau principal pour voir un aperçu et accéder rapidement aux fiches, factures et paramètres.

3. Gérer les Fiches
- Voir, créer, modifier, supprimer, imprimer ou partager des fiches à partir du menu.

4. Gérer les Factures
- Consultez ou créez des factures, imprimez-les ou partagez-les (email, WhatsApp).

5. Profil & Paramètres
- Mettez à jour votre compte, société, langue ou options de TVA.

6. Support des langues
- Paramètres > Langue pour basculer entre anglais, français, portugais.

7. Signature pied-de-page
- Les fiches/factures imprimées affichent : Made by Elton Niati, eaglevision.dev30.com • WhatsApp : 027659132527 • Facebook : eaglevisiondev30 • Twitter : eaglevisiondev30

8. Assistance
- Contact : eaglevision.dev30.com | WhatsApp : 027659132527 | Facebook/Twitter : eaglevisiondev30

Votre application est prête à simplifier votre gestion !
    `.trim()
  },
  pt: {
    label: "Português",
    content: `
MANUAL DO USUÁRIO – SISTEMA DE ORDEM DE SERVIÇO E FATURAS

Bem-vindo
Obrigado por usar o aplicativo desenvolvido por Elton Niati (eaglevision.dev30.com • WhatsApp: 027659132527 • Facebook/Twitter: eaglevisiondev30).
Este app ajuda empresas de serviço/reparo a organizar ordens de serviço, gerenciar informações e gerar faturas facilmente.

1. Primeiros Passos
- Login/Cadastro: Entre com suas credenciais ou crie uma conta.

2. Painel Principal
- Após login, você acessa o painel para visualizar e acessar ordens, faturas e configurações.

3. Gerenciando Ordens
- Visualize, crie, edite, apague, imprima ou compartilhe ordens pelo menu.

4. Gerenciando Faturas
- Visualize ou crie faturas, imprima ou compartilhe (email, WhatsApp).

5. Perfil e Configurações
- Atualize conta, empresa, idioma ou opções de IVA.

6. Idiomas
- Acesse Configurações > Idioma para alternar entre inglês, francês e português.

7. Assinatura no Rodapé
- Impressos exibem: Made by Elton Niati, eaglevision.dev30.com • WhatsApp: 027659132527 • Facebook: eaglevisiondev30 • Twitter: eaglevisiondev30

8. Suporte
- Contato: eaglevision.dev30.com | WhatsApp: 027659132527 | Facebook/Twitter: eaglevisiondev30

Seu aplicativo está pronto para simplificar seu fluxo de trabalho!
    `.trim()
  }
};

export default function UserManualPage() {
  const [language, setLanguage] = useState<"en" | "fr" | "pt">("en");

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(MANUALS[language].label + " – User Manual", 10, 15);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    // Split content to multiple lines automatically
    const lines = doc.splitTextToSize(MANUALS[language].content, 180);
    doc.text(lines, 10, 25);

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
          onChange={e => setLanguage(e.target.value as "en" | "fr" | "pt")}
        >
          {Object.entries(MANUALS).map(([key, value]) => (
            <option key={key} value={key}>{value.label}</option>
          ))}
        </select>
        <Button className="mt-2" onClick={handleDownload}>
          Download PDF
        </Button>
      </div>
      <div className="mt-8 rounded bg-muted p-4 text-sm whitespace-pre-line">
        {MANUALS[language].content}
      </div>
    </div>
  );
}
