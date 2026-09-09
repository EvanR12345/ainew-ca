"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export const LANGUAGE_PREFERENCE_KEY = "ainew-language-preference-v1";

type Language = "en" | "fr";

function setDocumentLanguage(language: Language) {
  document.documentElement.lang = language === "fr" ? "fr-CA" : "en-CA";
  document.documentElement.dataset.language = language;
}

function saveLanguage(language: Language) {
  try {
    window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, language);
  } catch {
    // The selection still works for this visit when storage is unavailable.
  }
  setDocumentLanguage(language);
  window.dispatchEvent(new CustomEvent("ainew-language-change", { detail: language }));
}

function destinationFor(language: Language, pathname = window.location.pathname) {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (language === "fr") {
    if (normalized.startsWith("/fr/")) return normalized;
    return "/fr/";
  }
  if (normalized.startsWith("/fr/")) return "/";
  return normalized;
}

export function LanguagePreference() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [choice, setChoice] = useState<Language>("en");

  useEffect(() => {
    // The URL determines the edition. Never interrupt or redirect an arrival.
    setDocumentLanguage(window.location.pathname.startsWith("/fr") ? "fr" : "en");
    const openEditionChoice = () => dialogRef.current?.showModal();
    window.addEventListener("ainew-choose-edition", openEditionChoice);
    return () => window.removeEventListener("ainew-choose-edition", openEditionChoice);
  }, []);

  function continueWithChoice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveLanguage(choice);
    dialogRef.current?.close();
    const destination = destinationFor(choice);
    if (destination !== window.location.pathname) window.location.assign(destination);
  }

  function dismissToEnglish() {
    saveLanguage("en");
    dialogRef.current?.close();
    const destination = destinationFor("en");
    if (destination !== window.location.pathname) window.location.assign(destination);
  }

  return (
    <dialog
      ref={dialogRef}
      className="languageDialog"
      aria-labelledby="language-title"
      aria-describedby="language-description"
      onCancel={(event) => {
        event.preventDefault();
        dismissToEnglish();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dismissToEnglish();
      }}
    >
      <form className="languageDialogPanel" onSubmit={continueWithChoice}>
        <div className="languageDialogBrand" aria-hidden="true">
          <span>AI</span><strong>NEW</strong><small>.CA</small>
        </div>
        <div className="languageDialogIntro">
          <span className="languageKicker">CANADIAN EDITION / ÉDITION CANADIENNE</span>
          <h2 id="language-title">Choose your language<br /><span>Choisissez votre langue</span></h2>
          <p id="language-description">Select the edition you would like to open. English is selected by default.</p>
          <p className="languageDescriptionFr">Sélectionnez l’édition que vous souhaitez consulter. L’anglais est choisi par défaut.</p>
        </div>

        <fieldset className="languageChoices">
          <legend className="visuallyHidden">Language / Langue</legend>
          <label className={choice === "en" ? "languageChoice isSelected" : "languageChoice"}>
            <input type="radio" name="language" value="en" checked={choice === "en"} onChange={() => setChoice("en")} />
            <span className="languageCode">EN</span>
            <span><strong>English</strong><small>Full newsroom and learning tools</small></span>
            <em>Default</em>
          </label>
          <label className={choice === "fr" ? "languageChoice isSelected" : "languageChoice"}>
            <input type="radio" name="language" value="fr" checked={choice === "fr"} onChange={() => setChoice("fr")} />
            <span className="languageCode">FR</span>
            <span><strong>Français</strong><small>Accueil, résumés et navigation en français</small></span>
            <em>Canada</em>
          </label>
        </fieldset>

        <div className="languageDialogFooter">
          <p>English is the default. Press Escape or click outside to continue in English. Change the edition any time from the header.<br /><span>L’anglais est la langue par défaut. Appuyez sur Échap ou cliquez à l’extérieur pour continuer en anglais.</span></p>
          <button type="submit">{choice === "fr" ? "Continuer en français" : "Continue in English"}<span aria-hidden="true">→</span></button>
        </div>
      </form>
    </dialog>
  );
}

export function LanguageSwitch({ locale = "en" }: { locale?: Language }) {
  function choose(language: Language) {
    if (language === "fr" && locale === "en") {
      window.dispatchEvent(new Event("ainew-choose-edition"));
      return;
    }
    saveLanguage(language);
    if (language === locale) return;
    window.location.assign(destinationFor(language));
  }

  return (
    <div className="languageSwitch" role="group" aria-label={locale === "fr" ? "Choisir la langue" : "Choose language"}>
      <button type="button" className={locale === "en" ? "isActive" : ""} aria-pressed={locale === "en"} onClick={() => choose("en")}>EN</button>
      <span aria-hidden="true">/</span>
      <button type="button" className={locale === "fr" ? "isActive" : ""} aria-pressed={locale === "fr"} onClick={() => choose("fr")}>FR</button>
    </div>
  );
}
