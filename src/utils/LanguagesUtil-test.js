import languagesUtil from './LanguagesUtil.js';
import LANGUAGE_COLORS from '../constants/LanguageColors.js';
import {expect} from 'chai';

describe('LanguagesUtil', function () {
  let repos = [
    { primaryLanguage: 'JS'},
    { primaryLanguage: 'JS'},
    { primaryLanguage: 'PHP'},
    { primaryLanguage: 'Java'},
    { primaryLanguage: 'Scala'}
  ];

  describe('#getLanguagesFromRepos method', function () {
    it('should return an arry of languages', function () {
      let languages = languagesUtil.getLanguagesFromRepos(repos);
      expect(languages.length).to.equal(4);
    });
  });

  describe('#guessLanguages method', function () {
    it('should return an array of languages, ordered and with extra metadata attached to each language', function () {
      let languages = languagesUtil.guessLanguages(repos);
      expect(languages.length).to.equal(4);
      expect(languages[0].name).to.equal('JS');
      expect(languages[0].color).to.not.be.undefined;
      expect(languages[0].percentage).to.not.be.undefined;
    });
  });

  describe('#getLanguageColor method', function () {
    it('should return an color for the language name or the default one', function () {
      let color = languagesUtil.getLanguageColor('JavaScript');
      expect(color).not.to.be.undefined;
      expect(color).not.to.be.equal(LANGUAGE_COLORS.DEFAULT);

      let color2 = languagesUtil.getLanguageColor('FOOBARLANGUAGE');
      expect(color2).to.be.equal(LANGUAGE_COLORS.DEFAULT);
    });
  });

  describe('#getAbsoluteRateMetadata method', function () {
    it('should return the absolute rate of a language providing a sets of languages for calculating max and min values', function () {
      let languages = [
        {percentage: 70},
        {percentage: 40},
        {percentage: 30},
        {percentage: 20}
      ];

      // formula:
      expect(languagesUtil.getAbsoluteRateMetadata({percentage: 20}, languages)).to.be.equal(0);
      expect(languagesUtil.getAbsoluteRateMetadata({percentage: 70}, languages)).to.be.equal(100);
      expect(languagesUtil.getAbsoluteRateMetadata({percentage: 45}, languages)).to.be.equal(50);
    });
  });

});
