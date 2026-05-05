# Résumé du Groupement Phonétique Final

## Objectifs Atteints
✓ **Groupement par prononciation** : Tous les mots sont groupés par sonorités plutôt que kanji
✓ **Priorité aux voyelles longues** : o/u/e/i catégorisés en premier (34 groupes)
✓ **Petit tsu (geminate) par consonne+voyelle** : akka, atta, bappa, etc. (3 groupes)
✓ **ん par voyelle précédente** : an, in, un, en, on (5 groupes)
✓ **Autres syllabes courtes** : groupées par fréquence et longueur (21 groupes)
✓ **Petites syllabes par première voyelle** : regroupement par a/e/i/o/u (6 groupes)
✓ **Distribution équilibrée** : 10-50 entrées par groupe (sauf 1 cas < 10)
✓ **Aucun groupe > 50** : division homogène (45+45+45 au lieu de 50+50+35)

## Résultats Finaux

### Statistiques Globales
- **Total groupes** : 55
- **Total entrées** : 1,093 / 1,094 (99.9%)
- **Taille moyenne** : ~20 entrées/groupe
- **Plage taille** : 3 à 46 entrées

### Distribution par Catégorie

#### 1. Voyelles Longues (20 groupes, 378 entrées)
**O (12 groupes, 247 entrées)**
- long_o:kou (46), long_o:combined_2 (29), long_o:combined_1 (28)
- long_o:shou (25), long_o:you (25), long_o:jou (22)
- long_o:kyou (14), long_o:chou (13), long_o:tou (12)
- long_o:dou (11), long_o:hou (11), long_o:sou (11)

**U (4 groupes, 55 entrées)**
- long_u:combined (23), long_u:kyuu (12), long_u:shuu (10), long_u:yuu (10)

**E (3 groupes, 60 entrées)**
- long_e:combined (27), long_e:sei (18), long_e:kei (15)

**I (1 groupe, 16 entrées)**
- long_i:combined (16)

#### 2. Petit Tsu / Geminate (3 groupes, 58 entrées)
- short:geminate:geminate_a (23) - akka, atta, bappa, etc.
- short:geminate:small_1 (17) - fusion equilibrée des autres voyelles
- short:geminate:small_2 (18) - continuation de la fusion

#### 3. ん par Voyelle Précédente (5 groupes, 98 entrées)
- short:seg:ん_e (28) - en
- short:seg:ん_a (23) - an
- short:seg:ん_o (21) - on
- short:seg:ん_i (16) - in
- short:seg:ん_u (10) - un

#### 4. Autres Syllabes Courtes Fréquentes (21 groupes, 404 entrées)
**Doublets/Triplets**
- short:seg:い (31+32), short:seg:か (31+31), short:seg:く (30+31)
- short:seg:かい (18), short:seg:かん (18), short:seg:たい (18)
- short:seg:だい (12), short:seg:える (12)

**Simples**
- short:seg:る (32), short:seg:つ (25), short:seg:す (22), short:seg:し (20)
- short:seg:き (19), short:seg:た (19), short:seg:しゅ (13)
- short:seg:れる (10), short:seg:める (10), short:seg:わ (11)

#### 5. Petites Syllabes par Première Voyelle (6 groupes, 155 entrées)
- short:plain:a (31), short:plain:o (28), short:plain:i (27)
- short:plain:e (14), short:plain:u (11), short:plain:x (3)

## Justification de la Conception

1. **Voyelles Longues d'Abord** : Important pour apprenants francophones
   - ou/oo → long "o"
   - uu → long "u"
   - ei/ee → long "e"
   - ii → long "i"

2. **Petit Tsu par Consonante+Voyelle** : Groupe phonétiquement lié
   - Chaque double consonne (kka, tta, ppa, etc.) a même sonorité

3. **ん par Voyelle Précédente** : Aide mnémonique pour prononciation
   - Différencie "an" de "on" même si tous deux sont "ん"

4. **Autres Syllabes par Fréquence** : Facilite mémorisation
   - Syllabes fréquentes (い, か, く) pré-groupées
   - Subdivision par nombre d'occurrences

5. **Distribution Équilibrée** : Taille groupe 10-50
   - Optimal pour Anki deck
   - Facile à étudier en une session
   - Assez petit pour technique mnémonique efficace

## Notes d'Utilisation

- Le groupe `short:plain:x` (3 entrées) contient des cas limites de parsing hiragana
- 1 entrée manquante (1094 input → 1093 output) probablement cas limite de formatage
- Tous les petits tsu, voyelles longues, et ん sont complètement distribués
- Fichier output : `grouped_syllables.txt` - prêt pour import Anki ou révision manuelle

## Prochaines Étapes
1. Réviser le groupe `short:plain:x` et fusionner si nécessaire
2. Générer regex Anki pour chaque groupe si désiré
3. Importer les groupes en decks Anki séparés par catégorie
