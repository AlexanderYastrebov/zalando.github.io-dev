import React from 'react';
import LanguageStore from '../../stores/LanguageStore.js';
import BarChart from '../bar-chart/BarChart.jsx';
import SectionHeading from '../section-heading/SectionHeading.jsx';

export default class TopLanguages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      languages: LanguageStore.getTopLanguages()
    };
    this.onLanguagesChange = this.onLanguagesChange.bind(this);
  }

  /**
   * Transform an array of languages to an array of items
   * for the BarChart component
   *
   * @param {Array} languages
   * @return {Array}
   */
  toBarChartData(languages) {
    return languages.map(function (language) {
      return {
        label: language.name,
        width: language.absoluteRate,
        percentage: language.percentage,
        color: language.color
      };
    });
  }

  componentDidMount() {
    LanguageStore.addChangeListener(this.onLanguagesChange);
  }

  onLanguagesChange() {
    this.setState({
      languages: LanguageStore.getTopLanguages()
    });
  }

  render() {
    let data = this.toBarChartData(this.state.languages);

    return (
      <div className="container">
        <SectionHeading text="most used languages" />
        <div className="top-languages-bar-chart">
          <BarChart data={data} />
        </div>

      </div>
    );
  }
}
