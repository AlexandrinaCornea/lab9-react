# Crearea unei Aplicații Quiz cu React

## Cerințe Generale

### Configurare Proiect
- Creează un proiect `React` folosind `Vite`.
- Aplicația trebuie să fie o platformă de test interactiv cu întrebări structurate local (fișier JSON), acoperind mai multe categorii tematice.

### Tematica
- Fiecare student își alege propria tematică pentru întrebările din quiz. Tematica trebuie să fie suficient de complexă pentru a acoperi cel puțin **3 categorii distincte** și **minim 45 de întrebări** (câte 15 per categorie).
- Exemple orientative: geografie & istorie, știință & tehnologie, cultură generală, sport, muzică, cinematografie, literatură etc.
- Fiecare întrebare trebuie să aibă categorie și nivel de dificultate.

### Interfață Utilizator (UI) & Experiență
- Stilizarea se poate face cu CSS pur / CSS Modules sau biblioteci externe (e.g., Tailwind, Material-UI).
- Interfața trebuie să fie funcțională, plăcută vizual și să suporte temă light/dark cu persistența selecției.

---

## Funcționalități

### 1. Pagina de Start — Configurare Quiz

- Utilizatorul introduce un **nume de utilizator** (cu validare — câmpul nu poate fi gol).
- Utilizatorul selectează:
  - **Categoria** de întrebări (cel puțin 3 categorii + opțiunea "Toate").
  - **Numărul de întrebări** (e.g., 5, 10, 15, 20 sau toate disponibile). Opțiunile disponibile se ajustează dinamic în funcție de categoria selectată.
  - **Limita de timp** per întrebare (e.g., nelimitat, 10s, 15s, 20s, 30s).
- La submit, quizul se pornește cu parametrii configurați.

### 2. Desfășurarea Quiz-ului

- Afișează progresul curent (întrebarea X din N), categoria și dificultatea întrebării.
- Afișează un **timer vizual**. La expirarea timpului, întrebarea este marcată automat ca incorectă.
- Afișează mai multe variante de răspuns cu feedback vizual imediat după selecție (corect/greșit).
- Afișează un contor de **streak** (răspunsuri corecte consecutive), vizibil de la 2+.

### 3. Pagina de Rezultate & Analiză

- Afișează scorul final (corecte / total) și procentajul obținut.
- Afișează streak-ul maxim atins în încercare.
- Afișează câte răspunsuri corecte din câte disponibile per categorie.
- Permite revizuirea detaliată a răspunsurilor cu filtre:
  - Tab-uri: Toate / Corecte / Greșite.
  - Dropdown de filtrare pe categorie.
- Fiecare card de răspuns afișează: întrebarea, răspunsul dat, răspunsul corect (dacă a fost greșit).
- Afișează un tabel cu istoricul scorurilor (top scoruri per utilizator) sortate după performanță.
- Include buton de "Încearcă din nou" care resetează quizul.

### 4. Temă Light/Dark cu Persistență

- Implementează un buton de comutare pentru tema light/dark.
- Tema selectată se stochează în **`localStorage`** și persistă între sesiuni.

### 5. Persistență Sesiune Activă

- Starea quiz-ului activ (faza curentă, întrebări, răspunsuri date) se salvează în **`localStorage`** la fiecare modificare.
- La reîncărcarea paginii în mijlocul unui quiz, sesiunea este **recuperată automat**.
- La revenirea la pagina de start, sesiunea salvată este ștearsă

### 6. Gestionarea Stării cu Context API și Reducer

- Implementează un **Context** global pentru starea quiz-ului, folosind `useReducer`.
- Reducer-ul gestionează cel puțin acțiunile: `START_QUIZ`, `ANSWER_QUESTION`, `RESET`.
- Implementează un **Context separat** pentru temă (light/dark).
- Niciun component nu primește starea quiz-ului prin props — totul se consumă din context.

### 7. Optimizări de Performanță

- Calculele "costisitoare" (statistici pe categorii, filtrare răspunsuri, sortare istoric) se realizează cu **`useMemo`**.
- Handler-ele de evenimente se memoizează cu **`useCallback`** pentru a nu provoca re-render-uri inutile.
- Componentele care primesc date stabile se imbrică cu **`React.memo`**.

## Barem de notare

| Punctaj | Sarcina |
|---------|---------|
| 1 | Crearea corectă a proiectului (Vite + React) și structura fișierelor; date JSON cu minim 45 întrebări în 3+ categorii |
| 1 | Pagina de start cu configurare completă (username, categorie, număr întrebări, timp) cu validare și ajustare dinamică |
| 1 | UI plăcut și funcțional (stilizare coerentă, temă light/dark, responsive minimal) |
| 1 | Desfășurarea quiz-ului: timer vizual, feedback răspuns, streak counter, avansare automată la timeout |
| 1 | Pagina de rezultate: scor, breakdown categorii, revizuire cu filtre, tabel istoric scoruri |
| 1 | Persistență temă și sesiune activă în `localStorage`; recuperare sesiune la reload |
| 1 | Gestionarea stării cu Context API + `useReducer` |
| 1 | Custom hooks reutilizabile (`useTimer`, `useLocalStorage` sau echivalente) |
| 1 | Optimizări de performanță (`useMemo`, `useCallback`, `React.memo`) aplicate corect |
| 1 | Funcțoinarea corectă a tuturor funcționalităților implementate |

### Link de exemplu de soluție: [Quiz App](https://lab9-react-example.vercel.app/)

## !! BAREM-UL DE MAI SUS ESTE PENTRU VERIFICAREA INIȚIALĂ A LABORATORULUI — LA ÎNCĂRCAREA ACESTUIA PE GITHUB. NOTA FINALĂ POATE FI MODIFICATĂ ÎN DEPENDENȚA APĂRĂRII LABORATORULUI ÎN CADRUL ORELOR !!

## !! NU SE ACCEPTĂ ÎNTÂRZIERI !!
