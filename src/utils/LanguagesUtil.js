import _ from 'lodash';
import COLORS from '../constants/LanguageColors.js';

export default {
  addMetadata: function (languages) {
    // add percentage and color
    languages.forEach(function (language) {
      language.color = this.getColorMetadata(language);
      language.absoluteRate = this.getAbsoluteRateMetadata(language, languages);
    }.bind(this));

    return languages;
  },
  getColorMetadata: function (language) {
    let color;

    for (let property in COLORS) {
      if(COLORS.hasOwnProperty(property)) {
        if (property === language.name) {
          color = COLORS[property];
        }
      }
    }

    if (!color) {
      color = COLORS.DEFAULT;
    }
    return color;
  },
  /**
   * Calculate the "absolute rate"
   *
   * n - min
   * --------- * 100
   * max - min
   *
   * @param language - a language
   * @param languages - the set of languages
   * @returns {number}
   */
  getAbsoluteRateMetadata: function (language, languages) {
    let percentages = languages.map(function (lang) {
      return lang.percentage;
    });
    return ((language.percentage - _.min(percentages)) / (_.max(percentages) - _.min(percentages))) * 100;
  },
  /**
   * Extract programming languages and attach "metadata"
   *
   * @deprecated
   * @param {Array} repos
   * @returns {Array} - languages with count/percentage/color, ordered by count
   */
  guessLanguages: function (repos) {

    // extract languages from repos
    let languages = this.getLanguagesFromRepos(repos);

    // sort by
    languages = _.sortByOrder(languages, function (language) {
      return language.count;
    }, ['desc']);

    // add percentage and color
    languages.forEach(function (language) {
      language.percentage = Math.round( ( language.count / repos.length) * 100 );
      language.color = this.getColorMetadata(language);
    }.bind(this));

    languages.forEach(function (language) {
      language.absoluteRate = this.getAbsoluteRateMetadata(language, languages);
    }.bind(this));

    return languages;

  },
  /**
   * Extract/aggregates programming languages
   *
   * @deprecated
   * @param {Array} repos
   * @returns {Array}
   */
  getLanguagesFromRepos: function (repos) {
    return repos.reduce(function (langs, repo) {
      let found = false;

      for (var i = 0; i < langs.length; i++) {
        if (repo.primaryLanguage === langs[i].name) {
          found = true;
          langs[i].count = langs[i].count + 1;
          break;
        }
      }
      if (!found) {
        langs.push({name: repo.primaryLanguage, count: 1});
      }
      return langs;
    }, []);
  },
  /**
   * Get the color associated with this languageName
   *
   * @param {string} languageName
   * @returns {string}
   */
  getLanguageColor: function (languageName) {
    return COLORS[languageName] || COLORS.DEFAULT;
  }
};
