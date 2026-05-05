# Conception du Groupement des Mots Anki en Decks Filtrés

## Besoins de l'Utilisateur

L'utilisateur dispose d'une liste de mots Anki dans le fichier `sound-to-pic_hard-med.txt`, qui contient des entrées avec des mots japonais, leurs définitions, exemples, sons, images et tags. L'objectif est de regrouper ces mots en decks filtrés dans Anki pour faciliter l'apprentissage, en utilisant des expressions régulières (regex).

### Critères de Groupement Prioritaires
- **Prononciation** : Grouper les mots ayant la même prononciation ou des sonorités similaires (ex. : "kanshin" avec plusieurs sens). Cela permet d'apprendre plusieurs sens d'un coup, puis d'affiner avec des phrases (voc_sentence_ja).
- **Kanji similaires ou de la même famille** : Regrouper les mots partageant des kanji communs ou des racines.
- **Type de mots** : Utiliser les tags dans la dernière colonne (ex. : verbes, adjectifs, etc.) pour créer des groupes logiques.
- **Taille des groupes** : Au minimum 10 mots par groupe pour former des decks viables.

### Contexte d'Apprentissage
- L'utilisateur étudie en écoutant la prononciation et doit se rappeler les mots et leurs sens.
- Les groupes logiques aident à mémoriser des sonorités similaires ou identiques, puis à différencier les sens via des phrases.

## Analyse du Fichier Source

Le fichier `sound-to-pic_hard-med.txt` est un fichier tabulé avec les colonnes suivantes (basé sur l'examen des premières lignes) :
- Mot (avec lecture, ex. : 正[せい])
- Définition (en français et anglais)
- Notes supplémentaires
- Exemples de phrases
- Sons (liens vers fichiers audio)
- Images (liens vers fichiers image)
- Autres champs (kanji, prononciation, tags, etc.)
- Dernière colonne : Tags (ex. : JLPT::3, JouYou::K1::1, Noun)

Le fichier contient environ 50+ entrées, avec des informations riches pour l'analyse.

## Solution Proposée

### Approche Générale
1. **Analyse Automatisée** : Utiliser un script Python pour parser le fichier, extraire les champs pertinents (prononciation, kanji, tags).
2. **Groupement** :
   - Par prononciation : Extraire la lecture (ex. : せい) et grouper les mots identiques ou similaires (utiliser des regex pour variations).
   - Par kanji : Identifier les kanji communs dans les mots.
   - Par tags : Utiliser les tags pour classer (ex. : verbes, noms).
3. **Filtrage et Validation** : Assurer des groupes d'au moins 10 mots. Générer des regex pour les filtres Anki.
4. **Sortie** : Produire une liste de groupes avec les mots correspondants et les regex suggérées pour créer des decks filtrés dans Anki.

### Étapes de Mise en Œuvre
1. **Script Python** :
   - Lire le fichier avec `csv.reader` (séparateur tab).
   - Extraire : prononciation (de la colonne mot), kanji, tags.
   - Grouper :
     - Prononciation : Dictionnaire avec clé = prononciation, valeur = liste de mots.
     - Kanji : Analyser les kanji présents et grouper par kanji partagé.
     - Tags : Grouper par catégories (ex. : Noun, Verb).
   - Filtrer les groupes < 10 mots.
   - Générer des regex Anki (ex. : `prononciation:せい` pour filtrer par champ).

2. **Intégration Anki** :
   - Importer la liste dans Anki si nécessaire.
   - Utiliser les regex pour créer des decks filtrés (ex. : via les options de recherche Anki).

3. **Outils Requis** :
   - Python 3 avec modules standard (csv, re).
   - Anki pour tester les filtres.

### Avantages
- Automatisation : Réduit le travail manuel.
- Personnalisable : Ajuster les critères de groupement.
- Léger : Document de conception simple, implémentation rapide.

### Prochaines Étapes
- Développer le script Python.
- Tester sur le fichier source.
- Ajuster les groupes selon les retours.